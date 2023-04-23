import Web3 from 'web3';
import PostcardABI from './PostcardABI.json';

const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with the deployed contract address
const web3 = new Web3(Web3.givenProvider);

const postcardContract = new web3.eth.Contract(PostcardABI, CONTRACT_ADDRESS);

export default postcardContract;
