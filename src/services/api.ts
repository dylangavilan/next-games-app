
import axios from "axios";
import { cache } from "react";
const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : process.env.VERCEL_API_URL;


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
    }
}


export const getGameByID = cache(async (id: string) => {
    if(!BASE_URL) {
        throw new Error('Not apiUrl')
    }
    const response = await axios.get(BASE_URL + `/igbd/${id}`);
    return response.data.data;
});