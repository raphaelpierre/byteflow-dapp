import React from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, PieChart, Activity, DollarSign, Coins } from 'lucide-react';

export default function Wallet() {
  const portfolio = {
    total: 125750.25,
    change: 12.5,
    assets: [
      { name: 'Bitcoin', symbol: 'BTC', amount: 0.85, value: 52500.25, change: 8.2 },
      { name: 'Ethereum', symbol: 'ETH', amount: 12.5, value: 42500.75, change: 15.4 },
      { name: 'Solana', symbol: 'SOL', amount: 145.2, value: 18125.50, change: -2.1 },
      { name: 'USDT', symbol: 'USDT', amount: 12623.75, value: 12623.75, change: 0 },
    ],
  };

  return (
    <section className="min-h-screen bg-black pt-20" id="wallet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient mb-4">
            Smart Wallet Dashboard
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your gateway to DeFi with built-in security features and real-time analytics.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <PortfolioCard
            title="Total Balance"
            value={`$${portfolio.total.toLocaleString()}`}
            change={portfolio.change}
            icon={<WalletIcon />}
          />
          <PortfolioCard
            title="24h Volume"
            value="$45,230.50"
            change={8.5}
            icon={<Activity />}
          />
          <PortfolioCard
            title="Total Earnings"
            value="$12,450.75"
            change={22.4}
            icon={<DollarSign />}
          />
          <PortfolioCard
            title="Staking Rewards"
            value="$2,845.20"
            change={5.2}
            icon={<Coins />}
          />
        </div>

        {/* Assets Table */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative overflow-x-auto bg-black rounded-lg border border-purple-900/50">
            <table className="w-full text-left">
              <thead className="text-gray-400 text-sm">
                <tr className="border-b border-purple-900/30">
                  <th className="p-4">Asset</th>
                  <th className="p-4">Balance</th>
                  <th className="p-4">Value</th>
                  <th className="p-4">24h Change</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.assets.map((asset) => (
                  <tr key={asset.symbol} className="border-b border-purple-900/30 hover:bg-purple-500/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">{asset.symbol[0]}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{asset.name}</div>
                          <div className="text-sm text-gray-400">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white">{asset.amount} {asset.symbol}</td>
                    <td className="p-4 text-white">${asset.value.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <ActionButton icon={<ArrowUpRight />} label="Send" />
                        <ActionButton icon={<ArrowDownRight />} label="Receive" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-6 bg-black rounded-lg border border-purple-900/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                Portfolio Distribution
              </h3>
              <div className="aspect-square flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  Chart visualization would go here
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-6 bg-black rounded-lg border border-purple-900/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <ActivityItem
                  type="Received"
                  amount="0.25 BTC"
                  from="0x1234...5678"
                  time="2 mins ago"
                />
                <ActivityItem
                  type="Sent"
                  amount="100 USDT"
                  to="0x8765...4321"
                  time="5 mins ago"
                />
                <ActivityItem
                  type="Staked"
                  amount="2.5 ETH"
                  time="10 mins ago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ title, value, change, icon }: {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-black rounded-lg border border-purple-900/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">{title}</span>
          <span className="text-purple-400">{icon}</span>
        </div>
        <div className="text-2xl font-bold text-white mb-2">{value}</div>
        <div className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change}% past 24h
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="p-2 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors tooltip"
      title={label}
    >
      {icon}
    </button>
  );
}

function ActivityItem({ type, amount, from, to, time }: {
  type: string;
  amount: string;
  from?: string;
  to?: string;
  time: string;
}) {
  return (
    <div className="p-4 bg-gray-900/50 rounded-lg hover:bg-purple-500/10 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-purple-400">{type}</span>
        <span className="text-gray-500 text-sm">{time}</span>
      </div>
      <div className="text-white mb-1">{amount}</div>
      {from && <div className="text-sm text-gray-400">From: {from}</div>}
      {to && <div className="text-sm text-gray-400">To: {to}</div>}
    </div>
  );
}