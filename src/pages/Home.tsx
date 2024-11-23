import React from 'react';
import { ArrowRight, Wallet, Repeat, Coins, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceDisplay from '../components/PriceDisplay';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  primary?: boolean;
}

function Button({ to, children, icon, primary = false }: ButtonProps) {
  return (
    <Link
      to={to}
      className={`
        group inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold
        transition-all duration-200 ease-in-out
        ${primary
          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600'
          : 'border border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative px-6 py-8 bg-black rounded-lg border border-purple-900/50 hover:border-purple-500/50 transition-colors">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-900/20 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwNywgMTE0LCAxMjgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-8 animate-gradient">
            Revolutionize Crypto with ByteFlow
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-12">
            Staking. Swapping. Simplified.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/staking" icon={<Coins />} primary>
              Explore Staking
            </Button>
            <Button to="/swap" icon={<Repeat />}>
              Start Swapping
            </Button>
            <Button to="/pool" icon={<TrendingUp />}>
              Investment Pools
            </Button>
            <Button to="/wallet" icon={<Wallet />}>
              Access Wallet
            </Button>
          </div>
        </div>

        {/* Live Price Display */}
        <div className="mt-24 mb-24">
          <PriceDisplay />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Coins className="w-8 h-8 text-purple-400" />}
            title="Secure Staking"
            description="Earn passive income with our industry-leading staking protocols and competitive APY rates."
          />
          <FeatureCard
            icon={<Repeat className="w-8 h-8 text-cyan-400" />}
            title="Instant Swaps"
            description="Lightning-fast token swaps with minimal slippage and maximum security."
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-pink-400" />}
            title="Investment Pools"
            description="Professional-grade crypto investment strategies managed by expert algorithms."
          />
          <FeatureCard
            icon={<Wallet className="w-8 h-8 text-purple-400" />}
            title="Smart Wallet"
            description="Your gateway to DeFi with built-in security features and real-time analytics."
          />
        </div>
      </div>
    </div>
  );
}