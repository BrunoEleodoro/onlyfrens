import { ApolloProvider } from '@apollo/client';
import { LensConfig, LensProvider, production } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { client } from './ApolloClient.tsx';
import App from './App.tsx';
import './index.css';

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

const chains = [arbitrum, mainnet, polygon];
const projectId = '94427dc22ec393294e83d939714ad309';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <LensProvider config={lensConfig}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </LensProvider>
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </React.StrictMode>
);
