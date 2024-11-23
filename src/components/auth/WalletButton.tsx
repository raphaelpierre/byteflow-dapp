import React from 'react';
import { Wallet } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';

export default function WalletButton() {
  const { isConnected, address, disconnect, setModalOpen } = useAuthStore();

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <span className="hidden md:inline text-sm text-gray-400">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <button
          onClick={disconnect}
          className="px-4 py-2 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-500 hover:text-white transition-all flex items-center"
        >
          <Wallet className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setModalOpen(true)}
      className="px-4 py-2 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-500 hover:text-white transition-all flex items-center"
    >
      <Wallet className="w-4 h-4 md:mr-2" />
      <span className="hidden md:inline">Connect Wallet</span>
    </button>
  );
}