import React from 'react';
import { X, Wallet } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';

export default function ConnectModal() {
  const { isModalOpen, setModalOpen, connect } = useAuthStore();

  if (!isModalOpen) return null;

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-75" />
        <div className="relative bg-black p-6 rounded-lg border border-purple-900/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center group mb-4"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect with MetaMask
          </button>

          <p className="text-sm text-gray-400 text-center">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}