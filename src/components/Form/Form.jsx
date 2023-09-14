// import useContract from "@/utils/hooks/useContract";
import OperationsSection from "@/components/OperationsSection/OperationsSection";

function StakePage() {
	// const { stake, withdraw, claimReward } = useContract();
	// const formRef = useRef(null);

	// const handleSubmit = async (data) => {
	// 	data.preventDefault();
	// 	const { value } = data.currentTarget[0];
	// 	await stake(value);

	// 	// const amount = parseEther("1");
	// 	// const response = await withdraw({ args: [amount] });
	// 	// console.log(response);

	//     // const claimRewardsData = await claimReward();
	//     // console.log(claimRewardsData);

	// 	formRef.current.reset();
	// };

	return (
		<>
			<div>Stake Page</div>
			<OperationsSection></OperationsSection>
		</>
	);
}

export default StakePage;
