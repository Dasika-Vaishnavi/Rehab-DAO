// Server-side only imports
let EAS: any, SchemaEncoder: any, ethers: any;

if (typeof window === 'undefined') {
  // Only import on server-side
  const easModule = require('@ethereum-attestation-service/eas-sdk');
  EAS = easModule.EAS;
  SchemaEncoder = easModule.SchemaEncoder;
  ethers = require('ethers');
}

// EAS contract addresses for different networks
const EAS_CONTRACTS = {
  sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
  mainnet: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
  base: '0x4200000000000000000000000000000000000021',
  baseSepolia: '0x4200000000000000000000000000000000000021'
};

// Initialize EAS only on server-side
let eas: any = null;

if (typeof window === 'undefined' && EAS) {
  try {
    // Check if required environment variables are set
    if (!process.env.NEXT_PUBLIC_QUICKNODE_ENDPOINT || 
        !process.env.WALLET_PRIVATE_KEY || 
        process.env.WALLET_PRIVATE_KEY === 'your-wallet-private-key-with-ETH') {
      console.log('EAS: Environment variables not configured, skipping initialization');
    } else {
      eas = new EAS(EAS_CONTRACTS.sepolia);
      
      // Initialize provider and wallet
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_ENDPOINT);
      const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
      
      // Connect EAS to the wallet
      eas.connect(wallet);
      
      console.log('EAS initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize EAS:', error);
  }
}

export { eas, SchemaEncoder, EAS_CONTRACTS };
