import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@styles/globals.module.css";
import  QueryClientProvider  from "@utils/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DnD Battle Sim",
  description: "DnD battle simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider>
          <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
