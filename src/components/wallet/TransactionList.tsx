import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import { getTransactions, Transaction } from '../../lib/web3/transactions';
import { formatEther } from 'ethers';

export default function TransactionList() {
  const { isConnected, address, provider } = useAuthStore();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchTransactions() {
      if (!isConnected || !address || !provider) return;

      setLoading(true);
      setError(null);

      try {
        const txs = await getTransactions(address, provider);
        setTransactions(txs);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 15000); // Refresh every 15 seconds

    return () => clearInterval(interval);
  }, [isConnected, address, provider]);

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
      {transactions.map((tx) => (
        <div
          key={tx.hash}
          className="p-4 bg-gray-900/50 rounded-lg hover:bg-purple-500/10 transition-colors"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {tx.type === 'sent' ? (
                <ArrowUpRight className="w-4 h-4 text-red-400 mr-2" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-green-400 mr-2" />
              )}
              <span className={tx.type === 'sent' ? 'text-red-400' : 'text-green-400'}>
                {tx.type === 'sent' ? 'Sent' : 'Received'}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {new Date(tx.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <div className="text-gray-400">
                {tx.type === 'sent' ? 'To:' : 'From:'} 
                <span className="text-purple-400 ml-2">
                  {tx.type === 'sent' ? tx.to : tx.from}
                </span>
              </div>
            </div>
            <div className="text-white font-semibold">
              {formatEther(tx.value)} ETH
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <a
              href={`https://etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              View on Etherscan
            </a>
          </div>
        </div>
      ))}
      
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No transactions found
        </div>
      )}
    </div>
  );
}