import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventBook - Book Your Next Event",
  description: "Find and book amazing events near you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
