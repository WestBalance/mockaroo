/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

type Field = { id: string; name: string; type: string; options?: Record<string, any> };

export async function POST(request: Request) {
    const { schema, rows } = await request.json() as { schema: Field[]; rows: number };
    const out = [];
    for (let i = 0; i < (rows || 10); i++) {
        const item: Record<string, any> = {};
        for (const f of schema) {
            switch (f.type) {
                case 'Name': item[f.name] = faker.person.fullName(); break;
                case 'Email': item[f.name] = faker.internet.email(); break;
                case 'Integer': item[f.name] = faker.number.int({ min: 0, max: 1000 }); break;
                case 'Date': item[f.name] = faker.date.past().toISOString(); break;
                case 'Boolean': item[f.name] = faker.datatype.boolean(); break;
                case 'Sentence': item[f.name] = faker.lorem.sentence(); break;
                default: item[f.name] = null;
            }
        }
        out.push(item);
    }

    return NextResponse.json(out);
}
