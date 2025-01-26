import Web3 from 'web3';
import dotenv from 'dotenv';
import managerAbi from '../models/abi/smartContractManagerABI';

dotenv.config();

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ethereum-sepolia-rpc.publicnode.com")); // Adjust to your local chain's WebSocket port

// Instantiate contract
const contractManagerAddress = process.env.CONTRACT_MANAGER;
if (!contractManagerAddress) {
  throw new Error("CONTRACT_MANAGER environment variable is not defined");
}
console.log("Connecting to contract manager at", contractManagerAddress);
const manager = new web3.eth.Contract(managerAbi, contractManagerAddress);

console.log("Connected to contract manager at", contractManagerAddress);



export default manager;
