import { Contract, formatUnits } from 'ethers';

// ERC20 Token ABI (minimal interface for name, symbol, decimals, and balanceOf)
export const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
];

// Common ERC20 token addresses on Ethereum Mainnet
export const COMMON_TOKENS = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
};

export interface TokenDetails {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

export async function getTokenDetails(
  tokenAddress: string,
  userAddress: string,
  provider: any
): Promise<TokenDetails> {
  try {
    const contract = new Contract(tokenAddress, ERC20_ABI, provider);
    
    const [name, symbol, decimals, balance] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.balanceOf(userAddress),
    ]);

    return {
      address: tokenAddress,
      name,
      symbol,
      decimals,
      balance: formatUnits(balance, decimals),
    };
  } catch (error) {
    console.error(`Error fetching token details for ${tokenAddress}:`, error);
    // Return a default object for failed tokens
    return {
      address: tokenAddress,
      name: 'Unknown Token',
      symbol: '???',
      decimals: 18,
      balance: '0',
    };
  }
}