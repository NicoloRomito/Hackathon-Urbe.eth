import Web3 from 'web3';
import dotenv from 'dotenv'
import managerAbi from '../models/abi/smartContractManagerABI';

dotenv.config()

const web3 = new Web3("http://localhost:8545");

// instantiate contract
const manager = new web3.eth.Contract(managerAbi, process.env.CONTRACT_ADDRESS);

const nftCreated = manager.events.NFTCreated();

nftCreated.on('data', (event) => {
    console.log(event);
});

export default web3;