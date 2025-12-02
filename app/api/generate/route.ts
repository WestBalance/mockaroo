import { NextResponse } from "next/server";
import { generateData } from "@/utils/generateData";
import { Field } from "@/types/Fields";

export async function POST(req: Request) {
    try {
        const { fields, rowCount } = await req.json() as {
            fields: Field[];
            rowCount: number;
        };

        if (!fields || fields.length === 0) {
            return NextResponse.json({ error: "Fields are required" }, { status: 400 });
        }

        const data = generateData(fields, rowCount || 100);

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
