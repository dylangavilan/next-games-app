import { getAccessToken } from "@/app/actions";

const gameUrl = process.env.NEXT_IGBD_API_URL as string;

const postById = async (id: string): Promise<GameDetail> => {
    const client_id = process.env.CLIENT_ID as string
    const accessToken = await getAccessToken();
    const postOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Client-ID': client_id,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: `fields name, category, rating, summary, genres.name, similar_games.name, url, similar_games.cover.image_id, first_release_date,
      platforms.name, cover.*, involved_companies.company.name, screenshots.image_id; where id = ${id};`,
    };

    try {
      const response = await fetch(gameUrl, postOptions);
      const data = await response.json();
      return data[0] as GameDetail;

    } catch (error) {
      console.error(error);
      throw error;
    }
}

const api = {
    gameDetail: {
        get: postById
    }
}
export { api }