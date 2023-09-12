import useContract from "@/utils/hooks/useContract";
import { useRef, useState, useEffect } from "react";
import { waitForTransaction } from "@wagmi/core";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

function StakePage() {
	const { stakeWrite, approvalWrite } = useContract();
	const formRef = useRef(null);

	const stake = async (data) => {
		data.preventDefault();
		const { value } = data.currentTarget[0];

		try {
			const { hash: approvalHash } = await approvalWrite({
				args: [VITE_STRU_STAKING_CONTRACT, value],
			});

			const { status } = await waitForTransaction({
				hash: approvalHash,
			});
			console.log(data);
			if (status === "success") {
				const { hash: transactionHash } = await stakeWrite({ args: [value] });
				const data = await waitForTransaction({
					hash: transactionHash,
				});
				console.log(data);
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
