// Тип с категорией для модального выбора
export interface FieldTypeWithCategory {
    name: string;
    category: string;
}

// Основной тип поля
export type FieldType =
    // --- System ---
    | "Row Number"
    | "UUID"
    | "Increment ID"

    // --- Personal ---
    | "First Name"
    | "Last Name"
    | "Full Name"
    | "Gender"
    | "Age"
    | "Date of Birth"
    | "Phone Number"
    | "Email Address"
    | "Username"
    | "Password"
    | "Avatar URL"
    | "Profile Bio"

    // --- Internet ---
    | "Domain"
    | "URL"
    | "IP Address v4"
    | "IP Address v6"
    | "MAC Address"
    | "User Agent"
    | "Browser"
    | "Operating System"

    // --- Location ---
    | "Country"
    | "Country Code"
    | "City"
    | "Street Address"
    | "Zip Code"
    | "Latitude"
    | "Longitude"
    | "Time Zone"

    // --- Company / Business ---
    | "Company Name"
    | "Job Title"
    | "Department"
    | "Industry"
    | "Currency Code"
    | "IBAN"
    | "Credit Card Number"
    | "Credit Card Type"

    // --- Product / Commerce ---
    | "Product Name"
    | "Product Category"
    | "Price"
    | "Discount %"
    | "Quantity"
    | "SKU"
    | "Barcode"
    | "Color"
    | "Material"
    | "Size"

    // --- Dates & Time ---
    | "Date"
    | "Time"
    | "DateTime"
    | "Month"
    | "Year"
    | "Weekday"
    | "Timestamp (ms)"

    // --- Text / Content ---
    | "Sentence"
    | "Paragraph"
    | "Word"
    | "Hashtag"
    | "Emoji"
    | "Tagline"
    | "Quote"
    | "Language"

    // --- Finance ---
    | "Bank Name"
    | "SWIFT Code"
    | "Account Balance"
    | "Tax ID"
    | "VAT Number"
    | "Salary"
    | "Bitcoin Address"
    | "Ethereum Address"

    // --- Education ---
    | "University"
    | "Degree"
    | "Course Name"
    | "Grade"

    // --- Technology ---
    | "Programming Language"
    | "Framework"
    | "Database"
    | "File Extension"
    | "Version"
    | "Device Type"
    | "UUID Token"

    // --- Misc ---
   
    | "Boolean"
    | "Random Number"
    | "Random Float"
    | "Custom String"
    | "Null Value"
    | "Yes/No"
    | "True/False"
    | "Binary Flag"
    | "Animal"
    | "Fruit"
    | "Vehicle"
    | "Planet"
    | "Continent"
    | "Currency Symbol"
    | "Weather Condition"
    | "Temperature °C"
    | "Temperature °F"
    | "Blood Type";

// Массив всех типов
export const allFieldTypes: FieldType[] = [
    "Row Number", "UUID", "Increment ID",
    "First Name", "Last Name", "Full Name", "Gender", "Age", "Date of Birth", "Phone Number", "Email Address", "Username", "Password", "Avatar URL", "Profile Bio",
    "Domain", "URL", "IP Address v4", "IP Address v6", "MAC Address", "User Agent", "Browser", "Operating System",
    "Country", "Country Code", "City", "Street Address", "Zip Code", "Latitude", "Longitude", "Time Zone",
    "Company Name", "Job Title", "Department", "Industry", "Currency Code", "IBAN", "Credit Card Number", "Credit Card Type",
    "Product Name", "Product Category", "Price", "Discount %", "Quantity", "SKU", "Barcode", "Color", "Material", "Size",
    "Date", "Time", "DateTime", "Month", "Year", "Weekday", "Timestamp (ms)",
    "Sentence", "Paragraph", "Word", "Hashtag", "Emoji", "Tagline", "Quote", "Language",
    "Bank Name", "SWIFT Code", "Account Balance", "Tax ID", "VAT Number", "Salary", "Bitcoin Address", "Ethereum Address",
    "University", "Degree", "Course Name", "Grade",
    "Programming Language", "Framework", "Database", "File Extension", "Version", "Device Type", "UUID Token",
    "Boolean", "Random Number", "Random Float", "Custom String", "Null Value", "Yes/No", "True/False", "Binary Flag",
    "Animal", "Fruit", "Vehicle", "Planet", "Continent", "Currency Symbol", "Weather Condition", "Temperature °C", "Temperature °F", "Blood Type"
];

// Массив для модального выбора с категориями
export const allFieldTypesWithCategories: FieldTypeWithCategory[] = allFieldTypes.map((type) => {
    let category = "Misc";

    if (["Row Number", "UUID", "Increment ID"].includes(type)) category = "System";
    else if ([
        "First Name", "Last Name", "Full Name", "Gender", "Age", "Date of Birth", "Phone Number", "Email Address", "Username", "Password", "Avatar URL", "Profile Bio"
    ].includes(type)) category = "Personal";
    else if ([
        "Domain", "URL", "IP Address v4", "IP Address v6", "MAC Address", "User Agent", "Browser", "Operating System"
    ].includes(type)) category = "Internet";
    else if ([
        "Country", "Country Code", "City", "Street Address", "Zip Code", "Latitude", "Longitude", "Time Zone"
    ].includes(type)) category = "Location";
    else if ([
        "Company Name", "Job Title", "Department", "Industry", "Currency Code", "IBAN", "Credit Card Number", "Credit Card Type"
    ].includes(type)) category = "Company / Business";
    else if ([
        "Product Name", "Product Category", "Price", "Discount %", "Quantity", "SKU", "Barcode", "Color", "Material", "Size"
    ].includes(type)) category = "Product / Commerce";
    else if (["Date", "Time", "DateTime", "Month", "Year", "Weekday", "Timestamp (ms)"].includes(type)) category = "Dates & Time";
    else if (["Sentence", "Paragraph", "Word", "Hashtag", "Emoji", "Tagline", "Quote", "Language"].includes(type)) category = "Text / Content";
    else if (["Bank Name", "SWIFT Code", "Account Balance", "Tax ID", "VAT Number", "Salary", "Bitcoin Address", "Ethereum Address"].includes(type)) category = "Finance";
    else if (["University", "Degree", "Course Name", "Grade"].includes(type)) category = "Education";
    else if (["Programming Language", "Framework", "Database", "File Extension", "Version", "Device Type", "UUID Token"].includes(type)) category = "Technology";

    return { name: type, category };
});

