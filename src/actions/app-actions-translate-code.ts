"use server";

import axios from "axios";

export async function translateCode(prevState: unknown, formData: FormData) {
  const sourceLanguage = formData.get("sourceLanguage") as string;
  const targetLanguage = formData.get("targetLanguage") as string;
  const sourceCode = formData.get("sourceCode") as string;

  if (!sourceCode) {
    return { translatedCode: "", error: "Source code is required." };
  }

  const prompt = `Translate the following ${sourceLanguage} code to ${targetLanguage}:

${sourceCode}

Provide only the translated code without any explanations or additional text.`;

  try {
    const response = await axios.post(
      "https://phi.us.gaianet.network/v1/chat/completions",
      {
        model: "llama",
        messages: [
          {
            role: "system",
            content:
              "You are a code translator that accurately converts code from one programming language to another.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }
    );

    const translatedCode = response.data.choices[0].message.content;

    return { translatedCode, error: null };
  } catch (error) {
    console.error("Error translating code:", error);
    return {
      translatedCode: "",
      error: "An error occurred while translating the code. Please try again.",
    };
  }
}
