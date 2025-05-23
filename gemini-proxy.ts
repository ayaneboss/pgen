import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { ProductIdea, FullProduct } from '../../types'; // Adjust path as needed
import { GEMINI_TEXT_MODEL, IDEA_GENERATION_PROMPT, FULL_PRODUCT_CREATION_PROMPT_TEMPLATE } from '../../constants'; // Adjust path

// Helper function to chunk prompts: (Copied from original geminiService.ts)
// This might still be useful if the Gemini API itself has payload size limits or benefits from it,
// though the original ReadableStream issue was with the AI Studio proxy.
const chunkPromptForStreamingFix = (prompt: string, chunkSize: number = 25000): { text: string }[] => { // Increased chunk size for server-side
  if (!prompt) return [{ text: "" }];
  const parts: { text: string }[] = [];
  for (let i = 0; i < prompt.length; i += chunkSize) {
    parts.push({ text: prompt.substring(i, i + chunkSize) });
  }
  return parts.length > 0 ? parts : [{ text: "" }];
};

const parseGeminiJsonResponse = <T,>(responseText: string, requestDescription: string): T | { error: string; details?: string; rawText?: string } => {
  let jsonStr = responseText.trim();
  const fenceRegex = /^```(?:json|JSON)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[1]) {
    jsonStr = match[1].trim();
  }

  try {
    return JSON.parse(jsonStr) as T;
  } catch (error: any) {
    console.error(`[Gemini Proxy] Failed to parse JSON response for ${requestDescription}:`, error);
    const jsonRegex = /\{[\s\S]*\}|\[[\s\S]*\]/;
    const foundJson = jsonStr.match(jsonRegex);
    if (foundJson && foundJson[0]) {
      try {
        console.warn(`[Gemini Proxy] Attempting fallback JSON parsing for ${requestDescription}.`);
        return JSON.parse(foundJson[0]) as T;
      } catch (e: any) {
        console.error(`[Gemini Proxy] Fallback JSON parsing also failed for ${requestDescription}:`, e.message);
        return { error: "Failed to parse JSON response", details: e.message, rawText: responseText };
      }
    }
    return { error: "Invalid JSON response", details: error.message, rawText: responseText };
  }
};


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("[Gemini Proxy] API Key is missing from environment variables.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API Key is not configured on the server." }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    };
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body: Must be JSON." }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const { action, payload } = requestBody;
  const ai = new GoogleGenAI({ apiKey });

  try {
    if (action === 'generateProductIdea') {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: chunkPromptForStreamingFix(IDEA_GENERATION_PROMPT),
        config: { responseMimeType: "application/json" }
      });
      const ideaResult = parseGeminiJsonResponse<ProductIdea>(response.text, "Product Idea Generation");
      if ('error' in ideaResult) {
         console.error("[Gemini Proxy] Error parsing idea JSON:", ideaResult);
        return { statusCode: 500, body: JSON.stringify({ error: "AI response parsing error (idea).", details: ideaResult.details, rawText: ideaResult.rawText  }), headers: { 'Content-Type': 'application/json' } };
      }
      return { statusCode: 200, body: JSON.stringify(ideaResult), headers: { 'Content-Type': 'application/json' } };
    } else if (action === 'buildFullProduct' && payload && payload.idea) {
      const idea: ProductIdea = payload.idea;
      const promptText = FULL_PRODUCT_CREATION_PROMPT_TEMPLATE(idea);
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: chunkPromptForStreamingFix(promptText),
        config: { responseMimeType: "application/json" }
      });
      const productResult = parseGeminiJsonResponse<FullProduct>(response.text, "Full Product Creation");
      if ('error' in productResult) {
        console.error("[Gemini Proxy] Error parsing product JSON:", productResult);
        return { statusCode: 500, body: JSON.stringify({ error: "AI response parsing error (product).", details: productResult.details, rawText: productResult.rawText }), headers: { 'Content-Type': 'application/json' } };
      }
      return { statusCode: 200, body: JSON.stringify(productResult), headers: { 'Content-Type': 'application/json' } };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid action or missing payload." }),
        headers: { 'Content-Type': 'application/json' },
      };
    }
  } catch (error: any) {
    console.error("[Gemini Proxy] Error calling Gemini API or processing request:", error);
    let errorMessage = "An unknown error occurred with the AI service.";
    let errorDetails;
    if (error.message) {
        errorMessage = `Gemini API Error: ${error.message}`;
    }
    if(error.response && error.response.data) { // if error structure from API is known
        errorDetails = error.response.data;
    }
    return {
      statusCode: error.status || 500, // Use error status if available
      body: JSON.stringify({ error: errorMessage, details: errorDetails || error.toString() }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

export { handler };
