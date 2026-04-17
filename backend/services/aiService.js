const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function detectLanguage(text) {
  if (/[әіңғүұқөһ]/i.test(text)) return "kk";
  if (/\b(в|на|по|из|для|это|что|как|статья|закон)\b/i.test(text)) return "ru";
  if (/\b(the|and|or|shall|law|pursuant|article)\b/i.test(text)) return "en";
  return "ru";
}

async function simplifyText(text, language) {
  const lang = language || detectLanguage(text);

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Ты юридический AI. Упрощай законы и юридические тексты так, чтобы их понимал обычный человек. Сохраняй смысл, убирай сложные конструкции.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.3,
  });

  return {
    simplifiedText: response.choices[0].message.content,
    language: lang,
  };
}

module.exports = { simplifyText };