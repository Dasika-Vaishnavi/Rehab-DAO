# Rehab DAO - Technical Documentation

**Version:** 1.0.0  
**Last Updated:** August 17th, 2025 
**Project:** Privacy-Focused Addiction Recovery Platform  
**Architecture:** Web3-Enabled Next.js Application

---

## Table of Contents

1. [Chapter 1: Project Overview & Architecture](#chapter-1-project-overview--architecture)
2. [Chapter 2: Technology Stack & Dependencies](#chapter-2-technology-stack--dependencies)
3. [Chapter 3: Core Features & Implementation](#chapter-3-core-features--implementation)
4. [Chapter 4: Blockchain Integration & Web3 Services](#chapter-4-blockchain-integration--web3-services)
5. [Chapter 5: Development, Deployment & Maintenance](#chapter-5-development-deployment--maintenance)

---

## Chapter 1: Project Overview & Architecture

### 1.1 What is Rehab DAO?

**Rehab DAO** is a privacy-focused addiction recovery platform that leverages blockchain technology to provide anonymous progress tracking, community support, and verifiable session attestations. The platform addresses the critical need for privacy in addiction recovery while maintaining accountability and community engagement.

### 1.2 Core Mission & Vision

**Mission:** Enable individuals to recover from addiction privately while building supportive communities and maintaining verifiable progress records.

**Vision:** Create a decentralized recovery ecosystem where privacy, accountability, and community support coexist through blockchain technology.

### 1.3 Key Stakeholders

| Stakeholder | Role | Purpose |
|-------------|------|---------|
| **Patients** | Primary Users | Anonymous recovery tracking and community support |
| **Therapists** | Service Providers | Session management and attestation creation |
| **Managers** | Community Leaders | ENS subdomain assignment and platform oversight |
| **Sponsors** | Financial Supporters | Funding recovery programs and community initiatives |

### 1.4 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15.2.4 │ React 19 │ TypeScript │ Tailwind CSS 4.1.9   │
│  Radix UI       │ Lucide   │ React Hook Form │ Zod Validation  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes │ EAS SDK │ CDP SDK │ ENS Integration      │
│  Session Management │ Attestations │ User Authentication      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BLOCKCHAIN LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Ethereum Mainnet │ Sepolia Testnet │ EAS Contracts           │
│  ENS Registry     │ Reverse Registrar │ Attestation Schemas   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  Coinbase CDP │ EAS Blockchain │ ENS On-chain Records         │
│  Queryable Data │ Immutable Attestations │ Identity Management │
└─────────────────────────────────────────────────────────────────┘
```

### 1.5 Data Flow Architecture

#### 1.5.1 Session Attestation Flow
```
User Input → Form Validation → EAS Blockchain → CDP Storage → UI Update
     │              │              │              │            │
     ▼              ▼              ▼              ▼            ▼
Session Data → Zod Schema → Immutable Record → Queryable → Real-time
```

#### 1.5.2 ENS Identity Flow
```
Manager Input → Validation → ENS Registry → Reverse Registrar → User Identity
     │            │            │              │                │
     ▼            ▼            ▼              ▼                ▼
Subdomain → Address Check → On-chain → Primary Name → Community Recognition
```

### 1.6 Security & Privacy Model

#### 1.6.1 Privacy-First Design
- **Zero PII Storage**: No personally identifiable information stored in plain text
- **Hash-Based Identifiers**: Patient and therapist data hashed before storage
- **Anonymous Attestations**: EAS attestations use anonymous recipients
- **User-Controlled Identity**: ENS subdomains managed by users

#### 1.6.2 Security Measures
- **Environment Variables**: All sensitive data stored in `.env.local`
- **Server-Side Operations**: Critical operations run server-side only
- **Input Validation**: Comprehensive validation using Zod schemas
- **Network Validation**: Strict network checking for blockchain operations

---

## Chapter 2: Technology Stack & Dependencies

### 2.1 Frontend Framework

#### 2.1.1 Next.js 15.2.4
**Purpose:** Full-stack React framework providing server-side rendering, API routes, and optimized performance.

**Why Next.js?**
- **Server-Side Rendering**: Improved SEO and initial load performance
- **API Routes**: Built-in backend functionality without separate server
- **File-Based Routing**: Intuitive routing system
- **TypeScript Support**: Native TypeScript integration
- **Optimization**: Automatic code splitting and image optimization

**Implementation:**
```typescript
// app/layout.tsx - Root layout with metadata
export const metadata: Metadata = {
  title: "REHAB DAO - Recover Privately. Celebrate Progress. Support Change.",
  description: "Privacy-focused addiction recovery platform...",
  generator: "v0.app",
}
```

#### 2.1.2 React 19
**Purpose:** Modern React with concurrent features and improved performance.

**Key Features Used:**
- **Concurrent Rendering**: Improved user experience during updates
- **Automatic Batching**: Optimized re-renders
- **Suspense**: Loading states and error boundaries
- **Hooks**: State management and side effects

### 2.2 UI/UX Framework

#### 2.2.1 Tailwind CSS 4.1.9
**Purpose:** Utility-first CSS framework for rapid UI development.

**Why Tailwind?**
- **Rapid Development**: Utility classes for quick styling
- **Consistent Design**: Predefined design system
- **Responsive Design**: Built-in responsive utilities
- **Customization**: Easy theme customization
- **Performance**: PurgeCSS integration for minimal bundle size

**Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      }
    }
  }
}
```

#### 2.2.2 Radix UI
**Purpose:** Unstyled, accessible UI components for building design systems.

**Components Used:**
- **Dialog**: Modal windows and overlays
- **Tabs**: Tabbed interfaces
- **Select**: Dropdown selections
- **Switch**: Toggle controls
- **Progress**: Progress indicators
- **Avatar**: User profile images
- **Badge**: Status indicators

**Benefits:**
- **Accessibility**: WCAG compliant components
- **Unstyled**: Complete styling control
- **Composable**: Flexible component composition
- **TypeScript**: Full TypeScript support

#### 2.2.3 Lucide React
**Purpose:** Beautiful, customizable icons for consistent visual design.

**Usage:**
```typescript
import { User, Shield, Heart, Award } from 'lucide-react'

// Consistent iconography across the application
```

### 2.3 Form Management & Validation

#### 2.3.1 React Hook Form 7.60.0
**Purpose:** Performant, flexible forms with minimal re-renders.

**Features:**
- **Uncontrolled Components**: Better performance
- **Validation Integration**: Works with Zod schemas
- **Error Handling**: Comprehensive error management
- **Field Arrays**: Dynamic form fields

#### 2.3.2 Zod 3.25.67
**Purpose:** TypeScript-first schema validation.

**Usage:**
```typescript
// lib/session-schema.ts
export const sessionSchema = z.object({
  sessionCompleted: z.boolean(),
  sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  therapistInfo: z.string().min(1),
  patientInfo: z.string().min(1),
  sessionDuration: z.number().min(1).max(480),
  sessionType: z.enum(['individual', 'group', 'family', 'other'])
})
```

### 2.4 State Management & Data Fetching

#### 2.4.1 TanStack React Query 5.85.3
**Purpose:** Powerful data synchronization for React applications.

**Features:**
- **Caching**: Intelligent caching strategies
- **Background Updates**: Automatic data refetching
- **Optimistic Updates**: Immediate UI updates
- **Error Handling**: Comprehensive error management

#### 2.4.2 React Context
**Purpose:** Lightweight state management for application-wide data.

**Usage:**
```typescript
// components/Providers.tsx
export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClient>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClient>
  );
}
```

### 2.5 Blockchain & Web3 Integration

#### 2.5.1 Ethers.js 6.15.0
**Purpose:** Complete Ethereum library for interacting with blockchain.

**Features:**
- **Provider Management**: Connection to Ethereum networks
- **Wallet Integration**: Private key and wallet management
- **Contract Interaction**: ABI-based contract calls
- **Transaction Handling**: Gas estimation and transaction management

#### 2.5.2 Wagmi 2.16.3
**Purpose:** React hooks for Ethereum.

**Features:**
- **Wallet Connection**: Multi-wallet support
- **Account Management**: User account information
- **Network Switching**: Multi-network support
- **Contract Reading**: Easy contract data access

#### 2.5.3 Viem 2.33.3
**Purpose:** TypeScript interface for Ethereum.

**Features:**
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized for modern JavaScript
- **Modular**: Tree-shakable architecture
- **Extensible**: Plugin system for custom functionality

### 2.6 Development Tools

#### 2.6.1 TypeScript 5
**Purpose:** Static type checking for JavaScript.

**Benefits:**
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Documentation**: Types serve as documentation
- **Maintainability**: Easier code maintenance

#### 2.6.2 ESLint
**Purpose:** Code linting and quality enforcement.

**Configuration:**
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    // Custom linting rules
  }
}
```

#### 2.6.3 PostCSS 8.5
**Purpose:** CSS processing and optimization.

**Plugins:**
- **Autoprefixer**: Vendor prefix management
- **Tailwind CSS**: Utility-first CSS processing

---

## Chapter 3: Core Features & Implementation

### 3.1 Session Attestation System

#### 3.1.1 What is Session Attestation?
Session attestations are blockchain-based proofs that verify therapy sessions occurred between patients and therapists. These attestations provide:
- **Verifiable Proof**: Immutable records on Ethereum blockchain
- **Privacy Protection**: Anonymous participants with hashed identifiers
- **Community Recognition**: Public proof of progress without revealing identity

#### 3.1.2 Implementation Architecture

**Frontend Components:**
```typescript
// components/session-attestation-form.tsx
export function SessionAttestationForm() {
  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      sessionCompleted: true,
      sessionDate: new Date().toISOString().split('T')[0],
      sessionDuration: 60,
      sessionType: 'individual'
    }
  });
}
```

**API Endpoints:**
```typescript
// app/api/attestations/create/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  const validatedData = sessionSchema.parse(body);
  
  // Create EAS attestation
  const attestationUID = await createEASAttestation(validatedData);
  
  // Store in CDP
  await storeInCDP(attestationUID, validatedData);
  
  return Response.json({ success: true, attestationUID });
}
```

#### 3.1.3 Data Flow Process

1. **Form Submission**: User fills session attestation form
2. **Validation**: Zod schema validates input data
3. **Hashing**: Patient and therapist data hashed for privacy
4. **EAS Creation**: Attestation created on Ethereum blockchain
5. **CDP Storage**: Data stored in Coinbase CDP for querying
6. **UI Update**: Success confirmation displayed to user

### 3.2 ENS Identity Management

#### 3.2.1 What is ENS Integration?
Ethereum Name Service (ENS) integration provides human-readable addresses for community members, enabling:
- **Community Recognition**: `.rehabdao.eth` subdomains
- **Verifiable Identity**: On-chain proof of community membership
- **Privacy-Preserving**: Anonymous identity without personal information

#### 3.2.2 Implementation Components

**Subdomain Assignment:**
```typescript
// components/ens-subdomain-assigner.tsx
export function AssignSubdomain({ parentDomain, isManager }: Props) {
  const [subdomain, setSubdomain] = useState('');
  const [userAddress, setUserAddress] = useState('');
  
  const handleAssignment = async () => {
    // Validate inputs
    // Check subdomain availability
    // Execute ENS transaction
    // Update UI
  };
}
```

**User Identity Display:**
```typescript
// components/user-ens-info.tsx
export function UserENSInfo({ userAddress, isManager }: Props) {
  const [ensName, setEnsName] = useState<string | null>(null);
  
  useEffect(() => {
    // Lookup ENS name for address
    // Check if it's a rehabdao.eth subdomain
    // Set primary name if available
  }, [userAddress]);
}
```

#### 3.2.3 ENS Workflow

1. **Manager Assignment**: Manager assigns subdomain to user address
2. **On-chain Creation**: ENS registry creates subdomain ownership
3. **User Setup**: User sets subdomain as primary name
4. **Community Recognition**: Subdomain becomes verifiable identity

### 3.3 Community Center

#### 3.3.1 Purpose & Features
The community center provides a supportive environment for recovery with:
- **Anonymous Chat**: Private communication channels
- **Progress Sharing**: Anonymous progress updates
- **Support Groups**: Topic-based discussion channels
- **Moderation**: Community guidelines enforcement

#### 3.3.2 Implementation

**Channel Management:**
```typescript
// components/community-center.tsx
export function CommunityCenter() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  
  // Channel creation and management
  // Message handling
  // User moderation
}
```

**Message System:**
```typescript
// app/messages/page.tsx
export default function MessagesPage() {
  return (
    <div className="flex h-screen">
      <ChannelList />
      <MessageView />
      <UserList />
    </div>
  );
}
```

### 3.4 Progress Tracking

#### 3.4.1 Progress Metrics
The platform tracks various recovery metrics:
- **Session Completion**: Number of completed therapy sessions
- **Duration Tracking**: Total time spent in therapy
- **Type Analysis**: Distribution of session types
- **Consistency**: Regular attendance patterns

#### 3.4.2 Implementation

**Progress Dashboard:**
```typescript
// components/progress-tracker.tsx
export function ProgressTracker({ userId }: Props) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  
  useEffect(() => {
    // Fetch attestations from CDP
    // Calculate progress metrics
    // Update visualization
  }, [userId]);
}
```

**Data Visualization:**
```typescript
// Using Recharts for data visualization
import { LineChart, BarChart, PieChart } from 'recharts';

// Session completion trends
// Session type distribution
// Duration analysis
```

### 3.5 Therapist Management

#### 3.5.1 Therapist Features
Therapist management includes:
- **Profile Management**: Professional information and credentials
- **Session Scheduling**: Appointment management
- **Attestation Creation**: Session verification and recording
- **Patient Management**: Anonymous patient tracking

#### 3.5.2 Implementation

**Therapist Dashboard:**
```typescript
// components/therapist-dashboard.tsx
export function TherapistDashboard({ therapistId }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attestations, setAttestations] = useState<Attestation[]>([]);
  
  // Session management
  // Attestation creation
  // Progress monitoring
}
```

**Session Management:**
```typescript
// app/therapists/[id]/page.tsx
export default function TherapistPage({ params }: Props) {
  const { id } = params;
  
  return (
    <div>
      <TherapistProfile therapistId={id} />
      <SessionCalendar />
      <AttestationHistory />
    </div>
  );
}
```

---

## Chapter 4: Blockchain Integration & Web3 Services

### 4.1 Ethereum Attestation Service (EAS)

#### 4.1.1 What is EAS?
EAS is a protocol for creating, managing, and verifying attestations on Ethereum. It provides:
- **Immutable Records**: On-chain attestations that cannot be altered
- **Schema Flexibility**: Customizable attestation schemas
- **Privacy Options**: Anonymous attestations with optional privacy
- **Verification**: Easy attestation verification

#### 4.1.2 Implementation Details

**EAS Configuration:**
```typescript
// lib/eas.ts
const EAS_CONTRACTS = {
  sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
  mainnet: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
  base: '0x4200000000000000000000000000000000000021',
  baseSepolia: '0x4200000000000000000000000000000000000021'
};

// Initialize EAS with provider and wallet
const eas = new EAS(EAS_CONTRACTS.sepolia);
const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_ENDPOINT);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
eas.connect(wallet);
```

**Attestation Schema:**
```typescript
// Session attestation schema
const schema = "bool sessionCompleted,string sessionDate,bytes32 therapistID,bytes32 patientHash,uint256 sessionDuration,string sessionType";

// Schema UID: Generated when schema is registered on EAS
const SCHEMA_UID = process.env.EAS_SCHEMA_UID;
```

**Creating Attestations:**
```typescript
// lib/eas.ts
export async function createAttestation(data: SessionData): Promise<string> {
  const schemaEncoder = new SchemaEncoder(schema);
  
  const encodedData = schemaEncoder.encodeData([
    { name: "sessionCompleted", value: data.sessionCompleted, type: "bool" },
    { name: "sessionDate", value: data.sessionDate, type: "string" },
    { name: "therapistID", value: hashData(data.therapistInfo), type: "bytes32" },
    { name: "patientHash", value: hashData(data.patientInfo), type: "bytes32" },
    { name: "sessionDuration", value: data.sessionDuration, type: "uint256" },
    { name: "sessionType", value: data.sessionType, type: "string" }
  ]);

  const tx = await eas.attest({
    schema: SCHEMA_UID,
    data: {
      recipient: "0x0000000000000000000000000000000000000000", // Anonymous
      expirationTime: 0, // No expiration
      revocable: false, // Immutable
      data: encodedData
    }
  });

  const newAttestationUID = await tx.wait();
  return newAttestationUID;
}
```

#### 4.1.3 Privacy Features

**Anonymous Attestations:**
- **Zero Address Recipients**: All attestations use `0x0000...0000` as recipient
- **Hashed Identifiers**: Patient and therapist data hashed before storage
- **No PII**: No personally identifiable information in attestations

**Data Hashing:**
```typescript
// lib/utils.ts
export function hashData(data: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(data));
}
```

### 4.2 Coinbase CDP Integration

#### 4.2.1 What is CDP?
Coinbase Customer Data Platform (CDP) provides:
- **Queryable Storage**: Structured data storage for analytics
- **Real-time Access**: Fast data retrieval and updates
- **Privacy Controls**: Secure data management
- **Analytics**: Built-in analytics and reporting

#### 4.2.2 Implementation

**CDP Configuration:**
```typescript
// lib/cdp-config.ts
export const CDP_CONFIG = {
  apiKeyId: process.env.CDP_API_KEY_ID,
  apiKeySecret: process.env.CDP_API_KEY_SECRET,
  walletSecret: process.env.CDP_WALLET_SECRET,
  collection: 'session_attestations'
};
```

**Data Service:**
```typescript
// lib/cdp-data-service.ts
export class CDPDataService {
  private client: CDPClient;

  constructor() {
    this.client = new CDPClient({
      apiKeyId: CDP_CONFIG.apiKeyId,
      apiKeySecret: CDP_CONFIG.apiKeySecret,
      walletSecret: CDP_CONFIG.walletSecret
    });
  }

  async storeAttestation(data: AttestationData): Promise<void> {
    await this.client.collections.insert(CDP_CONFIG.collection, {
      attestationUid: data.attestationUid,
      sessionCompleted: data.sessionCompleted,
      sessionDate: data.sessionDate,
      therapistId: data.therapistId,
      patientHash: data.patientHash,
      sessionDuration: data.sessionDuration,
      sessionType: data.sessionType,
      createdAt: new Date().toISOString(),
      network: process.env.NEXT_PUBLIC_NETWORK
    });
  }

  async getAttestations(filters?: AttestationFilters): Promise<AttestationData[]> {
    let query = `SELECT * FROM ${CDP_CONFIG.collection}`;
    
    if (filters?.therapistId) {
      query += ` WHERE therapistId = '${filters.therapistId}'`;
    }
    
    if (filters?.uid) {
      query += ` WHERE attestationUid = '${filters.uid}'`;
    }

    const result = await this.client.collections.query(query);
    return result.rows;
  }
}
```

#### 4.2.3 Dual Storage Strategy

**Blockchain + CDP Architecture:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │───▶│  EAS Blockchain │───▶│  CDP Database   │
│                 │    │   (Immutable)   │    │  (Queryable)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
    Form Data              Attestation UID          Analytics Data
    Validation             On-chain Proof           Queryable Records
```

**Benefits:**
- **Immutable Proof**: EAS provides unchangeable attestations
- **Queryable Data**: CDP enables analytics and reporting
- **Privacy Protection**: Both systems maintain anonymity
- **Redundancy**: Dual storage ensures data availability

### 4.3 ENS (Ethereum Name Service) Integration

#### 4.3.1 ENS Architecture

**Contract Addresses:**
```typescript
// lib/ens-config.ts
export const ENS_CONFIG = {
  registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  publicResolver: '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63',
  reverseRegistrar: '0x084b1c3C81545d370f3634392De611CaaBFf8148',
  parentDomain: 'rehabdao.eth'
};
```

**Subdomain Management:**
```typescript
// components/ens-subdomain-assigner.tsx
export function AssignSubdomain({ parentDomain, isManager }: Props) {
  const [subdomain, setSubdomain] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignment = async () => {
    setIsLoading(true);
    try {
      // Validate subdomain format
      if (!isValidSubdomain(subdomain)) {
        throw new Error('Invalid subdomain format');
      }

      // Check if subdomain is available
      const isAvailable = await checkSubdomainAvailability(subdomain);
      if (!isAvailable) {
        throw new Error('Subdomain already exists');
      }

      // Create subdomain on ENS
      const tx = await ensRegistry.setSubnodeOwner(
        namehash(parentDomain),
        labelhash(subdomain),
        userAddress
      );

      await tx.wait();
      
      // Update UI
      setSubdomain('');
      setUserAddress('');
      toast.success('Subdomain assigned successfully!');
    } catch (error) {
      toast.error(`Assignment failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
}
```

#### 4.3.2 ENS Workflow

1. **Manager Authentication**: Manager connects wallet to Ethereum Mainnet
2. **Subdomain Validation**: System validates subdomain format and availability
3. **On-chain Creation**: ENS registry creates subdomain ownership
4. **User Notification**: User receives subdomain assignment
5. **Primary Name Setup**: User sets subdomain as primary ENS name

**Validation Functions:**
```typescript
// lib/ens-config.ts
export function isValidSubdomain(subdomain: string): boolean {
  const pattern = /^[a-z0-9-]{3,63}$/;
  return pattern.test(subdomain) && !subdomain.startsWith('-') && !subdomain.endsWith('-');
}

export function namehash(name: string): string {
  const labels = name.split('.');
  let node = '0x0000000000000000000000000000000000000000000000000000000000000000';
  
  for (let i = labels.length - 1; i >= 0; i--) {
    const labelHash = ethers.keccak256(ethers.toUtf8Bytes(labels[i]));
    node = ethers.keccak256(ethers.concat([
      node,
      labelHash
    ]));
  }
  
  return node;
}

export function labelhash(label: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(label));
}
```

### 4.4 Wallet Integration

#### 4.4.1 Multi-Wallet Support

**Wagmi Configuration:**
```typescript
// lib/wagmi-config.ts
import { createConfig, configureChains } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
```

**Wallet Connection:**
```typescript
// components/WalletConnection.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <span>Connected to {address}</span>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}
```

#### 4.4.2 Network Management

**Network Switching:**
```typescript
// lib/network-config.ts
export const SUPPORTED_NETWORKS = {
  mainnet: {
    id: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: process.env.NEXT_PUBLIC_MAINNET_RPC,
    ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC,
    ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  }
};

export function switchNetwork(chainId: number) {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  }
}
```

---

## Chapter 5: Development, Deployment & Maintenance

### 5.1 Development Environment Setup

#### 5.1.1 Prerequisites

**Required Software:**
- **Node.js**: Version 18+ (LTS recommended)
- **npm/pnpm**: Package manager
- **Git**: Version control
- **Code Editor**: VS Code with TypeScript support

**Environment Setup:**
```bash
# Clone repository
git clone https://github.com/Dasika-Vaishnavi/Rehab-DAO.git
cd Rehab-DAO

# Install dependencies
npm install
# or
pnpm install

# Create environment file
cp .env.example .env.local
```

#### 5.1.2 Environment Configuration

**Required Environment Variables:**
```bash
# .env.local
# EAS Configuration
NEXT_PUBLIC_QUICKNODE_ENDPOINT=https://your-sepolia-endpoint
WALLET_PRIVATE_KEY=your-wallet-private-key-with-ETH
EAS_SCHEMA_UID=your-attestation-schema-uid
NEXT_PUBLIC_NETWORK=sepolia

# CDP Configuration
CDP_API_KEY_ID=7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0
CDP_API_KEY_SECRET=7TeCbYqm+SIph1O+SAnueim/JsOeRQ2w/ySSVA8fO1khlBHwnWQATH3AVLdRgUkzF5eonl02JbwjO2gMYkLMdQ==
CDP_WALLET_SECRET=your_wallet_secret_here

# Optional: WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

#### 5.1.3 Development Commands

**Available Scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Development Workflow:**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### 5.2 Code Quality & Standards

#### 5.2.1 TypeScript Configuration

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### 5.2.2 ESLint Configuration

**Linting Rules:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

#### 5.2.3 Code Organization

**Directory Structure:**
```
Rehab-DAO/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── attestations/      # Attestation pages
│   ├── community/         # Community features
│   ├── dashboard/         # User dashboards
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── *.tsx            # Feature components
├── lib/                  # Utility libraries
├── public/              # Static assets
└── styles/              # Global styles
```

### 5.3 Testing Strategy

#### 5.3.1 Testing Framework

**Recommended Testing Stack:**
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **MSW**: API mocking

**Test Configuration:**
```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "moduleNameMapping": {
      "^@/(.*)$": "<rootDir>/$1"
    }
  }
}
```

#### 5.3.2 Testing Examples

**Component Testing:**
```typescript
// __tests__/components/SessionAttestationForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionAttestationForm } from '@/components/session-attestation-form';

describe('SessionAttestationForm', () => {
  it('should validate required fields', async () => {
    render(<SessionAttestationForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/therapist info is required/i)).toBeInTheDocument();
  });
});
```

**API Testing:**
```typescript
// __tests__/api/attestations.test.ts
import { createAttestation } from '@/lib/eas';

describe('Attestation API', () => {
  it('should create attestation with valid data', async () => {
    const mockData = {
      sessionCompleted: true,
      sessionDate: '2024-01-15',
      therapistInfo: 'test-therapist',
      patientInfo: 'test-patient',
      sessionDuration: 60,
      sessionType: 'individual'
    };

    const result = await createAttestation(mockData);
    expect(result).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });
});
```

### 5.4 Deployment Strategy

#### 5.4.1 Production Environment

**Recommended Platforms:**
- **Vercel**: Next.js optimized hosting
- **Netlify**: Alternative hosting platform
- **AWS**: Enterprise-grade hosting

**Vercel Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### 5.4.2 Environment Management

**Production Environment Variables:**
```bash
# Production .env
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_QUICKNODE_ENDPOINT=https://mainnet-endpoint
WALLET_PRIVATE_KEY=production-wallet-key
EAS_SCHEMA_UID=mainnet-schema-uid
CDP_API_KEY_ID=production-cdp-key
CDP_API_KEY_SECRET=production-cdp-secret
```

#### 5.4.3 CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 5.5 Monitoring & Maintenance

#### 5.5.1 Performance Monitoring

**Key Metrics:**
- **Page Load Times**: Core Web Vitals
- **API Response Times**: Backend performance
- **Error Rates**: Application stability
- **User Engagement**: Feature usage

**Monitoring Tools:**
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Google Analytics**: User behavior tracking

#### 5.5.2 Error Handling

**Global Error Boundary:**
```typescript
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Send to error reporting service
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### 5.5.3 Logging Strategy

**Structured Logging:**
```typescript
// lib/logger.ts
export class Logger {
  static info(message: string, data?: any) {
    console.log(`[INFO] ${message}`, data);
  }

  static error(message: string, error?: Error) {
    console.error(`[ERROR] ${message}`, error);
    // Send to error reporting service
  }

  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data);
  }
}
```

### 5.6 Security Best Practices

#### 5.6.1 Environment Security

**Secrets Management:**
- **Environment Variables**: All secrets stored in environment variables
- **No Hardcoding**: Never commit secrets to version control
- **Rotation**: Regular secret rotation
- **Access Control**: Limited access to production secrets

#### 5.6.2 Input Validation

**Comprehensive Validation:**
```typescript
// lib/validation.ts
import { z } from 'zod';

export const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().min(18).max(120)
});

export function validateUserInput(data: unknown) {
  return userInputSchema.parse(data);
}
```

#### 5.6.3 Blockchain Security

**Transaction Safety:**
- **Gas Estimation**: Always estimate gas before transactions
- **Network Validation**: Verify correct network before operations
- **Error Handling**: Comprehensive error handling for blockchain operations
- **Confirmation Waiting**: Wait for transaction confirmations

### 5.7 Documentation Maintenance

#### 5.7.1 Documentation Standards

**Documentation Requirements:**
- **Code Comments**: Inline documentation for complex logic
- **API Documentation**: OpenAPI/Swagger for API endpoints
- **Component Documentation**: Storybook for UI components
- **Architecture Documentation**: System design documents

#### 5.7.2 Update Process

**Documentation Workflow:**
1. **Code Changes**: Update code and documentation together
2. **Review Process**: Documentation reviewed with code changes
3. **Version Control**: Documentation versioned with code
4. **Regular Updates**: Quarterly documentation reviews

---

## Conclusion

This technical documentation provides a comprehensive overview of the Rehab DAO project, covering all aspects from architecture and technology stack to development practices and maintenance procedures. The platform represents a sophisticated integration of modern web technologies with blockchain infrastructure, creating a privacy-focused solution for addiction recovery support.

### Key Achievements

1. **Privacy-First Design**: Zero PII storage with anonymous attestations
2. **Blockchain Integration**: EAS and ENS for verifiable records
3. **Modern Architecture**: Next.js 15 with TypeScript and Tailwind CSS
4. **Comprehensive Testing**: Multi-layer testing strategy
5. **Production Ready**: CI/CD pipeline and monitoring

### Future Enhancements

1. **Mobile Application**: Native mobile app development
2. **Advanced Analytics**: Machine learning insights
3. **Integration APIs**: Third-party service integrations
4. **Community Features**: Enhanced social features
5. **Governance**: DAO governance mechanisms

The Rehab DAO platform demonstrates the potential of blockchain technology to create meaningful, privacy-preserving solutions for sensitive healthcare applications while maintaining the highest standards of security and user experience.
