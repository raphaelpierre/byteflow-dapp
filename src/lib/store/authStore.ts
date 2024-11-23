import { create } from 'zustand';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

interface AuthState {
  isConnected: boolean;
  address: string | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  isModalOpen: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isConnected: false,
  address: null,
  provider: null,
  signer: null,
  isModalOpen: false,

  connect: async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      set({
        isConnected: true,
        address,
        provider,
        signer,
        isModalOpen: false,
      });
    } catch (error) {
      console.error('Connection error:', error);
      set({ isModalOpen: true });
    }
  },

  disconnect: () => {
    set({
      isConnected: false,
      address: null,
      provider: null,
      signer: null,
    });
  },

  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));