import Web3 from 'web3';
import dotenv from 'dotenv'

dotenv.config()

const web3 = new Web3(process.env.LOCAL_HOST_PROVIDER || "http://localhost:8545");

export default web3;