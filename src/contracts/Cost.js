import Artifacts from './Artifacts.json'; 
import { getWeb3, getAccount } from '../eth/network.js'; 


export default function Cost(web3, address, options = {}) { 
//    const name = "contracts/trip_cost.sol:Cost"; 
  //  const artifact = Artifacts.contracts[name]; 
    //const abi = JSON.parse(artifact.abi); 
    return new web3.eth.Contract(Artifacts.abi, address, options); 
}


export async function getDeployed() { 
    const web3 = getWeb3(); 
    const from = await getAccount(); 
    const addr = "0x303849bFdF98690933B8728Aa74AC37C8aD60Cb5";
    return Cost(web3, addr, { from }); 
}