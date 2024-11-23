import React, { useState } from 'react';
import { Calculator, Info, ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';

export default function Staking() {
  const [amount, setAmount] = useState<string>('100');
  const [duration, setDuration] = useState<string>('12');

  const calculateRewards = (principal: number, months: number) => {
    const apy = 0.12; // 12% APY
    const rewards = principal * (apy * (months / 12));
    return rewards.toFixed(2);
  };

  const rewards = calculateRewards(parseFloat(amount) || 0, parseFloat(duration) || 0);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient mb-4">
            Secure Staking Platform
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Earn passive income by staking your crypto assets with industry-leading APY rates and
            bulletproof security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Section */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 bg-black rounded-lg border border-purple-900/50">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-purple-400" />
                Rewards Calculator
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Stake Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-900 border border-purple-900/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Lock Period (Months)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-900 border border-purple-900/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                  </select>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Estimated Rewards</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      ${rewards}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Info className="w-4 h-4 mr-1" />
                    Based on 12% APY
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center group">
                  Start Staking Now
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StakingFeature
              icon={<Shield className="w-6 h-6 text-purple-400" />}
              title="Secure Storage"
              description="Multi-signature wallets and cold storage solutions to protect your assets"
            />
            <StakingFeature
              icon={<Clock className="w-6 h-6 text-cyan-400" />}
              title="Flexible Duration"
              description="Choose your preferred staking period from 3 to 24 months"
            />
            <StakingFeature
              icon={<TrendingUp className="w-6 h-6 text-pink-400" />}
              title="Competitive APY"
              description="Earn up to 12% APY on your staked assets with daily rewards"
            />
            <StakingFeature
              icon={<Calculator className="w-6 h-6 text-purple-400" />}
              title="Real-time Analytics"
              description="Track your earnings and rewards with detailed analytics"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StakingFeature({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-black rounded-lg border border-purple-900/50 hover:border-purple-500/50 transition-colors">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="ml-2 text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}