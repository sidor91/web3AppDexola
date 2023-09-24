import { useAccount, useBalance } from "wagmi";
import { useState, useMemo } from "react";
const { VITE_STRU_TOKEN } = import.meta.env;

function useAccountAndBalance() {
	const [addressToShow, setAddressToShow] = useState("");

	const { address, isConnected } = useAccount({
		onConnect({ address }) {
			setAddressToShow(address.slice(0, 16));
		},
	});

	const { data: struData } = useBalance({
		address,
		token: VITE_STRU_TOKEN,
		watch: true,
	});

	const struBalance = useMemo(() => struData && Number(struData.formatted).toFixed(2), [struData]);

	const { data: sepoliaData} = useBalance({
		address,
		watch: true,
	});

	const sepoliaBalance = useMemo(
		() => sepoliaData && Number(sepoliaData.formatted).toFixed(2),
		[sepoliaData]
	);

	return { addressToShow, struBalance, sepoliaBalance, isConnected, address };
}

export default useAccountAndBalance;
