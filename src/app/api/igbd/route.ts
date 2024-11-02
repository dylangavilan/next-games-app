import { NextResponse } from 'next/server';
import axiosInstance from '../axiosClient'; // Adjust path if necessary

export async function GET() {
  try {
    const igdbResponse = await axiosInstance.post('https://api.igdb.com/v4/games',     
      "fields name,category,platforms;" ,
  );

    return NextResponse.json({ data: igdbResponse.data });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: error.response?.data || 'An error occurred' }, { status: error.response?.status || 500 });
  }
}
