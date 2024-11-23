import React from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, PieChart, Activity, DollarSign, Coins } from 'lucide-react';
import { useAuthStore } from '../lib/store/authStore';
import TokenList from '../components/TokenList';
import TransactionList from '../components/wallet/TransactionList';
import WalletBalance from '../components/wallet/WalletBalance';

export default function Wallet() {
  const { isConnected, setModalOpen } = useAuthStore();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to view your portfolio and transactions
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center mx-auto"
          >
            <WalletIcon className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient mb-4">
            Smart Wallet Dashboard
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your gateway to DeFi with built-in security features and real-time analytics.
          </p>
        </div>

        {/* ETH Balance */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative p-8 bg-black rounded-lg border border-purple-900/50">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <WalletIcon className="w-5 h-5 mr-2 text-purple-400" />
              ETH Balance
            </h3>
            <WalletBalance />
          </div>
        </div>

        {/* Token List */}
        <div className="mb-8">
          <TokenList />
        </div>

        {/* Recent Transactions */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative p-8 bg-black rounded-lg border border-purple-900/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-400" />
              Recent Transactions
            </h3>
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}