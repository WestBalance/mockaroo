/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/generateData.ts
import { fieldGenerators } from "./fieldGenerators";
import { Field } from "@/types/Fields";

export function generateData(fields: Field[], rowCount: number) {
    const result: any[] = [];

    // Массив для хранения сумм по полям
    const sums: Record<string, number> = {};

    for (let i = 0; i < rowCount; i++) {
        const row: Record<string, any> = {};

        for (const field of fields) {
            const generator = fieldGenerators[field.type];
            if (!generator) continue;

            const isBlank = Math.random() < field.blankPercent / 100;
            const value = isBlank ? null : generator(i);

            row[field.name || field.type] = value;

            // Считаем сумму, если поле sum
            if (field.sum && typeof value === "number") {
                sums[field.name || field.type] = (sums[field.name || field.type] || 0) + value;
            }
        }

        result.push(row);
    }

    // Добавляем строку с суммами
    if (Object.keys(sums).length > 0) {
        const sumRow: Record<string, any> = {};
        sumRow["Σ Total"] = "Σ Total";
        for (const field of fields) {
            const key = field.name || field.type;
            sumRow[key] = field.sum ? sums[key] : null;
        }
       
       
        result.push(sumRow);
    }

    return result;
}
