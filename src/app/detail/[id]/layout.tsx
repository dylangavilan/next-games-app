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

    return {
      title: data.name,
      openGraph: {
        images: [getCover('cover_small', data.cover.image_id), ...previousImages],
        title: data.name,
        description: data.summary
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
