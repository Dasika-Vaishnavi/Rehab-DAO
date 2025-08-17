// CDP SDK Configuration
export const CDP_CONFIG = {
  apiKeyName: process.env.CDP_API_KEY_ID || '',
  apiKeySecret: process.env.CDP_API_KEY_SECRET || '',
  projectId: process.env.CDP_PROJECT_ID || '',
  walletSecret: process.env.CDP_WALLET_SECRET || ''
};

// CDP SDK initialization function
export function initializeCDP() {
  if (typeof window === 'undefined') {
    // Server-side only
    const { Cdp } = require('@coinbase/cdp-sdk');
    
    // Validate environment variables
    if (!CDP_CONFIG.apiKeyName || !CDP_CONFIG.apiKeySecret || !CDP_CONFIG.projectId) {
      console.error('CDP Configuration Error: Missing required environment variables');
      console.error('Required: CDP_API_KEY_ID, CDP_API_KEY_SECRET, CDP_PROJECT_ID');
      return null;
    }
    
    Cdp.configure({
      apiKeyName: CDP_CONFIG.apiKeyName,
      apiKeySecret: CDP_CONFIG.apiKeySecret
    });
    
    console.log('CDP SDK initialized with API Key:', CDP_CONFIG.apiKeyName);
    console.log('CDP Project ID:', CDP_CONFIG.projectId);
    return Cdp;
  }
  return null;
}

// CDP Client initialization
export function createCDPClient() {
  if (typeof window === 'undefined') {
    // Server-side only
    const { CdpClient } = require('@coinbase/cdp-sdk');
    
    // Validate environment variables
    if (!CDP_CONFIG.apiKeyName || !CDP_CONFIG.apiKeySecret || !CDP_CONFIG.projectId) {
      console.error('CDP Client Error: Missing required environment variables');
      console.error('Required: CDP_API_KEY_ID, CDP_API_KEY_SECRET, CDP_PROJECT_ID');
      return null;
    }
    
    const client = new CdpClient({
      projectId: CDP_CONFIG.projectId,
      apiKeyName: CDP_CONFIG.apiKeyName,
      apiKeySecret: CDP_CONFIG.apiKeySecret
    });
    
    console.log('CDP Client created successfully');
    return client;
  }
  return null;
}
