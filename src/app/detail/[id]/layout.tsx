// app/layout.tsx
import { Inter } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import axios from "axios";
import { PropsWithChildren } from "react";
import { getGameByID } from "@/services/api";
import { getCover } from "@/lib/utils";

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
    const data: GameDetail  = await getGameByID(id);
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: data.name,
      openGraph: {
        images: [getCover('cover_small', data.cover.image_id), ...previousImages],
        title: data.name,
        description: data.summary
      },
    };
  } catch (err) {
    return {
      title: 'Gaming Haven Z',
    };
  }
}

export default function Layout({ children }: Props) {
  return (
    <main className={inter.className}>
     {children}
    </main>
  );
}
