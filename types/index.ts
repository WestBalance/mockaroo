export type FieldType =
    | "Row Number"
    | "First Name"
    | "Last Name"
    | "Email Address"
    | "Gender"
    | "IP Address v4";

export interface Field {
    id: string;
    name: string;
    type: FieldType;
    blankPercent: number;
    sum: boolean;
}
