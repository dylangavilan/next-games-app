// services/apiService.ts

import axios from "axios";

const API_URL = '/api/igdb'; // Adjust this to your actual API route path

export async function fetchGames() {
    return await axios.get('/api/igbd').then(response => console.log(response.data))
}
