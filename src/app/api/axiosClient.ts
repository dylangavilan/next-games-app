import axios from 'axios';

// Declare types for the access token and its expiration
let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

const axiosInstance = axios.create();

async function fetchAccessToken() {
  const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', 
    new URLSearchParams({
    client_id: "62ux89s11tlzop2gw1xvd83llqursu",
    client_secret: "ud2ouweay1o3a8ehpto21p8pehrfl5",
    grant_type: 'client_credentials'
  }));

  accessToken = tokenResponse.data.access_token; // Type is string
  tokenExpiresAt = Date.now() + (tokenResponse.data.expires_in * 1000); // Convert to milliseconds
}

axiosInstance.interceptors.request.use(async (config) => {
  if (!accessToken || Date.now() >= (tokenExpiresAt || 0)) {
    await fetchAccessToken(); // Fetch a new access token if expired
  }

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  config.headers['Client-ID'] = "62ux89s11tlzop2gw1xvd83llqursu";
  config.headers['Content-Type'] = 'text/plain'
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
