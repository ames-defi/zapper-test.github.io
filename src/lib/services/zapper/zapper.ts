import { BigNumber, ethers } from 'ethers';
import { Web3Service } from '../web3.service';
import {
  DFK_ROUTER_HARMONY,
  ZAP_CONTRACT_MAINNET_ADDRESS,
} from '../../../app/data/contracts';
import { ZAPPER_ABI } from './zapper-abi';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Zapper {
  public readonly contract: ethers.Contract;
  private routerAddress: string;

  private _zapComplete = new Subject<boolean>();
  get zapComplete() {
    return this._zapComplete.asObservable();
  }

  constructor(private readonly web3Service: Web3Service) {
    this.routerAddress = DFK_ROUTER_HARMONY;
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

  async zapInWithPath(
    tokenIn: string,
    pairAddress: string,
    amount: BigNumber,
    path: string[]
  ) {
    try {
      const tx = await this.contract.zapInWithPath(
        tokenIn,
        pairAddress,
        amount,
        this.routerAddress,
        path
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

  setRouter(routerAddress: string) {
    this.routerAddress = routerAddress;
  }
}
