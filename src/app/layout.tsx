import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Searchbar from "@/components/searchbar";
import Header from "@/components/header";
import ToastComponent from "@/components/toast";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Gaming Haven Z",
  description: "The place where you will can choose your games",
  openGraph: {
    title: "Gaming Haven Z",
    description: "All you want in one place, search what will be your next adventure",
    siteName: "Gaming Haven Z"
  },
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
        <ToastComponent />
      </body>
    </html>
  );
}
