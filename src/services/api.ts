// services/apiService.ts

import axios from "axios";

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

// export async function getGameByID(id: string) {
//     console.log('id',`/api/igbd/${id}`)
//     const response = 
//     // return response.data.data;
// }