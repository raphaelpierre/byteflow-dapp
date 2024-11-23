import React, { useState } from 'react';
import { Coins, TrendingUp, Users, Shield, Info, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../lib/store/authStore';
import TokenPriceChart from '../components/charts/TokenPriceChart';
import VolumeChart from '../components/charts/VolumeChart';
import { useTokenPrices } from '../hooks/useTokenPrice';

const pools = [
  {
    id: 'defi-blue-chip',
    name: 'DeFi Blue Chip',
    description: 'A curated selection of established DeFi protocols',
    apy: 14.5,
    tvl: 45_000_000,
    assets: ['ETH', 'BTC', 'LINK', 'UNI'],
    risk: 'Moderate',
    performance: [
      { month: '1M', return: 8.2 },
      { month: '3M', return: 24.5 },
      { month: '6M', return: 42.8 },
      { month: '1Y', return: 95.3 },
    ],
  },
  {
    id: 'yield-maximizer',
    name: 'Yield Maximizer',
    description: 'Optimized for maximum yield through strategic farming',
    apy: 22.8,
    tvl: 28_000_000,
    assets: ['AAVE', 'CRV', 'SNX', 'COMP'],
    risk: 'High',
    performance: [
      { month: '1M', return: 12.4 },
      { month: '3M', return: 35.2 },
      { month: '6M', return: 58.9 },
      { month: '1Y', return: 124.7 },
    ],
  },
  {
    id: 'stablecoin-plus',
    name: 'Stablecoin+',
    description: 'Enhanced yield on stablecoin deposits with minimal risk',
    apy: 8.5,
    tvl: 65_000_000,
    assets: ['USDC', 'USDT', 'DAI', 'BUSD'],
    risk: 'Low',
    performance: [
      { month: '1M', return: 0.7 },
      { month: '3M', return: 2.1 },
      { month: '6M', return: 4.2 },
      { month: '1Y', return: 8.5 },
    ],
  },
];

export default function Pool() {
  const { isConnected, setModalOpen } = useAuthStore();
  const [selectedPool, setSelectedPool] = useState(pools[0]);
  const { prices, isLoading } = useTokenPrices();

  const handleInvest = () => {
    if (!isConnected) {
      setModalOpen(true);
      return;
    }
    // Handle investment logic
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient mb-4">
            Crypto Investment Pools
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional-grade investment strategies managed by expert algorithms
          </p>
        </div>

        {/* Live Token Prices */}
        {!isLoading && prices && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {prices.slice(0, 4).map((token) => (
              <div key={token.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-4 bg-black rounded-lg border border-purple-900/50">
                  <div className="flex items-center mb-2">
                    <img src={token.image} alt={token.name} className="w-6 h-6 rounded-full mr-2" />
                    <span className="text-white font-semibold">{token.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    ${token.current_price.toLocaleString()}
                  </div>
                  <div className={`text-sm ${
                    token.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {token.price_change_percentage_24h >= 0 ? '+' : ''}
                    {token.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pools.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              isSelected={selectedPool.id === pool.id}
              onClick={() => setSelectedPool(pool)}
            />
          ))}
        </div>

        {/* Pool Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <TokenPriceChart />
          <VolumeChart />
        </div>

        {/* Pool Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Value Locked"
            value={`$${(selectedPool.tvl / 1_000_000).toFixed(1)}M`}
            icon={<Coins className="w-5 h-5 text-purple-400" />}
          />
          <StatCard
            title="Annual Yield"
            value={`${selectedPool.apy}% APY`}
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
          />
          <StatCard
            title="Risk Level"
            value={selectedPool.risk}
            icon={<Shield className="w-5 h-5 text-cyan-400" />}
          />
          <StatCard
            title="Active Investors"
            value="2.5K+"
            icon={<Users className="w-5 h-5 text-pink-400" />}
          />
        </div>

        {/* Investment Form */}
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative p-8 bg-black rounded-lg border border-purple-900/50">
            <h3 className="text-2xl font-bold text-white mb-6">Invest in {selectedPool.name}</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Investment Amount (USD)
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-900 border border-purple-900/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter amount"
                  min="100"
                />
              </div>

              <div className="p-4 bg-purple-500/10 rounded-lg">
                <div className="flex items-center mb-2">
                  <Info className="w-4 h-4 text-purple-400 mr-2" />
                  <span className="text-sm text-purple-400">Investment Details</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Minimum investment: $100</li>
                  <li>• No lock-up period</li>
                  <li>• Automatic yield compounding</li>
                  <li>• 0.5% management fee</li>
                </ul>
              </div>

              <button
                onClick={handleInvest}
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center group"
              >
                {isConnected ? 'Invest Now' : 'Connect Wallet to Invest'}
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PoolCardProps {
  pool: typeof pools[0];
  isSelected: boolean;
  onClick: () => void;
}

function PoolCard({ pool, isSelected, onClick }: PoolCardProps) {
  return (
    <div
      className={`relative group cursor-pointer ${isSelected ? 'scale-105' : ''}`}
      onClick={onClick}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-black rounded-lg border border-purple-900/50">
        <h3 className="text-xl font-bold text-white mb-2">{pool.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{pool.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm text-gray-400">APY</div>
            <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">TVL</div>
            <div className="text-lg font-semibold text-white">
              ${(pool.tvl / 1_000_000).toFixed(1)}M
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Assets</div>
          <div className="flex flex-wrap gap-2">
            {pool.assets.map((asset) => (
              <span
                key={asset}
                className="px-2 py-1 bg-purple-500/10 rounded-md text-purple-400 text-sm"
              >
                {asset}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-400 mb-2">Historical Performance</div>
          <div className="grid grid-cols-4 gap-2">
            {pool.performance.map((perf) => (
              <div key={perf.month} className="text-center">
                <div className="text-xs text-gray-400">{perf.month}</div>
                <div className={`text-sm font-semibold ${
                  perf.return >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {perf.return}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-black rounded-lg border border-purple-900/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">{title}</span>
          <span className="text-purple-400">{icon}</span>
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}