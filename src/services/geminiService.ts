import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment. For client-side, this needs to be handled by the build process or server.
// In a real production app, this key should NOT be directly exposed on the client.
// This setup assumes process.env.API_KEY is correctly populated in the execution environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will not work.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
const modelName = 'gemini-2.5-flash-lite'; // Use the specified model

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
    
    const text = response.text;
    if (text === undefined) {
        throw new Error("The AI model did not provide a text response.");
    }
    return text;
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
    
    const text = response.text;
    if (text === undefined) {
        throw new Error("The AI model did not provide a text response.");
    }
    return text;
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

export const breakdownProblem = async (problem: string): Promise<any> => {
  if (!ai) {
    throw new Error("AI service is currently unavailable. Please ensure the API key is configured.");
  }

  if (!problem.trim()) {
    throw new Error("Please provide a problem to solve.");
  }

  const prompt = `
    SYSTEM INSTRUCTION:
    You are an expert problem-solving AI. Your sole purpose is to break down physics and mathematics problems into clear, structured steps. You MUST follow all instructions precisely and return ONLY a valid JSON object that adheres to the specified schema. Do not output any text, markdown, or notes outside of the JSON object.

    CRITICAL JSON FORMATTING RULES:
    - Return ONLY the JSON object, no other text before or after
    - Use proper LaTeX formatting for mathematical expressions
    - Escape quotes within strings with \\"
    - Do not include any markdown formatting or extra text outside the JSON
    - Ensure all strings are properly quoted and escaped
    - Do not use single quotes, only double quotes
    - Do not include trailing commas
    - IMPORTANT: Add line breaks (\\n) between sentences in descriptions and calculations for better readability
    - CRITICAL: Do not include JSON formatting, metadata, or structural information in the content fields (description, calculation, result, etc.)

    PROBLEM TO SOLVE:
    "${problem}"

    INSTRUCTIONS:
    1. Analyze the given problem carefully
    2. Identify the key information and what needs to be found
    3. Break down the solution into clear, logical steps
    4. Use LaTeX for mathematical equations (use $ for inline math and $$ for block math) - it will be rendered with KaTeX
    5. Provide a concise, step-by-step solution without personality or unnecessary explanations
    6. Ensure all calculations are shown clearly
    7. Include the final answer with proper units
    8. Add line breaks (\\n) between sentences in descriptions and calculations for better readability
    9. IMPORTANT: The content fields should contain only the actual solution content, not JSON formatting or metadata

    REQUIRED JSON OUTPUT SCHEMA:
    {
      "title": "Problem Breakdown",
      "problem": "The original problem statement",
      "given": ["List of given information and values"],
      "find": "What we need to find or calculate",
      "principles": ["List of relevant formulas, laws, or principles (use LaTeX where appropriate)"],
      "steps": [
        {
          "step": <integer>,
          "description": "Clear description of what this step accomplishes. Use \\n for line breaks between sentences.",
          "calculation": "The mathematical work for this step (use perfect LaTeX formatting for equations). Use \\n for line breaks between sentences.",
          "result": "The result of this step (with units if applicable)"
        }
      ],
      "finalAnswer": "The final answer with proper units (use perfect LaTeX formatting if it involves an equation)",
      "concept": "Brief explanation of the key physics/mathematics concept involved"
    }

    REMEMBER: Start your response with { and end with }. Do not include any text outside the JSON object. The content fields should contain only the actual solution content.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 15000 }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI model returned an empty response. Cannot parse problem breakdown.");
    }

    // Try to parse the JSON response with improved error handling
    let parsedResponse;
    let cleanedText = text.trim();
    
    // Function to extract JSON from text
    const extractJSON = (text: string): string | null => {
      // Try to find JSON object boundaries
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return jsonMatch[0];
      }
      return null;
    };
    
    try {
      // First attempt: direct parsing
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response:", text);
      
      // Try to extract JSON from the response if there's extra text
      const extractedJSON = extractJSON(cleanedText);
      if (extractedJSON) {
        cleanedText = extractedJSON;
        console.log("Extracted JSON:", cleanedText);
        
        try {
          parsedResponse = JSON.parse(cleanedText);
        } catch (extractError) {
          console.error("Extracted JSON parse failed:", extractError);
        }
      }
      
      // If still not parsed, try more aggressive fixes
      if (!parsedResponse) {
        try {
          let fixedText = cleanedText;
          
          // Only fix the most critical JSON issues, not LaTeX
          // Fix single quotes to double quotes (but be careful)
          fixedText = fixedText.replace(/(?<!\\)'/g, '"');
          
          // Remove trailing commas before closing brackets/braces
          fixedText = fixedText.replace(/,(\s*[}\]])/g, '$1');
          
          // Fix unescaped quotes within strings
          fixedText = fixedText.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, '"$1\\"$2\\"$3"');
          
          // Try parsing again
          parsedResponse = JSON.parse(fixedText);
        } catch (secondParseError) {
          console.error("Second parse attempt failed:", secondParseError);
          
          // Last resort: try to create a structured fallback response
          console.warn("All parsing attempts failed, creating fallback response");
          const fallbackResponse = {
            title: "Problem Breakdown",
            problem: problem,
            given: ["Information provided in the problem"],
            find: "Solution to the problem",
            principles: ["Relevant mathematical and physical principles"],
            steps: [
              {
                step: 1,
                description: "Analysis of the problem",
                calculation: "The AI response could not be parsed properly. Please try again with a different problem.",
                result: "See calculation above"
              }
            ],
            finalAnswer: "Please try again with a different problem",
            concept: "The solution involves applying relevant mathematical and physical principles"
          };
          
          return fallbackResponse;
        }
      }
    }

    // Validate the response structure
    if (!parsedResponse || typeof parsedResponse !== 'object') {
      throw new Error("The AI response is not a valid object.");
    }

    // Check for required fields and provide defaults
    const requiredFields = ['title', 'problem', 'given', 'find', 'principles', 'steps', 'finalAnswer', 'concept'];
    const missingFields = requiredFields.filter(field => !(field in parsedResponse));
    
    if (missingFields.length > 0) {
      console.warn(`Missing required fields: ${missingFields.join(', ')}`);
      
      // Provide defaults for missing fields
      if (!parsedResponse.title) parsedResponse.title = "Problem Breakdown";
      if (!parsedResponse.problem) parsedResponse.problem = problem;
      if (!parsedResponse.given) parsedResponse.given = ["Information provided in the problem"];
      if (!parsedResponse.find) parsedResponse.find = "Solution to the problem";
      if (!parsedResponse.principles) parsedResponse.principles = ["Relevant mathematical and physical principles"];
      if (!parsedResponse.steps) parsedResponse.steps = [];
      if (!parsedResponse.finalAnswer) parsedResponse.finalAnswer = "See step-by-step solution above";
      if (!parsedResponse.concept) parsedResponse.concept = "The solution involves applying relevant mathematical and physical principles";
    }

    // Ensure steps is an array and has proper structure
    if (!Array.isArray(parsedResponse.steps)) {
      parsedResponse.steps = [];
    }

    // Clean up and validate each step
    parsedResponse.steps = parsedResponse.steps.map((step: any, index: number) => {
      if (!step || typeof step !== 'object') {
        return {
          step: index + 1,
          description: "Step description not available",
          calculation: "Calculation not available",
          result: "Result not available"
        };
      }

      // Clean up the calculation field to remove any JSON artifacts
      let cleanCalculation = step.calculation || "Calculation not available";
      if (typeof cleanCalculation === 'string') {
        // Remove any JSON-like artifacts that might have been included
        cleanCalculation = cleanCalculation
          .replace(/\{[^}]*\}/g, '') // Remove simple JSON objects
          .replace(/\[[^\]]*\]/g, '') // Remove simple JSON arrays
          .replace(/"([^"]*)":/g, '$1:') // Remove JSON key quotes
          .replace(/,\s*}/g, '}') // Remove trailing commas
          .replace(/,\s*\]/g, ']') // Remove trailing commas in arrays
          .trim();
        
        // If the calculation is now empty or just contains JSON artifacts, provide a default
        if (!cleanCalculation || cleanCalculation.length < 10) {
          cleanCalculation = "Calculation not available";
        }
      }

      return {
        step: step.step || index + 1,
        description: step.description || "Step description not available",
        calculation: cleanCalculation,
        result: step.result || "Result not available"
      };
    });

    // Ensure arrays are actually arrays
    if (!Array.isArray(parsedResponse.given)) {
      parsedResponse.given = [parsedResponse.given || "Information provided in the problem"];
    }
    if (!Array.isArray(parsedResponse.principles)) {
      parsedResponse.principles = [parsedResponse.principles || "Relevant mathematical and physical principles"];
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error breaking down problem:", error);
    if (error instanceof Error) {
      if (error.message.includes('API key not valid')) {
        throw new Error("Failed to solve problem: The API key is invalid.");
      }
      throw new Error(`Failed to solve problem: ${error.message}`);
    }
    throw new Error("Failed to solve problem due to an unknown error.");
  }
};

export const generateRevisionTimetable = async (
  exams: { subject: string; date: string; tasks: string[] }[], 
  startDate: string, 
  hoursPerWeek: number, 
  studyTimes: { [day: string]: string[] }
): Promise<any> => {
  if (!ai) {
    throw new Error("AI service is currently unavailable. Please ensure the API key is configured.");
  }

  const lastExamDate = exams.map(e => e.date).sort().pop();
  if (!lastExamDate) {
    throw new Error("Cannot generate a timetable without at least one exam date.");
  }

  const userExams = exams.map(exam => {
    const taskList = exam.tasks.length > 0 ? ` (Specific tasks: ${exam.tasks.join(', ')})` : '';
    return `- Subject: ${exam.subject}, Exam Date: ${exam.date}${taskList}`;
  }).join('\n');
  
  const userStudyTimes = Object.entries(studyTimes).length > 0
    ? Object.entries(studyTimes).map(([day, slots]) => `- ${day}: ${slots.join(', ')}`).join('\n')
    : "The user has not specified preferred study times. Please allocate the study sessions evenly throughout the week, prioritizing evenings on weekdays and afternoons on weekends.";

  const prompt = `
    SYSTEM INSTRUCTION:
    You are an expert academic planner AI. Your sole purpose is to create a personalized revision timetable based on the user's data. You MUST follow all instructions precisely and return ONLY a valid JSON object that adheres to the specified schema. Do not output any text, markdown, or notes outside of the JSON object.

    USER DATA:
    
    1. EXAM SCHEDULE AND TASKS:
    ${userExams}

    2. REVISION PREFERENCES:
    - Revision Start Date: ${startDate}
    - Final Exam Date: ${lastExamDate}
    - Target Study Hours Per Week: ${hoursPerWeek}
    
    3. PREFERRED STUDY TIMES:
    ${userStudyTimes}

    PLANNING INSTRUCTIONS:
    1.  Create a detailed, personalized revision timetable using ONLY the USER DATA provided above.
    2.  Prioritize subjects with earlier exam dates.
    3.  Break down the subjects into specific, manageable topics.
    4.  **Crucially, incorporate the specific tasks listed by the user for each subject into the schedule.** These tasks should be treated as high-priority items.
    5.  Distribute study sessions and tasks across the user's PREFERRED STUDY TIMES. If none are provided, distribute them evenly as instructed in the user data section.
    6.  Each study session should be between 60 to 120 minutes.
    7.  The total study time for each week must be approximately equal to the user's "Target Study Hours Per Week".
    8.  Incorporate at least one rest day or a day with significantly lighter study load per week.
    9.  Generate a schedule covering the entire period from the 'Revision Start Date' up to (but not including) the 'Final Exam Date'.

    REQUIRED JSON OUTPUT SCHEMA:
    {
      "title": "Your Personalised Revision Timetable",
      "summary": "A brief (1-2 sentence) summary of the generated plan, mentioning the number of weeks and total hours.",
      "weeklySchedule": [
        {
          "week": <integer>,
          "dates": "<string> (e.g., 'YYYY-MM-DD to YYYY-MM-DD')",
          "dailySessions": [
            {
              "day": "<string> (e.g., 'Monday')",
              "tasks": [
                { "time": "<string> (e.g., '18:00 - 19:30')", "subject": "<string>", "topic": "<string> (This can be a general topic or a specific user-defined task)" }
              ]
            }
          ]
        }
      ]
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 15000 }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI model returned an empty response. Cannot parse timetable.");
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating revision timetable:", error);
    if (error instanceof Error) {
      if (error.message.includes('API key not valid')) {
        throw new Error("Failed to generate timetable: The API key is invalid.");
      }
      throw new Error(`Failed to generate timetable: ${error.message}`);
    }
    throw new Error("Failed to generate timetable due to an unknown error.");
  }
};
