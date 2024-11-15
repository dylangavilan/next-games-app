import axios from 'axios';

let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

const axiosInstance = axios.create();

const secret: string | undefined = process.env.SECRET_ID
const client_id: string | undefined = process.env.CLIENT_ID


async function fetchAccessToken() {
  if(!secret || !client_id) return;
  const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', 
    new URLSearchParams({
    client_id: client_id,
    client_secret: secret,
    grant_type: 'client_credentials'
  }));

  accessToken = tokenResponse.data.access_token; 
  tokenExpiresAt = Date.now() + (tokenResponse.data.expires_in * 1000); 
}

axiosInstance.interceptors.request.use(async (config) => {
  if (!accessToken || Date.now() >= (tokenExpiresAt || 0)) {
    await fetchAccessToken();
  }

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  config.headers['Client-ID'] = client_id;
  config.headers['Content-Type'] = 'text/plain'
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
