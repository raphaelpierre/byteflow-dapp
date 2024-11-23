import React, { useState } from 'react';
import { ArrowDownUp, Settings, Info, ArrowRight, History } from 'lucide-react';

export default function Swap() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('BTC');
  const [amount, setAmount] = useState('');

  const tokens = {
    ETH: { price: 3450.75, balance: 1.2 },
    BTC: { price: 62400.50, balance: 0.05 },
    USDT: { price: 1.00, balance: 5000 },
    SOL: { price: 125.30, balance: 45 },
  };

  const getEstimatedAmount = () => {
    if (!amount) return '0.00';
    const fromPrice = tokens[fromToken as keyof typeof tokens].price;
    const toPrice = tokens[toToken as keyof typeof tokens].price;
    return ((parseFloat(amount) * fromPrice) / toPrice).toFixed(6);
  };

  return (
    <section className="min-h-screen bg-black pt-20" id="swap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient mb-4">
            Instant Token Swaps
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lightning-fast token swaps with minimal slippage and maximum security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Swap Card */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 bg-black rounded-lg border border-purple-900/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Swap Tokens</h3>
                  <button className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-purple-400" />
                  </button>
                </div>

                {/* From Token */}
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-400">From</label>
                      <span className="text-sm text-gray-400">
                        Balance: {tokens[fromToken as keyof typeof tokens].balance} {fromToken}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-2xl text-white focus:outline-none"
                      />
                      <select
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                        className="ml-4 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-lg focus:outline-none"
                      >
                        {Object.keys(tokens).map((token) => (
                          <option key={token} value={token}>{token}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Swap Direction Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        const temp = fromToken;
                        setFromToken(toToken);
                        setToToken(temp);
                      }}
                      className="p-2 bg-purple-500/10 rounded-full hover:bg-purple-500/20 transition-colors"
                    >
                      <ArrowDownUp className="w-5 h-5 text-purple-400" />
                    </button>
                  </div>

                  {/* To Token */}
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-400">To</label>
                      <span className="text-sm text-gray-400">
                        Balance: {tokens[toToken as keyof typeof tokens].balance} {toToken}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={getEstimatedAmount()}
                        readOnly
                        className="w-full bg-transparent text-2xl text-white focus:outline-none"
                      />
                      <select
                        value={toToken}
                        onChange={(e) => setToToken(e.target.value)}
                        className="ml-4 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-lg focus:outline-none"
                      >
                        {Object.keys(tokens).map((token) => (
                          <option key={token} value={token}>{token}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Exchange Rate</span>
                      <span>1 {fromToken} = {(tokens[fromToken as keyof typeof tokens].price / tokens[toToken as keyof typeof tokens].price).toFixed(6)} {toToken}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Network Fee</span>
                      <span>~$2.50</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center group">
                    Swap Now
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 bg-black rounded-lg border border-purple-900/50 h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <History className="w-5 h-5 mr-2 text-purple-400" />
                Recent Transactions
              </h3>
              <div className="space-y-4">
                <TransactionItem
                  type="Swap"
                  from={{ token: "ETH", amount: "0.5" }}
                  to={{ token: "BTC", amount: "0.027" }}
                  time="2 mins ago"
                />
                <TransactionItem
                  type="Swap"
                  from={{ token: "USDT", amount: "1000" }}
                  to={{ token: "SOL", amount: "7.95" }}
                  time="5 mins ago"
                />
                <TransactionItem
                  type="Swap"
                  from={{ token: "BTC", amount: "0.015" }}
                  to={{ token: "ETH", amount: "0.275" }}
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

function TransactionItem({ type, from, to, time }: { 
  type: string; 
  from: { token: string; amount: string }; 
  to: { token: string; amount: string }; 
  time: string 
}) {
  return (
    <div className="p-4 bg-gray-900/50 rounded-lg hover:bg-purple-500/10 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-purple-400 text-sm">{type}</span>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400">{from.amount} {from.token}</span>
        <ArrowRight className="w-4 h-4 text-gray-600 mx-2" />
        <span className="text-gray-400">{to.amount} {to.token}</span>
      </div>
    </div>
  );
}