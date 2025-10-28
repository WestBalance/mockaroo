import "./globals.css";

import { ReactNode } from 'react';

export const metadata = {
  title: 'Mockaroo Clone',
  description: 'Generate fake data schemas',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans">
        <header className="bg-white py-4 shadow">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
            <h1 className="text-xl font-bold">Mocker</h1>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
