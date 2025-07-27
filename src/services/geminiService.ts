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
    
    const text = response.text;
    if (text === undefined) {
        throw new Error("The AI model did not provide a text response.");
    }
    return text;
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
