import useSWR from 'swr';
import { getTokenPrices, getTokenHistory } from '../lib/api/coingecko';

export function useTokenPrices() {
  const { data, error, isLoading, mutate } = useSWR(
    'token-prices',
    () => getTokenPrices(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    prices: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useTokenHistory(tokenId: string, days: number = 7) {
  const { data, error, isLoading } = useSWR(
    ['token-history', tokenId, days],
    () => getTokenHistory(tokenId, days),
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    history: data || { prices: [], market_caps: [], total_volumes: [] },
    isLoading,
    error,
  };
}