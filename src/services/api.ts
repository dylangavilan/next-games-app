const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_BASE_API_URL;


import axios from "axios";
import { cache } from "react";

export async function searchGames(input: string): Promise<Game[]> {
    try {
        const response = await axios.get('/api/igbd?search=' + encodeURIComponent(input));
        if (response.data.status === 200) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Error en la respuesta de la API');
        }
    } catch (err) {
        console.error('Error fetching games:', err);
        throw new Error('Ocurrio un error')  
        // cache;
    }
}


export const getGameByID = cache(async (id: string) => {
    const baseUrl = API_URL;
    const response = await axios.get(`${baseUrl}/api/igbd/${id}`);
    return response.data.data;
});