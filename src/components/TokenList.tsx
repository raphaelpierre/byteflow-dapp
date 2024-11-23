import React from 'react';
import { useAuthStore } from '../lib/store/authStore';
import { COMMON_TOKENS, getTokenDetails, TokenDetails } from '../lib/web3/tokens';
import { Coins } from 'lucide-react';

export default function TokenList() {
  const { isConnected, address, provider } = useAuthStore();
  const [tokens, setTokens] = React.useState<TokenDetails[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchTokens() {
      if (!isConnected || !address || !provider) return;

      setLoading(true);
      setError(null);

      try {
        const tokenPromises = Object.entries(COMMON_TOKENS).map(([symbol, address]) =>
          getTokenDetails(address, address, provider)
            .catch(error => {
              console.error(`Error fetching ${symbol}:`, error);
              return null;
            })
        );

        const tokenDetails = (await Promise.all(tokenPromises)).filter((token): token is TokenDetails => token !== null);
        setTokens(tokenDetails);
      } catch (err) {
        setError('Failed to fetch token details. Please try again.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, address, provider]);

  if (!isConnected) {
    return null;
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-purple-500/10 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center">
        <Coins className="w-5 h-5 mr-2 text-purple-400" />
        Your ERC20 Tokens
      </h3>
      
      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token.address}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-4 bg-black rounded-lg border border-purple-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">{token.name}</h4>
                  <p className="text-sm text-gray-400">{token.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">
                    {parseFloat(token.balance).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </p>
                  <p className="text-xs text-gray-400 truncate" title={token.address}>
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {tokens.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No tokens found
          </div>
        )}
      </div>
    </div>
  );
}