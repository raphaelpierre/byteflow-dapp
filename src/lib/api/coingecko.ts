import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

export async function getTokenPrices(tokens: string[] = ['bitcoin', 'ethereum', 'solana', 'tether']): Promise<CoinPrice[]> {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: tokens.join(','),
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw error;
  }
}

export async function getTokenHistory(tokenId: string, days: number = 7): Promise<{
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}> {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${tokenId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token history:', error);
    throw error;
  }
}