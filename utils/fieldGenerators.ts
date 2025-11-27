/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------- Вспомогательные функции ----------
function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(decimals));
}

function randomString(length = 8): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

function randomDate(start = new Date(1940, 0, 1), end = new Date(2025, 11, 31)): string {
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return d.toISOString().split("T")[0];
}

function randomBool(): boolean {
    return Math.random() > 0.5;
}

function randomIP(): string {
    return Array.from({ length: 4 }, () => randomInt(0, 255)).join(".");
}

function randomUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// ---------- Расширенные наборы данных ----------
const firstNames = ["Liam", "Emma", "Noah", "Olivia", "Ava", "Isabella", "Sophia", "Mason", "Mihail", "Ethan", "Lucas", "Charlotte", "Amelia", "Harper", "Evelyn"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"];
const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "mail.ru", "icloud.com", "protonmail.com", "example.com"];
const genders = ["Male", "Female", "Non-binary", "Other"];
const countries = ["USA", "Canada", "Mexico", "Brazil", "UK", "Germany", "France", "Italy", "Spain", "Moldova", "Romania", "Ukraine", "Japan", "China", "India", "Australia"];
const cities = ["New York", "Los Angeles", "Chicago", "Toronto", "Vancouver", "London", "Paris", "Berlin", "Madrid", "Rome", "Bucharest", "Chisinau", "Kyiv", "Beijing", "Tokyo"];
const jobTitles = ["Software Engineer", "Data Analyst", "UX Designer", "Product Manager", "DevOps Engineer", "QA Tester", "System Administrator", "Business Analyst", "Marketing Manager"];
const companies = ["Google", "Apple", "Microsoft", "Amazon", "Facebook", "Tesla", "Intel", "Samsung", "IBM", "Oracle"];
const streets = ["Main St", "High St", "Broadway", "Maple Ave", "Park Ave", "Oak St", "Pine St", "Cedar Rd", "Elm St"];
const phonePrefixes = ["+1", "+44", "+49", "+33", "+7", "+40", "+373", "+91", "+81", "+86"];
const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White"];
const animals = ["Cat", "Dog", "Elephant", "Lion", "Tiger", "Horse", "Wolf", "Fox", "Bear", "Giraffe"];
const carBrands = ["BMW", "Audi", "Mercedes", "Toyota", "Ford", "Honda", "Tesla", "Chevrolet", "Volkswagen"];
const fruits = ["Apple", "Banana", "Cherry", "Orange", "Grapes", "Mango", "Pineapple", "Strawberry", "Blueberry"];
const universities = ["Harvard", "MIT", "Stanford", "Oxford", "Cambridge", "Yale", "Princeton", "Columbia", "UCLA"];
const hobbies = ["Reading", "Gaming", "Cooking", "Traveling", "Music", "Hiking", "Photography", "Swimming", "Cycling", "Writing"];
const skills = ["Programming", "Design", "Marketing", "Management", "Writing", "Analytics", "Leadership", "Communication"];
const food = ["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Steak", "Tacos", "Sandwich", "Soup"];
const drinks = ["Water", "Coffee", "Tea", "Juice", "Milk", "Soda", "Beer", "Wine"];

// ---------- Генераторы ----------
export const fieldGenerators: Record<string, (rowIndex?: number) => any> = {
    // --- System ---
    "Row Number": (i = 0) => i + 1,
    "UUID": () => randomUUID(),
    "Increment ID": (i = 0) => i + 1,

    // --- Personal ---
    "First Name": () => randomItem(firstNames),
    "Last Name": () => randomItem(lastNames),
    "Full Name": () => `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    "Gender": () => randomItem(genders),
    "Age": () => randomInt(18, 80),
    "Date of Birth": () => randomDate(new Date(1940, 0, 1), new Date(2007, 11, 31)),
    "Phone Number": () => `${randomItem(phonePrefixes)} ${randomInt(100000000, 999999999)}`,
    "Email Address": () => `${randomItem(firstNames).toLowerCase()}.${randomItem(lastNames).toLowerCase()}${randomInt(1, 99)}@${randomItem(domains)}`,
    "Username": () => randomString(8),
    "Password": () => randomString(12),
    "Avatar URL": () => `https://i.pravatar.cc/150?img=${randomInt(1, 70)}`,
    "Profile Bio": () => randomItem(["Hello world!", "I love coding.", "Mockaroo clone user.", "Just another bio.", "Living life!"]),
    "Nationality": () => randomItem(countries),
    "Marital Status": () => randomItem(["Single", "Married", "Divorced", "Widowed"]),
    "Religion": () => randomItem(["Christianity", "Islam", "Judaism", "Buddhism", "Hinduism", "None"]),
    "Language Spoken": () => randomItem(["English", "French", "Spanish", "German", "Romanian", "Russian", "Japanese", "Mandarin"]),

    // --- Internet ---
    "Domain": () => randomItem(domains),
    "URL": () => `https://www.${randomString(6).toLowerCase()}.com`,
    "IP Address v4": () => randomIP(),
    "IP Address v6": () => Array.from({ length: 8 }, () => randomInt(0, 65535).toString(16)).join(":"),
    "MAC Address": () => Array.from({ length: 6 }, () => randomInt(0, 255).toString(16).padStart(2, "0")).join(":"),
    "User Agent": () => randomItem(["Chrome", "Firefox", "Edge", "Safari"]),
    "Browser": () => randomItem(["Chrome", "Firefox", "Edge", "Safari"]),
    "Operating System": () => randomItem(["Windows", "macOS", "Linux", "Android", "iOS"]),
    "Email Provider": () => randomItem(["Gmail", "Yahoo", "Outlook", "iCloud", "ProtonMail"]),

    // --- Location ---
    "Country": () => randomItem(countries),
    "Country Code": () => randomItem(["US", "CA", "GB", "DE", "FR", "IT", "ES", "MD", "RO", "UA", "JP", "CN", "IN", "AU"]),
    "City": () => randomItem(cities),
    "Street Address": () => `${randomInt(1, 500)} ${randomItem(streets)}`,
    "Zip Code": () => `${randomInt(10000, 99999)}`,
    "Latitude": () => randomFloat(-90, 90, 5),
    "Longitude": () => randomFloat(-180, 180, 5),
    "Time Zone": () => randomItem(["UTC", "GMT", "CET", "EST", "PST"]),
    "State / Province": () => randomItem(["California", "Texas", "New York", "Ontario", "Quebec", "Bavaria", "Île-de-France", "Lazio"]),
    "Region": () => randomItem(["North", "South", "East", "West", "Central"]),

    // --- Company / Business ---
    "Company Name": () => randomItem(companies),
    "Job Title": () => randomItem(jobTitles),
    "Department": () => randomItem(["HR", "Engineering", "Marketing", "Sales", "Finance", "Support"]),
    "Industry": () => randomItem(["Tech", "Finance", "Healthcare", "Education", "Retail", "Energy"]),
    "Currency Code": () => randomItem(["USD", "EUR", "GBP", "MDL", "JPY"]),
    "IBAN": () => `MD${randomInt(1000000000000000, 9999999999999999)}`,
    "Credit Card Number": () => `${randomInt(4000, 4999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
    "Credit Card Type": () => randomItem(["Visa", "MasterCard", "Amex"]),
    "Company Size": () => randomItem(["Small", "Medium", "Large", "Enterprise"]),
    "Business Type": () => randomItem(["Private", "Public", "Startup", "NGO"]),
    "Office Location": () => randomItem(cities),
    "Manager Name": () => `${randomItem(firstNames)} ${randomItem(lastNames)}`,

    // --- Product / Commerce ---
    "Product Name": () => randomItem(["Laptop", "Phone", "Book", "Shoes", "Watch", "Backpack", "Headphones"]),
    "Product Category": () => randomItem(["Electronics", "Clothing", "Books", "Accessories", "Toys"]),
    "Price": () => randomFloat(5, 2000),
    "Discount %": () => randomInt(0, 50),
    "Quantity": () => randomInt(1, 100),
    "SKU": () => randomString(8).toUpperCase(),
    "Barcode": () => randomInt(100000000000, 999999999999),
    "Color": () => randomItem(colors),
    "Material": () => randomItem(["Cotton", "Plastic", "Metal", "Wood", "Leather"]),
    "Size": () => randomItem(["XS", "S", "M", "L", "XL", "XXL"]),
    "Warranty Period": () => `${randomInt(1, 36)} months`,
    "Supplier": () => randomItem(companies),

    // --- Insurance ---
    "Life Insurance Type": () => randomItem(["Term", "Whole", "Universal"]),
    "Life Insurance Premium": () => randomFloat(100, 1000),
    "Health Insurance Type": () => randomItem(["HMO", "PPO", "EPO"]),
    "Health Insurance Coverage": () => randomFloat(5000, 50000),
    "Car Insurance Type": () => randomItem(["Liability", "Comprehensive", "Collision"]),
    "Car Insurance Premium": () => randomFloat(200, 2000),
    "Home Insurance Type": () => randomItem(["Basic", "Premium", "Comprehensive"]),
    "Home Insurance Coverage": () => randomFloat(50000, 500000),

    // --- Dates & Time ---
    "Date": () => randomDate(),
    "Time": () => `${randomInt(0, 23)}:${randomInt(0, 59).toString().padStart(2, "0")}:${randomInt(0, 59).toString().padStart(2, "0")}`,
    "DateTime": () => new Date().toISOString(),
    "Month": () => randomInt(1, 12),
    "Year": () => randomInt(1970, 2025),
    "Weekday": () => randomItem(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    "Timestamp (ms)": () => Date.now(),

    // --- Text / Content ---
    "Sentence": () => randomItem([
        "Hello world!", "This is a test sentence.", "Sample text for mock data.",
        "The quick brown fox jumps over the lazy dog.", "Lorem ipsum dolor sit amet."
    ]),
    "Paragraph": () => randomItem([
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    ]),
    "Word": () => randomString(randomInt(3, 10)),
    "Hashtag": () => `#${randomString(randomInt(3, 8))}`,
    "Emoji": () => randomItem(["😀", "😂", "😎", "👍", "❤️", "🔥", "🎉", "🚀"]),
    "Tagline": () => randomItem(["Best product ever!", "Quality guaranteed!", "Your choice!", "Simply the best."]),
    "Quote": () => randomItem([
        "To be or not to be.", "Knowledge is power.", "I think, therefore I am.", "The only limit is your mind."
    ]),
    "Language": () => randomItem(["English", "French", "German", "Spanish", "Romanian", "Russian", "Japanese", "Mandarin"]),

    // --- Finance ---
    "Bank Name": () => randomItem(["BCR", "MoldovaBank", "Raiffeisen", "ING", "HSBC", "Deutsche Bank"]),
    "SWIFT Code": () => randomItem(["BCRUMD33", "MOLDMD2X", "INGMMD33", "HSBCUS33", "DEUTDEFF"]),
    "Account Balance": () => randomFloat(0, 100000, 2),
    "Tax ID": () => `MD${randomInt(1000000, 9999999)}`,
    "VAT Number": () => `MD${randomInt(10000000, 99999999)}`,
    "Salary": () => randomInt(1000, 10000),
    "Bitcoin Address": () => `bc1${randomString(24)}`,
    "Ethereum Address": () => `0x${randomString(40)}`,
    "Stock Symbol": () => randomItem(["AAPL", "GOOG", "MSFT", "TSLA", "AMZN"]),
    "Credit Score": () => randomInt(300, 850),

    // --- Education ---
    "University": () => randomItem(universities),
    "Degree": () => randomItem(["BSc", "MSc", "PhD"]),
    "Course Name": () => `${randomItem(["Math", "Physics", "CS", "Art", "History"])} ${randomInt(101, 499)}`,
    "Grade": () => randomItem(["A", "B", "C", "D", "E", "F"]),
    "Field of Study": () => randomItem(["Computer Science", "Physics", "Mathematics", "Economics", "Biology", "Chemistry", "History"]),
    "Enrollment Year": () => randomInt(2000, 2022),
    "Graduation Year": () => randomInt(2004, 2025),

    // --- Technology ---
    "Programming Language": () => randomItem(["JavaScript", "Python", "TypeScript", "C#", "Java", "Go", "Rust", "Kotlin"]),
    "Framework": () => randomItem(["React", "Next.js", "Angular", "Vue", "Django", "Spring"]),
    "Database": () => randomItem(["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"]),
    "File Extension": () => randomItem([".txt", ".csv", ".json", ".xml", ".yaml"]),
    "Version": () => `${randomInt(0, 10)}.${randomInt(0, 10)}.${randomInt(0, 10)}`,
    "Device Type": () => randomItem(["Desktop", "Laptop", "Tablet", "Phone"]),
    "UUID Token": () => randomUUID(),
    "OS Version": () => `${randomInt(1, 15)}.${randomInt(0, 9)}`,
    "API Endpoint": () => `/api/${randomString(6).toLowerCase()}`,

    // --- Misc ---
    "Boolean": () => randomBool(),
    "Random Number": () => randomInt(0, 10000),
    "Random Float": () => randomFloat(0, 10000),
    "Custom String": () => randomString(15),
    "Null Value": () => null,
    "Yes/No": () => randomItem(["Yes", "No"]),
    "True/False": () => randomItem(["True", "False"]),
    "Binary Flag": () => randomInt(0, 1),
    "Animal": () => randomItem(animals),
    "Fruit": () => randomItem(fruits),
    "Vehicle": () => randomItem(carBrands),
    "Planet": () => randomItem(["Earth", "Mars", "Venus", "Jupiter", "Saturn", "Mercury", "Neptune"]),
    "Continent": () => randomItem(["Europe", "Asia", "America", "Africa", "Australia", "Antarctica"]),
    "Currency Symbol": () => randomItem(["$", "€", "£", "₽", "MDL", "¥"]),
    "Weather Condition": () => randomItem(["Sunny", "Cloudy", "Rainy", "Snowy", "Windy", "Stormy"]),
    "Temperature °C": () => randomFloat(-30, 45, 1),
    "Temperature °F": () => randomFloat(-22, 113, 1),
    "Blood Type": () => randomItem(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    "Hobby": () => randomItem(hobbies),
    "Skill": () => randomItem(skills),
    "Favorite Color": () => randomItem(colors),
    "Favorite Food": () => randomItem(food),
    "Favorite Drink": () => randomItem(drinks),
};
