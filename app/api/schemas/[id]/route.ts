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

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    
    const { id } = await context.params;

    const schemas = readSchemas();
    console.log("Before delete:", schemas.length);

    const updated = schemas.filter((s: any) => s.id !== id);
    console.log("After delete:", updated.length);

    writeSchemas(updated);

    return NextResponse.json({ success: true });
}
