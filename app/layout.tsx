import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Meeti - Next",
  description: "Proyecto Meeti Next.js con DrizzeORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full bg-white"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
