
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
/* eslint-disable @typescript-eslint/no-explicit-any */
const filePath = path.join(process.cwd(), "schemas.json");

// Чтение файла
function readSchemas() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Сохранение файла
function writeSchemas(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET — получить все схемы
export async function GET() {
    const schemas = readSchemas();
    return NextResponse.json(schemas);
}

// POST — сохранить новую схему
export async function POST(req: Request) {
    const body = await req.json();
    const schemas = readSchemas();

    const newSchema = {
        id: Date.now().toString(),
        ...body,
    };

    schemas.push(newSchema);
    writeSchemas(schemas);

    return NextResponse.json(newSchema);
}
