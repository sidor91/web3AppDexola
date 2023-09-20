import { Oval } from "react-loader-spinner";
import errorIcon from "@/assets/errorIcon.svg";
import successIcon from "@/assets/successIcon.svg";
import {
	useStake,
	useWithdraw,
	useClaimReward,
} from "@/utils/hooks/contractHooks";

function TransactionStatusHandler({ transaction, amount }) {
const { isLoading, isTransactionError, isTransactionSuccess } =
	useStake();

    return (
			<Oval
				height={32}
				width={32}
				color="#20FE51"
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="#6E758B"
				strokeWidth={6}
				strokeWidthSecondary={6}
			/>
		);
}

export default TransactionStatusHandler;