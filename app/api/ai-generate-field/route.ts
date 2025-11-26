import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || prompt.trim() === "") {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Создаём инструкцию для AI: вернуть JSON с новым полем
        const systemMessage = `
      You are a generator of mock data fields. 
      Return a single JSON object with keys: name, type, aiValues (array), blankPercent (0-100), sum (boolean).
      Example response:
      {
        "name": "Category",
        "type": "Category",
        "aiValues": ["Electronics", "Clothing", "Books"],
        "blankPercent": 0,
        "sum": false
      }
      If the prompt does not include a name, invent a meaningful name.
    `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
        });

        const message = response.choices?.[0]?.message?.content;

        if (!message) {
            return NextResponse.json({ error: "AI response missing message content" }, { status: 500 });
        }

        // Пробуем распарсить JSON
        const newField = JSON.parse(message);

        return NextResponse.json(newField);

    } catch (err) {
        console.error("AI generation error:", err);
        return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }
}
