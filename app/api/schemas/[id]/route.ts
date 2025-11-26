import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */
const filePath = path.join(process.cwd(), "schemas.json");

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Читаем файл
        let raw = "[]";
        try {
            raw = await fs.readFile(filePath, "utf8");
        } catch {
            await fs.writeFile(filePath, "[]");
        }

        const list = JSON.parse(raw);

        // Удаляем нужную схему
        const newList = list.filter((s: any) => s.id !== params.id);

        // Записываем обновлённый список
        await fs.writeFile(filePath, JSON.stringify(newList, null, 2));

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("DELETE error", err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
