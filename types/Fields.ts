/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldType } from "@/types/FieldTypes";

export interface Field {
    id: string;
    name: string;
    type: FieldType;
    blankPercent: number;
    sum: boolean;
    aiValues?: any[]; 
}
