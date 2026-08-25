// Uses the free Gemini API with a key she/you provide and store locally
// (never hardcoded, never committed) — same pattern as your other
// browser-deployed AI apps. Get a free key at https://aistudio.google.com/apikey

const MODEL = 'gemini-2.0-flash'

export async function generateQuiz(apiKey, sourceText, subjectName) {
  const prompt = `You are creating a short study quiz for a 14-year-old student's ${subjectName} class, based only on the notes below. Write 6 questions that test understanding of the material (mix of multiple choice and short answer). Return ONLY valid JSON, no markdown fences, in this exact shape:
{"questions":[{"question":"...","type":"multiple_choice","options":["A","B","C","D"],"answer":"A","topic":"short topic label"}]}
For short-answer questions, omit "options" and set "type":"short_answer", with "answer" as the expected answer.

NOTES:
"""${sourceText.slice(0, 12000)}"""`

  const text = await callGemini(apiKey, prompt)
  return JSON.parse(stripFences(text))
}

export async function generateFlashcards(apiKey, sourceText, subjectName) {
  const prompt = `Create 10 flashcards for a 14-year-old student studying ${subjectName}, based only on the notes below. Return ONLY valid JSON, no markdown fences: {"cards":[{"front":"term or question","back":"concise answer"}]}

NOTES:
"""${sourceText.slice(0, 12000)}"""`

  const text = await callGemini(apiKey, prompt)
  return JSON.parse(stripFences(text))
}

async function callGemini(apiKey, prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error (${res.status}): ${err.slice(0, 200)}`)
  }
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No response text from Gemini.')
  return text
}

function stripFences(text) {
  return text.replace(/```json/g, '').replace(/```/g, '').trim()
}
