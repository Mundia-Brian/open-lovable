// lib/sandbox-client.ts
import { SandboxFactory } from './sandbox/factory';
import { SandboxProvider } from './sandbox/types';

type SandboxClient = {
  createSandbox?: (...args: any[]) => Promise<any>;
  zipProject?: (...args: any[]) => Promise<any>;
  provider?: SandboxProvider;
  isOffline: boolean;
};

const PRIMARY_KEY = process.env.PRIMARY_SANDBOX_API_KEY;
const E2B_KEY = process.env.E2B_API_KEY;
const API_KEY = PRIMARY_KEY || E2B_KEY || '';

function makeOfflineClient(): SandboxClient {
  return {
    isOffline: true,
    async createSandbox() {
      throw new Error('Sandbox unavailable: no sandbox API key is configured (PRIMARY_SANDBOX_API_KEY or E2B_API_KEY).');
    },
    async zipProject() {
      throw new Error('Sandbox unavailable: no sandbox API key is configured (PRIMARY_SANDBOX_API_KEY or E2B_API_KEY).');
    }
  };
}

let client: SandboxClient;

if (!API_KEY) {
  client = makeOfflineClient();
} else {
  try {
    const provider = SandboxFactory.create('e2b', {
      e2b: {
        apiKey: API_KEY
      }
    });
    
    client = {
      isOffline: false,
      provider,
      async createSandbox(opts?: any) {
        return await provider.createSandbox();
      },
      async zipProject(opts?: any) {
        // Implementation for zip project functionality
        throw new Error('zipProject not yet implemented');
      }
    };
  } catch (error) {
    console.error('Failed to initialize sandbox provider:', error);
    client = makeOfflineClient();
  }
}

export default client;