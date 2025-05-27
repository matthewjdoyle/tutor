import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment. For client-side, this needs to be handled by the build process or server.
// In a real production app, this key should NOT be directly exposed on the client.
// This setup assumes process.env.API_KEY is correctly populated in the execution environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will not work.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
const modelName = 'gemini-2.5-flash-preview-04-17'; // Use the specified model

export const generateStudyTip = async (topic: string): Promise<string> => {
  if (!ai) {
    return "AI service is currently unavailable. Please ensure the API key is configured.";
  }

  if (!topic.trim()) {
    return "Please provide a topic for the study tip.";
  }

  try {
    const prompt = `Provide a concise, actionable, and encouraging study tip for the topic: "${topic}". Make it sound like it's from an expert tutor. Focus on one key piece of advice. Maximum 2-3 sentences.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        // For low latency/quick tip - disable thinking.
        // For potentially higher quality but slightly slower, omit thinkingConfig or set budget > 0
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating study tip:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
             return "Failed to generate study tip: The API key is invalid. Please check your configuration.";
        }
         return `Failed to generate study tip: ${error.message}. Please try again later.`;
    }
    return "Failed to generate study tip due to an unknown error. Please try again later.";
  }
};

export const generateMotivationalQuote = async (): Promise<string> => {
  if (!ai) {
    return "AI service is currently unavailable. Please ensure the API key is configured.";
  }

  try {
    const prompt = `Generate an inspiring and motivational quote specifically for students studying maths, physics, or coding. The quote should be encouraging, uplifting, and help them push through difficult study sessions. Make it original and powerful. Just return the quote without any extra text or quotation marks.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating motivational quote:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
             return "Failed to generate quote: The API key is invalid. Please check your configuration.";
        }
         return `Failed to generate quote: ${error.message}. Please try again later.`;
    }
    return "Failed to generate quote due to an unknown error. Please try again later.";
  }
};

export const solvePhysicsProblem = async (problem: string): Promise<string> => {
  if (!ai) {
    return "AI service is currently unavailable. Please ensure the API key is configured.";
  }

  if (!problem.trim()) {
    return "Please provide a physics problem to solve.";
  }

  try {
    const prompt = `You are Dr. Doyle, an expert physics tutor. Solve this physics problem step by step with clear explanations:

"${problem}"

You can use LaTeX for mathematical equations. Use $ for inline math (e.g., $E=mc^2$) and $$ for block math (e.g., $$\sum F = ma$$).

Please provide:
1. Given information
2. What we need to find
3. Relevant formulas/principles (use LaTeX where appropriate)
4. Step-by-step solution with calculations (use LaTeX for equations)
5. Final answer with proper units (use LaTeX if it involves an equation)
6. Brief explanation of the physics concepts involved

Format your response clearly with numbered steps and show all work. Ensure LaTeX is correctly formatted for rendering with KaTeX.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 10000 } // Allow more thinking for complex problems
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error solving physics problem:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
             return "Failed to solve problem: The API key is invalid. Please check your configuration.";
        }
         return `Failed to solve problem: ${error.message}. Please try again later.`;
    }
    return "Failed to solve problem due to an unknown error. Please try again later.";
  }
};
