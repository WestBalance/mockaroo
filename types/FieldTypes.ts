
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
    | "Nationality"
    | "Marital Status"
    | "Religion"
    | "Language Spoken"

    // --- Internet ---
    | "Domain"
    | "URL"
    | "IP Address v4"
    | "IP Address v6"
    | "MAC Address"
    | "User Agent"
    | "Browser"
    | "Operating System"
    | "Email Provider"

    // --- Location ---
    | "Country"
    | "Country Code"
    | "City"
    | "Street Address"
    | "Zip Code"
    | "Latitude"
    | "Longitude"
    | "Time Zone"
    | "State / Province"
    | "Region"

    // --- Company / Business ---
    | "Company Name"
    | "Job Title"
    | "Department"
    | "Industry"
    | "Currency Code"
    | "IBAN"
    | "Credit Card Number"
    | "Credit Card Type"
    | "Company Size"
    | "Business Type"
    | "Office Location"
    | "Manager Name"

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
    | "Warranty Period"
    | "Supplier"

    // --- Insurance ---
    | "Life Insurance Type"
    | "Life Insurance Premium"
    | "Health Insurance Type"
    | "Health Insurance Coverage"
    | "Car Insurance Type"
    | "Car Insurance Premium"
    | "Home Insurance Type"
    | "Home Insurance Coverage"

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
    | "Stock Symbol"
    | "Credit Score"

    // --- Education ---
    | "University"
    | "Degree"
    | "Course Name"
    | "Grade"
    | "Field of Study"
    | "Enrollment Year"
    | "Graduation Year"

    // --- Technology ---
    | "Programming Language"
    | "Framework"
    | "Database"
    | "File Extension"
    | "Version"
    | "Device Type"
    | "UUID Token"
    | "OS Version"
    | "API Endpoint"

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
    | "Blood Type"
    | "Hobby"
    | "Skill"
    | "Favorite Color"
    | "Favorite Food"
    | "Favorite Drink";

// Массив всех типов
export const allFieldTypes: FieldType[] = [
    "Row Number", "UUID", "Increment ID",
    "First Name", "Last Name", "Full Name", "Gender", "Age", "Date of Birth", "Phone Number", "Email Address", "Username", "Password", "Avatar URL", "Profile Bio", "Nationality", "Marital Status", "Religion", "Language Spoken",
    "Domain", "URL", "IP Address v4", "IP Address v6", "MAC Address", "User Agent", "Browser", "Operating System", "Email Provider",
    "Country", "Country Code", "City", "Street Address", "Zip Code", "Latitude", "Longitude", "Time Zone", "State / Province", "Region",
    "Company Name", "Job Title", "Department", "Industry", "Currency Code", "IBAN", "Credit Card Number", "Credit Card Type", "Company Size", "Business Type", "Office Location", "Manager Name",
    "Product Name", "Product Category", "Price", "Discount %", "Quantity", "SKU", "Barcode", "Color", "Material", "Size", "Warranty Period", "Supplier",
    "Life Insurance Type", "Life Insurance Premium", "Health Insurance Type", "Health Insurance Coverage", "Car Insurance Type", "Car Insurance Premium", "Home Insurance Type", "Home Insurance Coverage",
    "Date", "Time", "DateTime", "Month", "Year", "Weekday", "Timestamp (ms)",
    "Sentence", "Paragraph", "Word", "Hashtag", "Emoji", "Tagline", "Quote", "Language",
    "Bank Name", "SWIFT Code", "Account Balance", "Tax ID", "VAT Number", "Salary", "Bitcoin Address", "Ethereum Address", "Stock Symbol", "Credit Score",
    "University", "Degree", "Course Name", "Grade", "Field of Study", "Enrollment Year", "Graduation Year",
    "Programming Language", "Framework", "Database", "File Extension", "Version", "Device Type", "UUID Token", "OS Version", "API Endpoint",
    "Boolean", "Random Number", "Random Float", "Custom String", "Null Value", "Yes/No", "True/False", "Binary Flag", "Animal", "Fruit", "Vehicle", "Planet", "Continent", "Currency Symbol", "Weather Condition", "Temperature °C", "Temperature °F", "Blood Type", "Hobby", "Skill", "Favorite Color", "Favorite Food", "Favorite Drink"
];

// Массив для модального выбора с категориями
export const allFieldTypesWithCategories: FieldTypeWithCategory[] = allFieldTypes.map((type) => {
    let category = "Misc";

    if (["Row Number", "UUID", "Increment ID"].includes(type)) category = "System";
    else if ([
        "First Name", "Last Name", "Full Name", "Gender", "Age", "Date of Birth", "Phone Number", "Email Address", "Username", "Password", "Avatar URL", "Profile Bio", "Nationality", "Marital Status", "Religion", "Language Spoken"
    ].includes(type)) category = "Personal";
    else if (["Domain", "URL", "IP Address v4", "IP Address v6", "MAC Address", "User Agent", "Browser", "Operating System", "Email Provider"].includes(type)) category = "Internet";
    else if (["Country", "Country Code", "City", "Street Address", "Zip Code", "Latitude", "Longitude", "Time Zone", "State / Province", "Region"].includes(type)) category = "Location";
    else if (["Company Name", "Job Title", "Department", "Industry", "Currency Code", "IBAN", "Credit Card Number", "Credit Card Type", "Company Size", "Business Type", "Office Location", "Manager Name"].includes(type)) category = "Company / Business";
    else if (["Product Name", "Product Category", "Price", "Discount %", "Quantity", "SKU", "Barcode", "Color", "Material", "Size", "Warranty Period", "Supplier"].includes(type)) category = "Product / Commerce";
    else if (["Life Insurance Type", "Life Insurance Premium", "Health Insurance Type", "Health Insurance Coverage", "Car Insurance Type", "Car Insurance Premium", "Home Insurance Type", "Home Insurance Coverage"].includes(type)) category = "Insurance";
    else if (["Date", "Time", "DateTime", "Month", "Year", "Weekday", "Timestamp (ms)"].includes(type)) category = "Dates & Time";
    else if (["Sentence", "Paragraph", "Word", "Hashtag", "Emoji", "Tagline", "Quote", "Language"].includes(type)) category = "Text / Content";
    else if (["Bank Name", "SWIFT Code", "Account Balance", "Tax ID", "VAT Number", "Salary", "Bitcoin Address", "Ethereum Address", "Stock Symbol", "Credit Score"].includes(type)) category = "Finance";
    else if (["University", "Degree", "Course Name", "Grade", "Field of Study", "Enrollment Year", "Graduation Year"].includes(type)) category = "Education";
    else if (["Programming Language", "Framework", "Database", "File Extension", "Version", "Device Type", "UUID Token", "OS Version", "API Endpoint"].includes(type)) category = "Technology";

    return { name: type, category };
});
