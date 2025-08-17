// CDP SDK Configuration
export const CDP_CONFIG = {
  apiKeyName: '7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0',
  apiKeySecret: '7TeCbYqm+SIph1O+SAnueim/JsOeRQ2w/ySSVA8fO1khlBHwnWQATH3AVLdRgUkzF5eonl02JbwjO2gMYkLMdQ==',
  projectId: '7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0'
};

// CDP SDK initialization function
export function initializeCDP() {
  if (typeof window === 'undefined') {
    // Server-side only
    const { Cdp } = require('@coinbase/cdp-sdk');
    
    Cdp.configure({
      apiKeyName: CDP_CONFIG.apiKeyName,
      apiKeySecret: CDP_CONFIG.apiKeySecret
    });
    
    return Cdp;
  }
  return null;
}
