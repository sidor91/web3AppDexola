import { useState, useEffect } from "react";
import {
	StyledTable,
	Tbody,
	TR,
	TD,
	Caption,
	Value,
	Units,
	ValueTitle,
	Icon,
} from "./Table.styled";
import helpIcon from "@/assets/helpIcon.svg";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions";
import useContract from "@/utils/hooks/useContract";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";

function Table() {
	const [balance, setBalance] = useState(0);
	const [rewardsValue, setRewardsValue] = useState(0);
	const dimensions = useWindowDimensions();
	const { stakingBalance, APR, DAYS, rewards } = useContract();
	const { isConnected } = useAccountAndBalance();
		
		useEffect(() => {
	if (isConnected) {
		setBalance(stakingBalance);
		setRewardsValue(rewards);
	} else {
		setBalance(0);
		setRewardsValue(0);
	}
}, [isConnected, stakingBalance, rewards]);

	return (
		<StyledTable>
			<Caption>The contents of the table are located below:</Caption>
			<Tbody>
				<TR>
					<TD aria-label="Staked balance">
						<Value>{balance}</Value>
						<Units>STRU</Units>
						<Icon src={helpIcon} />
					</TD>
					<TD aria-label="APR">
						<Value>≈{APR}%</Value>
						<Icon
							src={helpIcon}
							style={dimensions >= 1440 ? { marginRight: 18 } : {}}
						/>
					</TD>
					<TD aria-label="Days">
						<Value>{DAYS}</Value>
					</TD>
					<TD aria-label="Rewards">
						<Value>{rewardsValue}</Value>
						<Units>STRU</Units>
						<Icon src={helpIcon} />
					</TD>
				</TR>
				{dimensions <= 1440 && (
					<TR aria-label="Table contents">
						<TD aria-label="table head">
							<ValueTitle> Staked balance</ValueTitle>
						</TD>
						<TD aria-label="table head">
							<ValueTitle>APR</ValueTitle>
						</TD>
						<TD aria-label="table head">
							<ValueTitle>Days</ValueTitle>
						</TD>
						<TD aria-label="table head">
							<ValueTitle>Rewards</ValueTitle>
						</TD>
					</TR>
				)}
			</Tbody>
		</StyledTable>
	);
}

export default Table;
