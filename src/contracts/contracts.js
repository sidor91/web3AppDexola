import STRUContractAbi from "@/contracts/contractABI";
import STRUTokenAbi from "@/contracts/tokenABI";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

export const contract = {
	address: VITE_STRU_STAKING_CONTRACT,
	abi: STRUContractAbi,
};

export const token = {
	address: VITE_STRU_TOKEN,
	abi: STRUTokenAbi,
};