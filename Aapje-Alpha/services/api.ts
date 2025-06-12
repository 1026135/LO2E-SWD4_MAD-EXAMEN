// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://jouw-api-url.nl/api'; // vervang met jouw echte API URL

export const logAction = async (userId: string, command: number) => {
  try {
    return await axios.post(`${API_BASE_URL}/actions`, {
      userId,
      command,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Fout bij loggen van actie:', error);
    throw error;
  }
};


