'use server'

const gameUrl = process.env.NEXT_IGBD_API_URL as string;

export async function searchGames(query: string): Promise<Game[]> {
    const client_id = process.env.CLIENT_ID as string
    const accessToken = await getAccessToken();
    const postOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Client-ID': client_id,
          'Authorization': `Bearer ${accessToken}`,
        },
        body: `fields name, cover.*; where rating != null; where first_release_date != null; search "${query}";`,
    };
    try {
        const response = await fetch(gameUrl, postOptions);
        const json: Game[] = await response.json();
        return json
    } catch (err) {
        console.error('Error fetching games:', err);
        throw new Error('Ocurrio un error')  
    }
}


export async function getAccessToken() {
    const secret = process.env.SECRET_ID as string
    const client_id = process.env.CLIENT_ID as string
    const postOptions: RequestInit = {
        method: 'POST',
        body: new URLSearchParams({
            client_id: client_id,
            client_secret: secret,
            grant_type: 'client_credentials'
        }),
    };
    const twitchApi = process.env.NEXT_TWITCH_API_URL as string;

    const response = await fetch(twitchApi, postOptions);
    const tokenResponse = await response.json();
    return tokenResponse.access_token;
  }

