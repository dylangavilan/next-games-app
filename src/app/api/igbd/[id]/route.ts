import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/app/api/axiosClient';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    return NextResponse.json({ status: 400, message: 'Por favor, añade un parámetro de ID' });
  }
  try {
    const igdbResponse = await axiosInstance.post(
      'https://api.igdb.com/v4/games',
      `fields name, category, rating, summary, genres.name, similar_games.name, similar_games.cover.image_id, first_release_date,
      platforms.name, cover.image_id, franchise, screenshots.image_id; where id = ${id};`
    );

    if (!igdbResponse.data || igdbResponse.data.length === 0) {
      return NextResponse.json({ status: 404, message: 'No se encontraron resultados' });
    }
    return NextResponse.json({ data: igdbResponse.data[0], status: 200 });
  } catch {
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
