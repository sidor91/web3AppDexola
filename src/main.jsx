import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { VITE_ALCHEMY_API_KEY } = import.meta.env;

const connector = new MetaMaskConnector({
	chains: [sepolia],
});

const { publicClient, webSocketPublicClient } = configureChains(
	[sepolia],
	[alchemyProvider({ apiKey: VITE_ALCHEMY_API_KEY })]
);

const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: [connector],
});



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WagmiConfig config={config}>
			<App />
		</WagmiConfig>
	</React.StrictMode>
);
