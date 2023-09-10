import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { sepolia } from "wagmi/chains";

const { VITE_ALCHEMY_API_KEY, VITE_WEB3MODAL_PROJECT_ID } = import.meta.env;
const chains = [sepolia, mainnet];
const projectId = VITE_WEB3MODAL_PROJECT_ID;

const { publicClient, webSocketPublicClient } = configureChains(chains, [
	alchemyProvider({ apiKey: VITE_ALCHEMY_API_KEY }),
	w3mProvider({ projectId }),
]);

const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
	connectors: w3mConnectors({ projectId, chains }),
});
const ethereumClient = new EthereumClient(config, chains);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WagmiConfig config={config}>
			<App />
		</WagmiConfig>
		<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
	</React.StrictMode>
);
