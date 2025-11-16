// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShoeMaker Admin",
  description: "Quản lý phòng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Layout container */}
        <StyledComponentsRegistry>
        <div className="min-h-screen flex bg-gray-50">
          {/* Sidebar*/}
          <aside className="w-64 border-r border-gray-200 bg-white">
            <Sidebar />
          </aside>

          {/* Main area: header + page content */}
          <div className="flex-1 flex flex-col">
            <header>
              <Header />
            </header>

            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
