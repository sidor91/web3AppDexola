import {
	Section,
	Container,
	SubContainer,
	TitleContainer,
	Title,
	RewardRateContainer,
	Text,
	RateValue,
	RateUnits,
} from "./OperationsSection.styled";
import NotAuthorizedSection from "@/components/NotAuthorizedSection/NotAuthorizedSection";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Form from "@/components/Form/Form";
import useContractReadData from "@/utils/hooks/useContractReadData";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";

function OperationsSection() {
	const [title, setTitle] = useState("");
	const { pathname } = useLocation();
	const { REWARDRATE, setAmountToStake } = useContractReadData();
	const { isConnected } = useAccountAndBalance();

	useEffect(() => {
		switch (pathname) {
			case "/stake":
				setTitle("Stake");
				break;
			case "/withdraw":
				setTitle("Withdraw");
				break;
			case "/rewards":
				setTitle("Rewards");
		}
	}, [pathname]);

	return (
		<Section>
			<Container>
				<SubContainer>
					{isConnected ? (
						<>
							<TitleContainer>
								<Title>{title}</Title>
								{pathname === "/stake" && (
									<RewardRateContainer>
										<Text>{"Reward rate:"}</Text>
										<RateValue>{REWARDRATE || 0}</RateValue>
										<RateUnits>{"STRU/week"}</RateUnits>
									</RewardRateContainer>
								)}
							</TitleContainer>
							<Form setAmountToStake={setAmountToStake} />
						</>
					) : (
						<NotAuthorizedSection />
					)}
				</SubContainer>
			</Container>
		</Section>
	);
}

export default OperationsSection;
