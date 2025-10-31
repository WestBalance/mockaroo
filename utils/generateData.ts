/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/generateData.ts
import { fieldGenerators } from "./fieldGenerators";
import { Field } from "@/types";

export function generateData(fields: Field[], rowCount: number) {
    const result: any[] = [];

    for (let i = 0; i < rowCount; i++) {
        const row: Record<string, any> = {};

        for (const field of fields) {
            const generator = fieldGenerators[field.type];
            if (!generator) continue;

            const isBlank = Math.random() < field.blankPercent / 100;
            row[field.name || field.type] = isBlank ? null : generator(i);
        }

        result.push(row);
    }

    return result;
}
