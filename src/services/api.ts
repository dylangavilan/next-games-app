// services/apiService.ts

import axios from "axios";
import { cache } from "react";

const API_URL = '/api/igdb'; // Ajusta esta ruta si es necesario

export async function searchGames(input: string): Promise<Game[]> {
    try {
        const response = await axios.get('/api/igbd?search=' + encodeURIComponent(input));
        if (response.data.status === 200) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Error en la respuesta de la API');
        }
    } catch (err: any) {
        console.error('Error fetching games:', err);
        const errorMessage = err.response?.data?.error || 'Error inesperado';
        throw new Error(errorMessage);
    }
}

export const getGameByID = cache(async (id: string) => {
    console.log(id);
    // VISIBLE IN TERMINAL
    console.log("GetUserByID HIT (cached) : ", new Date().toLocaleTimeString());
    const response =  await axios.get(`http://localhost:3000/api/igbd/${id}`)
    return response.data.data;

})

// export async function getGameByID(id: string): Promise<GameDetail> {
//     const response =  await axios.get(`/api/igbd/${id}`)
//     return response.data.data;
// }