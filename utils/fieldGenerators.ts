/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/fieldGenerators.ts
// Расширенный генератор данных без faker.js
// >100 типов, с десятками возможных значений на каждый

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

function randomDate(start = new Date(2000, 0, 1), end = new Date(2025, 11, 31)): string {
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

// ---------- Наборы данных ----------

const firstNames = [
    "Liam", "Emma", "Noah", "Olivia", "Ava", "Isabella", "Sophia", "Mason", "Mihail", "Ethan", "Lucas",
    "Alexander", "Charlotte", "Amelia", "Harper", "Daniel", "Jacob", "Logan", "Elijah", "Emily", "Grace",
    "Ella", "Madison", "Scarlett", "Victoria", "Henry", "Samuel", "Owen", "Sebastian", "Jack", "Leo", "Chloe", "Luna", "Zoe"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Lopez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "White", "Harris", "Clark", "Lewis",
    "Young", "King", "Scott", "Green", "Baker", "Hill", "Adams", "Nelson", "Hall", "Allen", "Wright"
];

const domains = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "mail.ru", "icloud.com", "protonmail.com", "example.com"
];

const genders = ["Male", "Female", "Non-binary", "Other"];

const countries = [
    "USA", "Canada", "Mexico", "Brazil", "UK", "Germany", "France", "Italy", "Spain", "Moldova", "Romania",
    "Ukraine", "Russia", "China", "Japan", "South Korea", "India", "Australia", "South Africa", "Egypt"
];

const cities = [
    "New York", "Los Angeles", "Chicago", "Toronto", "Vancouver", "London", "Paris", "Berlin", "Madrid",
    "Rome", "Chisinau", "Bucharest", "Kyiv", "Warsaw", "Tokyo", "Seoul", "Sydney", "Melbourne", "Cairo", "Delhi"
];

const jobTitles = [
    "Software Engineer", "Data Analyst", "UX Designer", "Product Manager", "DevOps Engineer", "QA Tester",
    "Marketing Specialist", "Sales Manager", "Teacher", "Doctor", "Nurse", "Lawyer", "Electrician", "Plumber",
    "Graphic Designer", "Architect", "Mechanic", "Chef", "Photographer", "Translator", "Scientist", "Psychologist",
    "Dentist", "Pilot", "Accountant", "Engineer", "Consultant", "HR Manager", "Copywriter", "Entrepreneur"
];

const companies = [
    "Google", "Apple", "Microsoft", "Amazon", "Facebook", "Netflix", "Tesla", "SpaceX", "Adobe", "Intel",
    "Oracle", "IBM", "Samsung", "Sony", "HP", "Dell", "Asus", "Nvidia", "Coca-Cola", "Pepsi", "Nike", "Adidas", "Toyota", "BMW", "Mercedes", "Volkswagen"
];

const streets = [
    "Main St", "High St", "Broadway", "Maple Ave", "Park Ave", "Oak St", "Pine St", "Cedar Rd", "Elm St", "Birch Ln",
    "Lakeview Dr", "Sunset Blvd", "Hilltop Rd", "Riverside Ave", "King St", "Queen St", "Church Rd", "Station Rd"
];

const phonePrefixes = ["+1", "+44", "+49", "+33", "+7", "+40", "+373", "+81", "+82", "+61"];

const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Cyan", "Teal", "White", "Black", "Gray", "Brown"];
const animals = ["Cat", "Dog", "Elephant", "Lion", "Tiger", "Wolf", "Fox", "Horse", "Rabbit", "Bear", "Monkey", "Deer"];
const carBrands = ["BMW", "Audi", "Mercedes", "Toyota", "Ford", "Tesla", "Volkswagen", "Volvo", "Peugeot", "Renault", "Hyundai", "Kia"];
const fruits = ["Apple", "Banana", "Cherry", "Orange", "Grapes", "Pear", "Lemon", "Mango", "Peach", "Plum", "Strawberry", "Kiwi"];
const drinks = ["Water", "Coffee", "Tea", "Juice", "Milk", "Wine", "Beer", "Soda", "Smoothie", "Energy Drink"];
const hobbies = ["Reading", "Gaming", "Cooking", "Traveling", "Music", "Hiking", "Photography", "Painting", "Sports", "Writing"];
const universities = ["Harvard", "MIT", "Stanford", "Oxford", "Cambridge", "Yale", "Tokyo University", "Moscow State University", "Bucharest University", "Technical University of Moldova"];

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
    "Email Address": () => `${randomItem(firstNames).toLowerCase()}.${randomItem(lastNames).toLowerCase()}@${randomItem(domains)}`,
    "Username": () => randomString(8),
    "Password": () => randomString(12),
    "Avatar URL": () => `https://i.pravatar.cc/150?img=${randomInt(1, 70)}`,
    "Profile Bio": () => randomItem(["Hello world!", "I love coding.", "Mockaroo clone user."]),

    // --- Internet ---
    "Domain": () => randomItem(domains),
    "URL": () => `https://www.${randomString(6).toLowerCase()}.com`,
    "IP Address v4": () => randomIP(),
    "IP Address v6": () => Array.from({ length: 8 }, () => randomInt(0, 65535).toString(16)).join(":"),
    "MAC Address": () => Array.from({ length: 6 }, () => randomInt(0, 255).toString(16).padStart(2, "0")).join(":"),
    "User Agent": () => randomItem(["Chrome", "Firefox", "Edge", "Safari"]),
    "Browser": () => randomItem(["Chrome", "Firefox", "Edge", "Safari"]),
    "Operating System": () => randomItem(["Windows", "macOS", "Linux", "Android", "iOS"]),

    // --- Location ---
    "Country": () => randomItem(countries),
    "Country Code": () => randomItem(["US", "CA", "GB", "DE", "FR", "IT", "ES", "MD", "RO", "UA"]),
    "City": () => randomItem(cities),
    "Street Address": () => `${randomInt(1, 200)} ${randomItem(streets)}`,
    "Zip Code": () => `${randomInt(10000, 99999)}`,
    "Latitude": () => randomFloat(-90, 90, 5),
    "Longitude": () => randomFloat(-180, 180, 5),
    "Time Zone": () => randomItem(["UTC", "GMT", "CET", "EST", "PST"]),

    // --- Company / Business ---
    "Company Name": () => randomItem(companies),
    "Job Title": () => randomItem(jobTitles),
    "Department": () => randomItem(["HR", "Engineering", "Marketing", "Sales", "Finance"]),
    "Industry": () => randomItem(["Tech", "Finance", "Healthcare", "Education", "Retail"]),
    "Currency Code": () => randomItem(["USD", "EUR", "GBP", "MDL"]),
    "IBAN": () => `MD${randomInt(1000000000000000, 9999999999999999)}`,
    "Credit Card Number": () => `${randomInt(4000, 4999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
    "Credit Card Type": () => randomItem(["Visa", "MasterCard", "Amex"]),

    // --- Product / Commerce ---
    "Product Name": () => randomItem(["Laptop", "Phone", "Book", "Shoes", "Watch"]),
    "Product Category": () => randomItem(["Electronics", "Clothing", "Books", "Accessories"]),
    "Price": () => randomFloat(5, 2000),
    "Discount %": () => randomInt(0, 50),
    "Quantity": () => randomInt(1, 100),
    "SKU": () => randomString(8).toUpperCase(),
    "Barcode": () => randomInt(100000000000, 999999999999),
    "Color": () => randomItem(colors),
    "Material": () => randomItem(["Cotton", "Plastic", "Metal", "Wood", "Leather"]),
    "Size": () => randomItem(["S", "M", "L", "XL", "XXL"]),

    // --- Dates & Time ---
    "Date": () => randomDate(),
    "Time": () => `${randomInt(0, 23)}:${randomInt(0, 59).toString().padStart(2, "0")}:${randomInt(0, 59).toString().padStart(2, "0")}`,
    "DateTime": () => new Date().toISOString(),
    "Month": () => randomInt(1, 12),
    "Year": () => randomInt(1970, 2025),
    "Weekday": () => randomItem(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    "Timestamp (ms)": () => Date.now(),

    // --- Text / Content ---
    "Sentence": () => "Lorem ipsum dolor sit amet.",
    "Paragraph": () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Word": () => randomString(5),
    "Hashtag": () => `#${randomString(5)}`,
    "Emoji": () => randomItem(["😀", "😂", "😎", "👍", "❤️"]),
    "Tagline": () => randomItem(["Best product ever", "Quality guaranteed", "Your choice!"]),
    "Quote": () => randomItem(["To be or not to be", "I think, therefore I am", "Knowledge is power"]),
    "Language": () => randomItem(["English", "French", "German", "Spanish", "Romanian", "Russian", "Japanese", "Korean", "Italian"]),

    // --- Finance ---
    "Bank Name": () => randomItem(["BCR", "MoldovaBank", "Raiffeisen", "ING"]),
    "SWIFT Code": () => randomItem(["BCRUMD33", "MOLDMD2X", "INGMMD33"]),
    "Account Balance": () => randomFloat(0, 100000, 2),
    "Tax ID": () => `MD${randomInt(1000000, 9999999)}`,
    "VAT Number": () => `MD${randomInt(10000000, 99999999)}`,
    "Salary": () => randomInt(1000, 10000),
    "Bitcoin Address": () => `bc1${randomString(24)}`,
    "Ethereum Address": () => `0x${randomString(40)}`,

    // --- Education ---
    "University": () => randomItem(universities),
    "Degree": () => randomItem(["BSc", "MSc", "PhD"]),
    "Course Name": () => `${randomItem(["Math", "Physics", "CS", "Art", "Design", "Biology", "Chemistry"])} ${randomInt(101, 499)}`,
    "Grade": () => randomItem(["A", "B", "C", "D", "E", "F"]),

    // --- Technology ---
    "Programming Language": () => randomItem(["JavaScript", "Python", "TypeScript", "C#", "Java", "Go"]),
    "Framework": () => randomItem(["React", "Next.js", "Angular", "Vue", "Django"]),
    "Database": () => randomItem(["PostgreSQL", "MySQL", "MongoDB", "SQLite"]),
    "File Extension": () => randomItem([".txt", ".csv", ".json", ".xml"]),
    "Version": () => `${randomInt(0, 10)}.${randomInt(0, 10)}.${randomInt(0, 10)}`,
    "Device Type": () => randomItem(["Desktop", "Laptop", "Tablet", "Phone"]),
    "UUID Token": () => randomUUID(),

    // --- Misc ---
    "Boolean": () => randomBool(),
    "Random Number": () => randomInt(0, 1000),
    "Random Float": () => randomFloat(0, 1000),
    "Custom String": () => randomString(12),
    "Null Value": () => null,
    "Yes/No": () => randomItem(["Yes", "No"]),
    "True/False": () => randomItem(["True", "False"]),
    "Binary Flag": () => randomInt(0, 1),
    "Animal": () => randomItem(animals),
    "Fruit": () => randomItem(fruits),
    "Vehicle": () => randomItem(carBrands),
    "Planet": () => randomItem(["Earth", "Mars", "Venus", "Jupiter", "Saturn"]),
    "Continent": () => randomItem(["Europe", "Asia", "America", "Africa", "Australia"]),
    "Currency Symbol": () => randomItem(["$", "€", "£", "₽", "MDL"]),
    "Weather Condition": () => randomItem(["Sunny", "Cloudy", "Rainy", "Snowy", "Windy", "Stormy"]),
    "Temperature °C": () => randomFloat(-30, 45, 1),
    "Temperature °F": () => randomFloat(-22, 113, 1),
    "Blood Type": () => randomItem(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
};