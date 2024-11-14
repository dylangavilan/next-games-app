// services/apiService.ts

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
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    const response = await axios.get(`${baseUrl}/api/igbd/${id}`);
    return response.data.data;
});