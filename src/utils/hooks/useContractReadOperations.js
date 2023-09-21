import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { useContractRead } from "wagmi";
import { contract } from "@/contracts/contracts.js";

export const useContractReadOperations = () => {
	const { address, isConnected } = useAccountAndBalance();

	const { data: balanceData } = useContractRead({
		...contract,
		functionName: "balanceOf",
		args: [address],
		watch: true,
		enabled: isConnected,
	});

	const { data: rewardRateMethodData } = useContractRead({
		...contract,
		functionName: "rewardRate",
		watch: true,
	});

	const { data: rewardForDurationData } = useContractRead({
		...contract,
		functionName: "getRewardForDuration",
		watch: true,
	});

	const { data: totalSupplyData } = useContractRead({
		...contract,
		functionName: "totalSupply",
		watch: true,
	});

	const { data: daysData } = useContractRead({
		...contract,
		functionName: "periodFinish",
		watch: true,
	});

	const { data: rewardsData } = useContractRead({
		...contract,
		functionName: "earned",
		args: [address],
		watch: true,
		enabled: isConnected,
	});

	return {
		balanceData,
		daysData,
		rewardsData,
		rewardRateMethodData,
		rewardForDurationData,
		totalSupplyData,
	};
};
