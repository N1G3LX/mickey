import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import { AuthContextProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mickey Token watch",
  description: "Mickey Token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider >

      <html lang="en">

        <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>{children}</body>
        <Toaster />
      </html>
    </AuthContextProvider>

  );
}
