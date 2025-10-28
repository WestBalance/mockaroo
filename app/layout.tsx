// src/app/layout.tsx
import './styles/globals.css';
import React from 'react';

export const metadata = {
    title: 'My Mockaroo Clone',
    description: 'Generate fake data schemas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-slate-50 text-slate-900">
                <header className="w-full bg-white py-4 shadow-sm">
                    <div className="mx-auto max-w-4xl px-4">
                        <h1 className="text-xl font-semibold">My Mockaroo Clone</h1>
                    </div>
                </header>
                <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
            </body>
        </html>
    );
}
