// ENS Configuration for Rehab DAO
export const ENS_CONFIG = {
  // Parent domain for Rehab DAO
  parentDomain: 'rehabdao.eth',
  
  // ENS Registry contract address (same for all networks)
  ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  
  // ENS Public Resolver address
  publicResolverAddress: '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63',
  
  // Reverse Registrar for setting primary names
  reverseRegistrarAddress: '0x084b1c3C81545d370f3634392De611CaaBFf8148',
  
  // Network configuration
  networks: {
    mainnet: {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/your-project-id'
    },
    sepolia: {
      chainId: 11155111,
      name: 'Sepolia Testnet',
      rpcUrl: 'https://sepolia.infura.io/v3/your-project-id'
    }
  }
};

// ENS Registry ABI (minimal for subdomain management)
export const ENS_REGISTRY_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "label",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "setSubnodeOwner",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Reverse Registrar ABI for setting primary names
export const REVERSE_REGISTRAR_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Utility functions for ENS operations
export const ENS_UTILS = {
  // Hash a domain name
  namehash: (name: string): string => {
    const { ethers } = require('ethers');
    return ethers.namehash(name);
  },
  
  // Hash a label (subdomain)
  labelhash: (label: string): string => {
    const { ethers } = require('ethers');
    return ethers.keccak256(ethers.toUtf8Bytes(label));
  },
  
  // Check if an ENS name is a subdomain of our parent domain
  isSubdomain: (ensName: string): boolean => {
    return ensName.toLowerCase().endsWith(`.${ENS_CONFIG.parentDomain.toLowerCase()}`);
  },
  
  // Extract subdomain from full ENS name
  getSubdomain: (ensName: string): string | null => {
    if (!ENS_UTILS.isSubdomain(ensName)) return null;
    return ensName.split('.')[0];
  },
  
  // Generate full ENS name from subdomain
  getFullName: (subdomain: string): string => {
    return `${subdomain}.${ENS_CONFIG.parentDomain}`;
  }
};
