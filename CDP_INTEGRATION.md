# CDP SDK Integration for Rehab-DAO

## Overview
This document describes the integration of the Coinbase CDP (Collateralized Debt Position) SDK into the Rehab-DAO project.

## Configuration
The CDP SDK is configured with the following credentials:
- **API Key**: `7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0`
- **Secret**: `7TeCbYqm+SIph1O+SAnueim/JsOeRQ2w/ySSVA8fO1khlBHwnWQATH3AVLdRgUkzF5eonl02JbwjO2gMYkLMdQ==`

## Files Created

### 1. `lib/cdp-config.ts`
- Contains CDP API credentials
- Provides initialization function for the CDP SDK
- Server-side only execution

### 2. `lib/cdp-service.ts`
- Comprehensive service class for CDP operations
- Methods for managing positions, market data, and user operations
- Singleton pattern for consistent SDK usage

### 3. `app/api/cdp/route.ts`
- REST API endpoints for CDP operations
- GET: Check CDP SDK status and get market data
- POST: Handle CDP operations (create positions, get user positions)

## Usage Examples

### Initialize CDP Service
```typescript
import { cdpService } from '@/lib/cdp-service';

// Check if CDP is available
if (cdpService.isAvailable()) {
  // Use CDP functionality
}
```

### Get User Positions
```typescript
const positions = await cdpService.getUserPositions('user123');
```

### Create New Position
```typescript
const positionData = {
  collateral: 'ETH',
  amount: '1000',
  // ... other position parameters
};
const position = await cdpService.createPosition(positionData);
```

### API Endpoints

#### GET `/api/cdp`
Returns CDP SDK status and market data.

#### POST `/api/cdp`
Accepts CDP operations:
```json
{
  "action": "createPosition",
  "positionData": {
    "collateral": "ETH",
    "amount": "1000"
  }
}
```

```json
{
  "action": "getPositions",
  "userId": "user123"
}
```

## Security Notes
- API credentials are stored in the configuration file
- Consider moving to environment variables for production
- CDP SDK only runs on the server side
- All operations are validated and error-handled

## Dependencies
- `@coinbase/cdp-sdk`: Official Coinbase CDP SDK
- Next.js 15+ for API routes
- TypeScript for type safety

## Next Steps
1. Implement specific CDP operations based on your requirements
2. Add authentication and authorization for CDP operations
3. Create database models for storing CDP-related data
4. Add error handling and logging for production use
5. Implement rate limiting for API endpoints
