import { useAccount, useBalance } from "wagmi";
const { VITE_STRU_TOKEN } = import.meta.env;

function useAccountAndBalance() {
    const { address, isConnected } = useAccount();
		const addressToShow = address?.slice(0, 16);

		const { data: struData } = useBalance({
			address,
			token: VITE_STRU_TOKEN,
		});
		const struBalance = struData?.formatted;

		const { data: sepoliaData } = useBalance({
			address,
		});
    const sepoliaBalance = Number(sepoliaData?.formatted).toFixed(1);
    
    return { addressToShow, struBalance, sepoliaBalance, isConnected };
    
}

export default useAccountAndBalance;