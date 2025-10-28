import FieldTable from "@/app/components/FieldTable";

export default function Home() {
    return (
        <main className="items-center bg-gray-950 p-10 text-white">
            <h1 className="mb-5 justify-center text-center text-3xl font-bold">Mock your data!</h1>
            <FieldTable />
            {/* Тут можно добавить Generate AI Button */}
        </main>
    );
}
