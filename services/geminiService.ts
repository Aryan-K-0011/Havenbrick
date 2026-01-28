import { GoogleGenAI } from "@google/genai";
import { PROPERTIES } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    // Access process.env.API_KEY directly as required by the build configuration.
    // The build process (Vite) replaces this string with the actual env value.
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
};

export const chatWithAgent = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  const client = getAIClient();
  if (!client) {
    return "I'm sorry, my connection to the server is currently unavailable. Please try again later.";
  }

  try {
    // Construct a context-aware system instruction
    const propertyContext = PROPERTIES.map(p => 
      `- ${p.title} (${p.type}): ${p.beds} bed, ${p.baths} bath, $${p.price.toLocaleString()}. Located at ${p.address}. ID: ${p.id}`
    ).join('\n');

    const systemInstruction = `You are "Haven", the expert AI real estate concierge for Havenbrick Realty. 
    Your tone is professional, warm, and helpful. 
    You have access to the following property listings in our database:
    ${propertyContext}
    
    If a user asks about available properties, use the list above to recommend specific ones based on their needs.
    If they ask about general real estate advice (mortgages, selling tips), provide expert, concise advice.
    Always be polite and encourage them to schedule a viewing or contact an agent for more details.
    Keep responses concise (under 100 words) unless detailed info is requested.`;

    const model = 'gemini-3-flash-preview';
    
    // Using generateContent with manual history management for a stateless request.
    const response = await client.models.generateContent({
      model: model,
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble accessing the property database right now. Please try again in a moment.";
  }
};