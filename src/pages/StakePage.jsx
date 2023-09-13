import useContract from "@/utils/hooks/useContract";
import { useRef } from "react";
import { parseEther } from "viem";

function StakePage() {
	const { stake, withdraw, claimReward } = useContract();
	const formRef = useRef(null);

	const handleSubmit = async (data) => {
		data.preventDefault();
		const { value } = data.currentTarget[0];
		await stake(value);

		// const amount = parseEther("1");
		// const response = await withdraw({ args: [amount] });
		// console.log(response);

        // const claimRewardsData = await claimReward();
        // console.log(claimRewardsData);

		formRef.current.reset();
	};

	return (
		<>
			<div>Stake Page</div>
			<form onSubmit={handleSubmit} ref={formRef}>
				<input
					type="number"
					name="number"
					// onChange={(e) => setAmount(e.target.value)}
					// value={amount}
				/>
				<button type="submit">
					{/* {isLoading ? "Staking..." : "Stake"} */}
					stake
				</button>
				{/* {isSuccess && (
					<div>
						Successfully staked!
					</div>
				)} */}
			</form>
		</>
	);
}

export default StakePage;
