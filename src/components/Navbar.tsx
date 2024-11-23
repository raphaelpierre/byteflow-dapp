import React from 'react';
import { Menu, X, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WalletButton from './auth/WalletButton';
import ConnectModal from './auth/ConnectModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                  ByteFlow
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/staking" active={location.pathname === '/staking'}>Staking</NavLink>
                <NavLink to="/swap" active={location.pathname === '/swap'}>Swap</NavLink>
                <NavLink to="/pool" active={location.pathname === '/pool'}>Pool</NavLink>
                <NavLink to="/wallet" active={location.pathname === '/wallet'}>Wallet</NavLink>
                <WalletButton />
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-800 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md">
              <MobileNavLink to="/staking" active={location.pathname === '/staking'}>Staking</MobileNavLink>
              <MobileNavLink to="/swap" active={location.pathname === '/swap'}>Swap</MobileNavLink>
              <MobileNavLink to="/pool" active={location.pathname === '/pool'}>Pool</MobileNavLink>
              <MobileNavLink to="/wallet" active={location.pathname === '/wallet'}>Wallet</MobileNavLink>
              <div className="pt-2">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </nav>
      <ConnectModal />
    </>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'text-purple-400 bg-purple-500/10' 
          : 'text-gray-300 hover:text-purple-400'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
        active 
          ? 'text-purple-400 bg-purple-500/10' 
          : 'text-gray-300 hover:text-purple-400'
      }`}
    >
      {children}
    </Link>
  );
}