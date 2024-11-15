import { Inter } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import { getGameByID } from "@/services/api";
import { getCover } from "@/lib/utils";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params
    const id = params.id
    const data: GameDetail  = await getGameByID(id);
    const previousImages = (await parent).openGraph?.images || [];
    const cover = getCover('cover_small', data.cover.image_id) ?? ''
    const icon = getCover('thumb', data.cover.image_id) ?? ''

    return {
      title: data.name,
      openGraph: {
        images: cover ? [cover, ...previousImages] : previousImages, 
        title: data.name,
        description: data.summary
      },
      icons: {
        icon: icon ?? '/favicon.ico',
      },
    };
  } catch {
    return {
      title: 'Gaming Haven Z',
    };
  }
}

export default function RootLayout({ children }: { children: ReactNode}) {
  return (
    <main className={inter.className}>
     {children}
    </main>
  );
}
