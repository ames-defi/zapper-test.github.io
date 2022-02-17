import {
  BigNumber,
  ContractReceipt,
  ContractTransaction,
  ethers,
} from 'ethers';
import { ChainBaseConfig } from '../types/chain.types';

export interface Web3AppInfo {
  signer: ethers.providers.JsonRpcSigner;
  provider: ethers.providers.JsonRpcProvider;
  chainId: number;
  currentChain?: ChainBaseConfig;
  userAddress?: string;
  wallet?: ethers.Wallet;
}

export const MY_METAMASK_ADDRESS = '0x2e86D29cFea7c4f422f7fCCF97986bbBa03e1a7F';
export const MY_TREZOR_ADDRESS = '0x3fF07607c5C8C619C69b1fd4C08aebF069AA10c7';

export async function getWeb3(
  address: string,
  rpcURL: string,
  websockets = false
): Promise<Web3AppInfo> {
  let provider = new ethers.providers.JsonRpcProvider(rpcURL);
  if (websockets) {
    provider = new ethers.providers.WebSocketProvider(rpcURL);
  } else {
    provider = new ethers.providers.JsonRpcProvider(rpcURL);
  }
  const signer = provider.getSigner(address);
  const chainId = await signer.getChainId();
  return {
    provider,
    signer,
    chainId,
  };
}

export async function awaitTransactionComplete(
  txResponse: ContractTransaction,
  confirmations = 1
): Promise<ContractReceipt> {
  try {
    console.log(`- Starting transaction: ${txResponse.hash}`);
    console.log(
      `- Awaiting transaction receipt... - ` + new Date().toLocaleString()
    );
    const txReceipt = await txResponse.wait(confirmations);
    console.log(
      '- TransactionReceipt received - ' + new Date().toLocaleString()
    );
    if (txReceipt.status === 1) {
      // success
      console.log(`Transaction successful`);
    }
    return txReceipt;
  } catch (error) {
    throw error; // Throw and try to let this be handled back in the call stack as needed
  }
}

export async function giveContactApproval(
  tokenToContract: ethers.Contract,
  spender: string,
  amount: BigNumber,
  watchAddress: string
) {
  console.log('Awaiting approval..');
  return new Promise((resolve, reject) => {
    const callback = (approver, approved, amount) => {
      try {
        if (approver == watchAddress) {
          console.log('Approval received!');
          // Clean up reference
          tokenToContract.off('Approval', callback);
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    };

    tokenToContract.on('Approval', callback);
    tokenToContract.approve(spender, amount);
  });
}
