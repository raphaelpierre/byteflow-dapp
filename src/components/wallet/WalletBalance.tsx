import React from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { formatEther } from 'ethers';

export default function WalletBalance() {
  const { isConnected, address, provider } = useAuthStore();
  const [balance, setBalance] = React.useState<string>('0');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchBalance() {
      if (!isConnected || !address || !provider) return;

      setLoading(true);
      try {
        const balance = await provider.getBalance(address);
        setBalance(formatEther(balance));
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
    const interval = setInterval(fetchBalance, 15000); // Refresh every 15 seconds

    return () => clearInterval(interval);
  }, [isConnected, address, provider]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-purple-500/10 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div className="text-2xl font-bold text-white">
      {parseFloat(balance).toFixed(4)} ETH
    </div>
  );
}