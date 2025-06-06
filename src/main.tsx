import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import {
  mainnet,
  base,
  polygon,
  arbitrum,
} from 'viem/chains';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <PrivyProvider
      appId='cmb7vo2mr000oji0n8msvkwth'
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#6366f1',
          logo: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/055c25d6-7fe7-4a49-abf9-49772021cf00/original',
          landingHeader: 'Farcaster Demo',
          loginMessage:
            'Connect your wallet or sign in with email to get started!',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        supportedChains: [
          mainnet,
          base,
          polygon,
          arbitrum,
        ],
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
