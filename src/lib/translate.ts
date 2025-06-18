"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
  vi: "Vietnamese",
  th: "Thai",
  tr: "Turkish",
};

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: "strict",
  apiKey: process.env.OPENAI_API_KEY,
});
export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string,
): Promise<string> {
  try {
    const sourceLanguage = languageNames[sourceLang] || sourceLang;
    const targetLanguage = languageNames[targetLang] || targetLang;

    const { text: translatedText } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Only return the translation, no explanations or additional text:
"${text}"`,
    });

    return translatedText.trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation failed");
  }
}

export async function getDefinitions(
  word: string,
  language: string,
): Promise<unknown> {
  try {
    const languageName = languageNames[language] || language;

    const { text: definitionsText } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Provide detailed definitions for the word "${word}" in ${languageName}. 

Return the response in this exact JSON format:
{
  "word": "${word}",
  "pronunciation": "phonetic pronunciation using IPA or simple phonetics",
  "definitions": [
    {
      "partOfSpeech": "noun/verb/adjective/etc",
      "definitions": [
        "definition 1",
        "definition 2",
        "definition 3"
      ]
    }
  ],
  "examples": [
    "Example sentence 1 using the word in context",
    "Example sentence 2 using the word in context", 
    "Example sentence 3 using the word in context",
    "Example sentence 4 using the word in context",
    "Example sentence 5 using the word in context"
  ]
}

Make sure to provide:
- Accurate phonetic pronunciation
- Multiple definitions for different parts of speech if applicable
- 5 realistic example sentences showing the word in different contexts
- Only return valid JSON, no additional text`,
    });

    return JSON.parse(definitionsText.trim());
  } catch (error) {
    console.error("Definitions error:", error);
    // Return a fallback structure
    return {
      word: word,
      pronunciation: word.toLowerCase(),
      definitions: [
        {
          partOfSpeech: "word",
          definitions: ["Definition not available at the moment."],
        },
      ],
      examples: ["Example not available at the moment."],
    };
  }
}
