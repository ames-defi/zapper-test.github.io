import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { Subject } from 'rxjs';
import { DFK_ROUTER_HARMONY } from 'src/app/data/contracts';
import { DFK_QUARTZ_ROUTES, TOKEN_LIST } from 'src/app/data/routes';
import { FormattedResult } from 'src/lib/utils/formatting';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';
import { Web3Service } from '../web3.service';

const ROUTER_ABI = [
  'function getAmountsOut(uint, address[]) public view returns (uint[] memory)',
  `function swapExactTokensForTokens(
    uint,
    uint,
    address[],
    address,
    uint
  ) external returns (uint[] memory)`,
];

export interface BasicToken {
  address: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class DexService {
  private router: ethers.Contract;

  private _swapState = new Subject<{
    token0: BasicToken;
    token1: BasicToken;
  }>();
  get swapState() {
    return this._swapState.asObservable();
  }

  private _swapPaths = new Subject<BasicToken[][]>();
  get swapPaths() {
    return this._swapPaths.asObservable();
  }

  private _swapComplete = new Subject<boolean>();
  get swapComplete() {
    return this._swapComplete.asObservable();
  }

  reset = new Subject<boolean>();
  loading = new Subject<boolean>();

  private swapInfo: BasicToken[] = [];
  private swapAmount = null;

  currentPathResults = {};

  readonly tokenList = TOKEN_LIST;
  tokenList0 = [...this.tokenList];
  tokenList1 = [...this.tokenList];

  constructor(private readonly web3: Web3Service) {
    this.setRouter(DFK_ROUTER_HARMONY);
  }

  setRouter(address: string) {
    this.router = new ethers.Contract(
      address,
      ROUTER_ABI,
      this.web3.web3Info.signer
    );
  }

  updateSwap(listIdx: number, token: BasicToken) {
    if (listIdx == 0) {
      this.tokenList1 = this.tokenList.filter(
        (t) => t.address !== token.address
      );
    } else {
      this.tokenList0 = this.tokenList.filter(
        (t) => t.address !== token.address
      );
    }
    this.swapInfo[listIdx] = token;
  }

  private async setSwapInfo() {
    const token0 = this.swapInfo[0];
    const token1 = this.swapInfo[1];
    const paths = this.getInputTokenPaths(token0.address, token1.address);
    const results = [];
    let i = 0;
    this.loading.next(true);
    for (const path of paths) {
      const outs = await this.quotePath(
        this.swapAmount,
        path.map((p) => p.address)
      );

      this.currentPathResults[i++] = formatEther(outs[outs.length - 1]);
      results.push(outs);
    }
    this.loading.next(false);
    this._swapPaths.next(paths);
  }

  async startQuote(amount: string, decimals: number) {
    this.swapAmount = parseUnits(amount, decimals);
    if (this.isCurrentSwapValid()) {
      this.setSwapInfo();
    }
  }

  async quotePath(amount, path: string[]) {
    return await this.router.getAmountsOut(amount, path);
  }

  getInputTokenPaths(token0: string, token1: string) {
    return DFK_QUARTZ_ROUTES.filter((route) => route[token0])
      .map((route) => route[token0].path)
      .filter((path) => path[path.length - 1].address == token1);
  }

  async executeCurrentSwap(path: string[]) {
    if (this.isCurrentSwapValid()) {
      this._executeCurrentSwap(path);
    }
  }

  private async _executeCurrentSwap(path: string[]) {
    try {
      console.log('Starting swap..');
      console.log(this.swapAmount);
      console.log(path);
      console.log(this.web3.web3Info.userAddress);
      const DEFAULT_DEADLINE_MINUTES = 5;
      const tx = await this.router.swapExactTokensForTokens(
        this.swapAmount,
        ethers.constants.Zero,
        path,
        this.web3.web3Info.userAddress,
        Math.floor(Date.now() / 1000) + 60 * DEFAULT_DEADLINE_MINUTES
      );
      console.log(tx);
      await awaitTransactionComplete(tx);

      this._swapComplete.next(true);
      this.resetSwap();
    } catch (error) {
      console.error(error);
    }
  }

  isCurrentSwapValid() {
    const valid = this.swapAmount && this.swapInfo[0] && this.swapInfo[1];
    if (!valid) {
      console.log('Need more swap info..');
    }
    return valid;
  }

  resetSwap() {
    this.tokenList0 = this.tokenList.slice();
    this.tokenList1 = this.tokenList.slice();
    this.swapInfo[0] = null;
    this.swapInfo[1] = null;
    this.swapAmount = null;
    this.currentPathResults = {};
    this._swapPaths.next([]);
    this.reset.next(true);
  }
}
