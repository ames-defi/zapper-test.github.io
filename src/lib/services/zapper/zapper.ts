import { BigNumber, ethers } from 'ethers';
import { Web3Service } from '../web3.service';
import { ZAP_CONTRACT_MAINNET_ADDRESS } from '../../../app/data/contracts';
import { ZAPPER_ABI } from './zapper-abi';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';

export class Zapper {
  public readonly contract: ethers.Contract;

  constructor(
    private readonly web3Service: Web3Service,
    private routerAddress: string
  ) {
    this.contract = new ethers.Contract(
      ZAP_CONTRACT_MAINNET_ADDRESS,
      ZAPPER_ABI,
      this.web3Service.web3Info.signer
    );
  }

  async zapIn(tokenIn: string, pairAddress: string, amount: BigNumber) {
    try {
      const tx = await this.contract.zapIn(
        tokenIn,
        pairAddress,
        amount,
        this.routerAddress
      );

      console.log(tx);
      await awaitTransactionComplete(tx);
    } catch (error) {
      console.log(error);
    }
  }

  async zapOut(pairAddress: string, tokenOut: string, amount: BigNumber) {
    try {
      const tx = await this.contract.zapOut(
        pairAddress,
        tokenOut,
        this.routerAddress,
        amount
      );

      console.log(tx);
      await awaitTransactionComplete(tx);
    } catch (error) {
      console.log(error);
    }
  }
}
