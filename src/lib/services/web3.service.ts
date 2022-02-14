import { BehaviorSubject, Subject } from 'rxjs';
import { Web3AppInfo } from 'src/lib/utils/web3-utils';
import { ethers } from 'ethers';
import { Injectable } from '@angular/core';
import { ChainService } from './chain/chain.service';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({ providedIn: 'root' })
export class Web3Service {
  get connected(): boolean {
    return this._web3.value !== null;
  }

  private _ready = new BehaviorSubject<boolean>(false);
  get ready() {
    return this._ready.asObservable();
  }

  private _web3 = new BehaviorSubject<Web3AppInfo>(null);
  get web3() {
    return this._web3.asObservable();
  }

  get web3Info() {
    return {
      ...this._web3.value,
    };
  }

  private _error = new Subject<Error>();
  get error() {
    return this._error.asObservable();
  }

  constructor(private chainService: ChainService) {
    this.checkAccountInit();
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('Accounts changed:');
      console.log(accounts);
      // Time to reload your interface with accounts[0]!
    });
  }

  private async checkAccountInit() {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      const signer = provider.getSigner();
      const selectedAccount = await signer.getAddress();
      console.log(selectedAccount);
      if (selectedAccount) {
        // already previously connected, continue with flow
        this.connectWeb3();
      }
    } catch (error) {
      console.log('Web3 not previously connected');
    }
  }

  private async getWeb3Provider(): Promise<Web3AppInfo> {
    if (typeof window.ethereum === 'undefined') {
      this._error.next(new Error('MetaMask is not installed.'));
      return;
    }

    if (this.connected) {
      this._error.next(new Error('Wallet already connected.'));
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any'
      );
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const chainId = await signer.getChainId();
      const currentChain = await this.chainService.getChainById(chainId);
      const web3Info: Web3AppInfo = {
        provider,
        signer,
        chainId,
        currentChain,
        userAddress: accounts[0],
      };

      return web3Info;
    } catch (error) {
      this._error.next(error);
    }
  }

  async connectWeb3() {
    if (!this.connected) {
      const web3Info: Web3AppInfo = await this.getWeb3Provider();
      this._web3.next(web3Info);
      this._ready.next(true);
    }
  }
}
