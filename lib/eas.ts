import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';

// EAS contract addresses for different networks
const EAS_CONTRACTS = {
  sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
  mainnet: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
  base: '0x4200000000000000000000000000000000000021',
  baseSepolia: '0x4200000000000000000000000000000000000021'
};

// Initialize EAS with Sepolia testnet (you can change this to mainnet later)
const eas = new EAS(EAS_CONTRACTS.sepolia);

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_ENDPOINT!);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!, provider);

// Connect EAS to the wallet
eas.connect(wallet);

export { eas, SchemaEncoder, EAS_CONTRACTS };
