import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../axiosClient'; 

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('search');

  // Verificación de parámetros
  if (!query) {
    
    return NextResponse.json({ status: 400, message: 'Por favor, añade un parámetro de búsqueda' });
  }

  try {
    const igdbResponse = await axiosInstance.post(
      'https://api.igdb.com/v4/games',
      `fields name, cover.image_id; where rating != null; where first_release_date != null; search "${query}";`    
    );

    // Verifica si hay resultados antes de responder
    if (!igdbResponse.data || igdbResponse.data.length === 0) {
      return NextResponse.json({ status: 200, data: [] });
    }

    return NextResponse.json({ data: igdbResponse.data , status: 200});
  } catch (error: any) {
    console.error('Error al obtener datos de IGDB:', error);

    // Manejo detallado del error
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Ocurrió un error inesperado';

    return NextResponse.json({ error: message }, { status });
  }
}
