import { GoogleGenAI } from "@google/genai";
import { PROPERTIES } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
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
    
    // Transform history for the API
    // Note: The new SDK uses a stateless approach or chat sessions. 
    // For simplicity in this functional component wrapper, we will use generateContent with the history as context in the prompt 
    // or use a fresh chat session each time if we want to maintain state properly. 
    // However, to strictly follow the guidelines and efficient usage, we'll use a chat session if possible, 
    // but here we will simulate a turn by sending recent history + new message to generateContent for simplicity in a stateless service function,
    // OR better, instantiate a chat.
    
    // Let's use ai.chats.create for proper history management if we were persistent, 
    // but since this function is called once per send, we'll recreate the context or just use generateContent for the immediate response.
    // To give the best "Chat" experience, we will include the history in the "contents" as a multi-turn structure if the API supports it in one go, 
    // but the Chat object is stateful.
    
    // Better approach for this stateless service export: Use generateContent but prepend history to the prompt manually 
    // or properly map it to the Content object structure if we were building a full chat object manager.
    // For this implementation, we will use a simple generateContent call with system instruction.
    
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
