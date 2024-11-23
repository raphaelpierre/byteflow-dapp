import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTokenPrices } from '../hooks/useTokenPrice';

export default function PriceDisplay() {
  const { prices, isLoading, error } = useTokenPrices();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-purple-500/10 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
        Failed to load prices. Please try again later.
      </div>
    );
  }

  if (!prices?.length) {
    return (
      <div className="p-4 bg-purple-500/10 border border-purple-900/20 rounded-lg text-purple-400">
        No price data available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {prices.map((token) => (
        <div
          key={token.id}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative p-4 bg-black rounded-lg border border-purple-900/50">
            <div className="flex items-center mb-2">
              <img
                src={token.image}
                alt={token.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-white font-semibold">{token.name}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              ${token.current_price.toLocaleString()}
            </div>
            <div className={`flex items-center text-sm ${
              token.price_change_percentage_24h >= 0 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              {token.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {token.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}