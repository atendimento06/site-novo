import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCreativeCaption = async (context: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Erro: API Key não configurada.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Crie uma legenda curta, profissional e convidativa (máximo 20 palavras) para uma página de redirecionamento de uma empresa. 
      O contexto ou nome da empresa é: "${context}". 
      A legenda deve incentivar o usuário a clicar em um botão 'Continuar'. 
      Retorne apenas o texto da legenda.`,
    });

    return response.text?.trim() || "Clique para continuar.";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Não foi possível gerar a legenda. Tente novamente.";
  }
};