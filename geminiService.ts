import { ProductIdea, FullProduct } from '../types';

// The API endpoint for our Netlify function
// The '/api/' part is handled by the redirect in netlify.toml
const API_ENDPOINT = '/api/gemini-proxy'; 

const callApiProxy = async <T,>(action: string, payload?: any): Promise<T> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, payload }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use text
        const textError = await response.text();
        errorData = { error: `Server responded with status ${response.status}`, details: textError.substring(0,500) };
      }
      console.error("API Proxy Error Response:", errorData);
      const message = errorData?.error || `API request failed with status ${response.status}`;
      const details = errorData?.details || (typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
      throw new Error(`${message}${details ? ` - Details: ${details}` : ''}`);
    }
    
    const data = await response.json();

    // Additional check for application-level errors returned in a 200 OK response but with an error structure
    // This depends on how your Netlify function formats errors vs successful data
    if (data && data.error) {
        console.error("Application-level error from proxy:", data);
        throw new Error(data.error + (data.details ? ` - Details: ${data.details}` : '') + (data.rawText ? ` Raw: ${data.rawText.substring(0,100)}...` : ''));
    }
    
    return data as T;

  } catch (error) {
    console.error(`Error calling API proxy for action "${action}":`, error);
    if (error instanceof Error) {
      // Rethrow to be caught by the UI layer
      throw error; 
    }
    throw new Error(`An unknown error occurred while calling the API proxy for "${action}".`);
  }
};

export const generateProductIdea = async (): Promise<ProductIdea | null> => {
  try {
    const idea = await callApiProxy<ProductIdea>('generateProductIdea');
    if (!idea || !idea.niche || !idea.productIdeaName) {
        console.error("Generated idea from proxy is invalid or incomplete:", idea);
        throw new Error("Failed to generate a valid product idea via proxy. The AI's response was not in the expected format.");
    }
    return idea;
  } catch (error) {
    console.error("Error in generateProductIdea (service level):", error);
    if (error instanceof Error) throw error; // Re-throw specific error
    throw new Error("An unknown error occurred while generating product idea via proxy.");
  }
};

export const buildFullProduct = async (idea: ProductIdea): Promise<FullProduct | null> => {
  try {
    const product = await callApiProxy<FullProduct>('buildFullProduct', { idea });
    if (!product || !product.productName || !product.programStructure || product.programStructure.length === 0) {
        console.error("Generated product from proxy is invalid or incomplete:", product);
        throw new Error("Failed to generate a valid full product via proxy. The AI's response was not in the expected format or was incomplete.");
    }
    return product;
  } catch (error) {
    console.error("Error in buildFullProduct (service level):", error);
    if (error instanceof Error) throw error; // Re-throw specific error
    throw new Error("An unknown error occurred while building the full product via proxy.");
  }
};
