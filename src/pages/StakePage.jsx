import useContract from "@/utils/hooks/useContract";
import { useRef, useState, useEffect } from "react";
import { waitForTransaction, fetchTransaction } from "@wagmi/core";
import { useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

function StakePage() {
	const { stakeWrite, approvalWrite, allowanceAmount } = useContract();
	const formRef = useRef(null);
	const { address } = useAccount();

	const stake = async (data) => {
		data.preventDefault();
        const { value } = data.currentTarget[0];
        const amountToSend = parseEther(value);
		const allowance = formatEther(allowanceAmount);
		try {
			console.log(formatEther(allowanceAmount));
			console.log(value);

			if (Number(value) > Number(allowance)) {
				const { hash: approvalHash } = await approvalWrite({
					args: [VITE_STRU_STAKING_CONTRACT, amountToSend],
				});
				const { status: approvalStatus } = await waitForTransaction({
					hash: approvalHash,
				});
				console.log(approvalStatus);

				if (approvalStatus === "success") {
					const { hash: transactionHash } = await stakeWrite({
						args: [amountToSend],
					});
					const transactionData = await waitForTransaction({
						hash: transactionHash,
					});
					console.log(transactionData);
				}
			} else {
				const { hash: transactionHash } = await stakeWrite({
					args: [amountToSend],
				});
				const transactionData = await waitForTransaction({
					hash: transactionHash,
				});
				console.log(transactionData);
			}

			formRef.current.reset();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div>Stake Page</div>
			<form onSubmit={stake} ref={formRef}>
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
