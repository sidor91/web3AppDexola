import { useAccount, useBalance } from "wagmi";
import { useState, useEffect } from "react";
const { VITE_STRU_TOKEN } = import.meta.env;

function useAccountAndBalance() {
	const [struBalance, setStruBalance] = useState(0);
	const [sepoliaBalance, setSepoliaBalance] = useState(0);
	const [addressToShow, setAddressToShow] = useState('');
	
	const { isConnected, address  } = useAccount({
		onConnect({address}) {
			setAddressToShow(address.slice(0, 16));
		},
	});

	useBalance({
		address,
		token: VITE_STRU_TOKEN,
		watch: true,
		onSuccess(data) {
			setStruBalance(Number(data.formatted).toFixed(0));
		},
	});

	useBalance({
		address,
		watch: true,
		onSuccess(data) {
			setSepoliaBalance(Number(data.formatted).toFixed(1));
		},
	});

	return { addressToShow, struBalance, sepoliaBalance, isConnected };
}

export default useAccountAndBalance;
