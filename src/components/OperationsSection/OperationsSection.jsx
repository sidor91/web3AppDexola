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
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from '@/components/Form/Form';
import { useContractReadOperations } from "@/utils/hooks/useContract";

function OperationsSection() {
	const [title, setTitle] = useState("");
    const { pathname } = useLocation();
    const { REWARDRATE } = useContractReadOperations();

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
					<TitleContainer>
						<Title>{title}</Title>
						{pathname === "/stake" && (
							<RewardRateContainer>
								<Text>{'Reward rate:'}</Text>
								<RateValue>{REWARDRATE}</RateValue>
								<RateUnits>{"STRU/week"}</RateUnits>
							</RewardRateContainer>
						)}
					</TitleContainer>
					<Form/>
				</SubContainer>
			</Container>
		</Section>
	);
}

export default OperationsSection;
