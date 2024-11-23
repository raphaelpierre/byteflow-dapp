import { create } from 'zustand';
import { getTokenPrices, CoinPrice } from '../api/coingecko';

interface PriceState {
  prices: CoinPrice[];
  loading: boolean;
  error: string | null;
  fetchPrices: () => Promise<void>;
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: [],
  loading: false,
  error: null,
  fetchPrices: async () => {
    set({ loading: true, error: null });
    try {
      const prices = await getTokenPrices();
      set({ prices, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch prices', 
        loading: false 
      });
    }
  },
}));