import { ethers } from 'ethers';
import { erc20, stakingField } from '../../data/ethContractTypes';

// Create provider
//TODO: potentially add default provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

//TODO: re-document
/**
 * @func createContract creates an instance of a new ethers contract interface
 * @param {address} contract address 
 * @param {type} contract type determines abi
 * @returns {object} new contract interface
 */
function createContracts (collection, type) {
  const collectionWithContracts = [];
  
  let abi;
  switch (type) {
    case 'erc20': 
      abi = erc20;
      break;
    
    case 'field':
      abi = stakingField;
      break;

    default: abi = erc20;
    }

  collection.forEach(entry => {
    const { address } = entry;
    const newContract = new ethers.Contract(address, abi, provider);
    entry.contract = newContract;
    collectionWithContracts.push(entry)
  })

  return collectionWithContracts;
}

//TODO: update documentation
/**
 * @func getBalance retrieves balance of an ethereum account's tokens and stakes
 * @param {account} user account for which balance is requested
 * @param {contract} token contract (optional - defaults to Eth)
 * @returns {string} account balance
 */
async function getUserBalance (account, contract) {
  if (!contract) {
    const balance = await provider.getBalance(account);
    return Number(ethers.utils.formatEther(balance));
  } else {
    let decimals;
    if (contract.decimals) decimals = await contract.decimals();
    const balance = await contract.balanceOf(account);
    //TODO: check farming contract decimals?
    return Number(ethers.utils.formatUnits(balance, decimals || 18));
    }
  }

export {
  createContracts,
  getUserBalance,
}