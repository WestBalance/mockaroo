import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Generate a JSON object representing a single data field with a type, name, and optional blank percent. Example: {"name":"Age","type":"Number","blankPercent":0}. Prompt: ${prompt}`,
                },
            ],
        });

        const text = completion.choices[0]?.message?.content;

        if (!text) {
            return NextResponse.json({ error: "AI response missing content" }, { status: 500 });
        }

        // Парсим JSON, который вернул ИИ
        const field = JSON.parse(text);

        return NextResponse.json({ field });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }
}
