import Web3 from 'web3';
import dotenv from 'dotenv';
import managerAbi from '../models/abi/smartContractManagerABI';

dotenv.config();

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ethereum-sepolia-rpc.publicnode.com")); // Adjust to your local chain's WebSocket port

// Instantiate contract
console.log("Connecting to contract manager at", process.env.CONTRACT_MANAGER);
const manager = new web3.eth.Contract(managerAbi, process.env.CONTRACT_MANAGER);



export default manager;
