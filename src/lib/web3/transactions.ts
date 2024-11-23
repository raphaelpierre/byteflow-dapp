import { BrowserProvider, formatEther } from 'ethers';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  type: 'sent' | 'received';
}

export async function getTransactions(
  address: string,
  provider: BrowserProvider
): Promise<Transaction[]> {
  try {
    // Get the last 10 blocks
    const currentBlock = await provider.getBlockNumber();
    const blocks = await Promise.all(
      Array.from({ length: 10 }, async (_, i) => {
        try {
          return await provider.getBlock(currentBlock - i, true);
        } catch (error) {
          console.error(`Error fetching block ${currentBlock - i}:`, error);
          return null;
        }
      })
    );

    const transactions: Transaction[] = [];

    for (const block of blocks) {
      if (!block?.transactions) continue;

      const blockTimestamp = Number(block.timestamp) * 1000; // Convert to milliseconds

      for (const tx of block.transactions) {
        const txTo = tx.to?.toLowerCase();
        const txFrom = tx.from.toLowerCase();
        const userAddress = address.toLowerCase();

        if (txFrom === userAddress || txTo === userAddress) {
          transactions.push({
            hash: tx.hash,
            from: tx.from,
            to: tx.to || '',
            value: formatEther(tx.value),
            timestamp: blockTimestamp,
            type: txFrom === userAddress ? 'sent' : 'received'
          });
        }
      }
    }

    return transactions.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}