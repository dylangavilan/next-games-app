import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/app/api/axiosClient';

export async function GET(req: NextRequest) {
  // Extraer `id` de la URL
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ status: 400, message: 'Por favor, añade un parámetro de ID' });
  }

  try {
    const igdbResponse = await axiosInstance.post(
      'https://api.igdb.com/v4/games',
      `fields name, category, platforms, cover.image_id, screenshots.image_id; where id = ${id};`
    );

    if (!igdbResponse.data || igdbResponse.data.length === 0) {
      return NextResponse.json({ status: 404, message: 'No se encontraron resultados' });
    }

    return NextResponse.json({ data: igdbResponse.data[0], status: 200 });
  } catch (error: any) {
    console.error('Error al obtener datos de IGDB:', error);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Ocurrió un error inesperado';

    return NextResponse.json({ error: message }, { status });
  }
}
