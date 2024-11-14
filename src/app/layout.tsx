import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Searchbar from "@/components/searchbar";
import Header from "@/components/header";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Gaming Having Z",
  description: "The place where you will can choose your games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} `}>
      <body className="p-4"
      >
        <Header>
          <Searchbar/>
        </Header>
        <main className='lg:max-w-screen-md lg:mx-auto'>
        {children}
        </main>
      </body>
    </html>
  );
}
