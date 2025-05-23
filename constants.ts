
export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';

export const IDEA_GENERATION_PROMPT = `
You are an expert in identifying niche market opportunities and creating compelling digital product ideas.
Generate a UNIQUE, specific, and marketable Digital Product 2.0 idea.
The idea MUST be based on real-world demand and target a unique type of person with a specific, painful problem and strong motivation to buy.
Avoid general, vague, or recycled course topics. Be niche, surprising, and psychologically sharp.

For example:
- "Reboot Your Brain in 90 Days: A Neuroplasticity Plan for Adults with ADHD Who Feel Mentally Burnt Out"
- "Fix Your Knees at Home: A Digital Program for Elderly People Struggling With Chronic Joint Pain"
- "Write Your First Children’s Book in 7 Days: For Stay-at-Home Moms With a Creative Side and No Writing Experience"

Provide the output in the following JSON format:
{
  "niche": "Exact type of person targeted (e.g., 'Adults with ADHD who feel mentally burnt out')",
  "coreProblem": "The painful, urgent, and real problem they face (e.g., 'Constant mental fog, inability to focus, and feeling overwhelmed by daily tasks due to ADHD burnout')",
  "transformationOutcome": "What the product promises as a result (e.g., 'Regained mental clarity, improved focus, and sustainable strategies to manage ADHD symptoms and prevent burnout')",
  "productIdeaName": "A compelling and descriptive name for the digital product (e.g., 'ADHD Brain Reboot: 90-Day Neuroplasticity Plan')",
  "willingnessToBuy": "Brief logic for why this audience would pay for this solution (e.g., 'High-functioning individuals with ADHD are often desperate for effective, non-pharmacological solutions to improve their quality of life and productivity, and are willing to invest in structured programs promising tangible results.')"
}

Ensure the JSON is valid and complete. Do not include any text outside the JSON object itself. The JSON should start with { and end with }.
`;

export const FULL_PRODUCT_CREATION_PROMPT_TEMPLATE = (idea: { niche: string; coreProblem: string; transformationOutcome: string; productIdeaName: string; }) => `
You are an expert digital product creator and marketer. Based on the following approved product idea, generate a complete Digital Product 2.0.

Approved Product Idea:
Niche: ${idea.niche}
Core Problem: ${idea.coreProblem}
Transformation / Outcome: ${idea.transformationOutcome}
Product Idea Name: ${idea.productIdeaName}

Generate the full product details in a valid JSON format. The JSON structure should be as follows:

{
  "productName": "${idea.productIdeaName}",
  "targetAudienceProfile": {
    "detailedPersona": "Create a detailed persona for the target user. Include demographics (if applicable), psychographics, daily routines, tech-savviness, and a short backstory related to their core problem. Min 100 words.",
    "goals": ["List 2-3 primary goals of this persona related to solving their core problem."],
    "pains": ["List 2-3 major pain points this persona experiences due to the core problem."],
    "behaviors": ["Describe typical behaviors of this persona when trying to address their problem (e.g., what they search for, what solutions they've tried)."]
  },
  "coreValueProposition": "A 1-2 sentence compelling hook that clearly communicates the unique benefit of the product.",
  "transformationPromise": {
    "before": "Describe the persona's state BEFORE using the product, emphasizing their struggles.",
    "after": "Describe the persona's state AFTER successfully completing the product, highlighting the achieved transformation."
  },
  "pricingStrategy": {
    "psychologicalTriggers": ["Suggest 2-3 psychological triggers to use in pricing and marketing (e.g., scarcity, social proof, anchoring)."],
    "tiers": [
      {
        "name": "Basic Access",
        "price": "Suggest a price (e.g., '$47')",
        "features": ["List 3-5 key features for this tier"],
        "description": "Brief description of who this tier is for."
      },
      {
        "name": "Premium Immersion",
        "price": "Suggest a price (e.g., '$97')",
        "features": ["List 3-5 key features for this tier, including more value than basic"],
        "description": "Brief description of who this tier is for."
      }
    ]
  },
  "marketingAngles": {
    "emotionalHooks": ["List 2-3 strong emotional hooks to connect with the audience's pain and aspirations."],
    "adIdeas": [
      {"platform": "Facebook Ad", "copy": "Write a short, compelling ad copy example (around 50 words)."},
      {"platform": "Google Search Ad", "headline": "Write a catchy headline (max 30 chars)", "description": "Write a brief description (max 90 chars)."}
    ],
    "salesPageHeadlines": [
      "Headline option 1 focusing on pain.",
      "Headline option 2 focusing on transformation.",
      "Headline option 3 using a question."
    ]
  },
  "programStructure": [
    {
      "moduleNumber": 1,
      "moduleTitle": "Module 1: [Example: Understanding Your Foundation]",
      "goal": "Clearly define the primary learning objective or outcome for this module.",
      "videoScript": "Write a detailed video script (approx. 200-300 words) for this module. Include what the user should say on camera, key points, and any on-screen text suggestions. Start with a hook, deliver value, and end with a call to action for the next step or asset.",
      "breakthroughMoment": "Describe the key insight or 'aha!' moment the user should experience in this module.",
      "digitalToolsAndAssets": ["List 2-3 specific, actionable digital tools or assets for this module (e.g., 'Self-Assessment Checklist.pdf', 'Goal Setting Worksheet.docx'). Describe them briefly."]
    }
  ],
  "leadMagnetSuggestion": {
    "title": "Suggest a compelling title for a lead magnet.",
    "format": "Suggest a format (e.g., 'Checklist', 'Mini-Guide', 'Video Workshop Invite').",
    "description": "Briefly describe what the lead magnet offers and how it relates to the main product."
  },
  "visualIdentityGuidance": {
    "colorScheme": {
      "primary": "#HexCode (e.g., '#3B82F6' - a vibrant blue)",
      "secondary": "#HexCode (e.g., '#F59E0B' - a warm accent)",
      "accent": "#HexCode (e.g., '#10B981' - an energetic green)",
      "neutralLight": "#HexCode (e.g., '#F3F4F6' - for backgrounds)",
      "neutralDark": "#HexCode (e.g., '#1F2937' - for text)"
    },
    "fonts": {
      "headings": "Suggest a modern sans-serif font (e.g., 'Montserrat', 'Poppins')",
      "body": "Suggest a readable sans-serif font (e.g., 'Inter', 'Open Sans')"
    },
    "brandingNotes": ["Provide 2-3 brief notes on achieving a modern, clean, and trustworthy brand aesthetic. Example: 'Prioritize whitespace.'"]
  }
}

Important: The 'programStructure' array should contain between 3 and 5 module objects, each following the specified structure. Ensure the entire output is a single, valid JSON object without any surrounding text or markdown.
`;
