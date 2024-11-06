// app/layout.tsx
import { Inter } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import axios from "axios";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Omit<Props, 'children'>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const id = (await params).id
    const { data } = await axios.get(`http://localhost:3000/api/igbd/${id}`);
    console.log(data.data)
    // Extender la metadata previa en lugar de reemplazarla
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: data.data.name,
      openGraph: {
        images: ['/some-specific-page-image.jpg', ...previousImages],
      },
    };
  } catch (err) {
    console.log(err);
    return {
      title: 'Hola',
    };
  }
}

export default function Layout({ children, params, searchParams }: Props) {
  return (
    <main className={inter.className}>
     {children}
    </main>
  );
}