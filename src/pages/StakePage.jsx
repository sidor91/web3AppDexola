import useContract from "@/utils/hooks/useContract";
import { useRef, useState, useEffect } from "react";
import { waitForTransaction, fetchTransaction } from "@wagmi/core";
import { parseEther, formatEther } from "viem";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

function StakePage() {
	const { stakeWrite, approvalWrite, allowanceAmount, stake } = useContract();
	const formRef = useRef(null);

	const handleSubmit = async (data) => {
		data.preventDefault();
		const { value } = data.currentTarget[0];
        await stake(value);
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
