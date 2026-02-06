import type { Metadata } from "next";
import "@styles/globals.module.css";
import  QueryClientProvider  from "@utils/react-query-provider";
import Navigation from "@components/navigation/navigation";


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
          <body >
            <Navigation />
            {children}
          </body>
      </QueryClientProvider>
    </html>
  );
}
