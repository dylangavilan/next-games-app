import type { Metadata, ResolvingMetadata } from "next";
import { api } from "@/services/api";
import { getCover } from "@/lib/utils";
import GameDetail from "@/components/detail/game";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const params = await props.params
    const id = params.id
    const data: GameDetail  = await api.gameDetail.get(id);
    const previousImages = (await parent).openGraph?.images || [];
    const cover = data.cover ? getCover('cover_small', data.cover.image_id) : null
    const icon = data.cover ? getCover('thumb', data.cover.image_id) : null

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

export default async function Page({ params }: Props) {
  const { id } = await params
  const game = await api.gameDetail.get(id);
  
  return (
    <Suspense fallback={<Loader />}>
        <GameDetail game={game} />
    </Suspense>
  );
}
