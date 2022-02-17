import { ethers } from 'ethers';
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils';
import { Subject } from 'rxjs';
import { DFK_QUARTZ_ROUTES, TOKEN_LIST } from 'src/app/data/routes';
import { FormattedResult } from 'src/lib/utils/formatting';
import { Web3Service } from '../web3.service';

const ROUTER_ABI = [
  'function getAmountsOut(uint, address[]) public view returns (uint[] memory amounts)',
];

export interface BasicToken {
  address: string;
  name: string;
}

export class DexService {
  readonly router: ethers.Contract;

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

  reset = new Subject<boolean>();
  loading = new Subject<boolean>();

  private swapInfo: BasicToken[] = [];
  private swapAmount = null;
  currentPathResults = {};

  readonly tokenList = TOKEN_LIST;
  tokenList0 = [...this.tokenList];
  tokenList1 = [...this.tokenList];

  constructor(uniRouterAddress, private readonly web3: Web3Service) {
    this.router = new ethers.Contract(
      uniRouterAddress,
      ROUTER_ABI,
      web3.web3Info.signer
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
    if (this.swapAmount && this.swapInfo[0] && this.swapInfo[1]) {
      this.setSwapInfo();
    } else {
      console.log('Need more swap info..');
    }
  }

  async quotePath(amount, path: string[]) {
    const amounts = await this.router.getAmountsOut(amount, path);
    console.log(amounts);
    return amounts;
  }

  getInputTokenPaths(token0: string, token1: string) {
    return DFK_QUARTZ_ROUTES.filter((route) => route[token0])
      .map((route) => route[token0].path)
      .filter((path) => path[path.length - 1].address == token1);
  }

  resetSwap() {
    this.tokenList0 = this.tokenList.slice();
    this.tokenList1 = this.tokenList.slice();
    this.swapInfo[0] = null;
    this.swapInfo[1] = null;
    this.swapAmount = null;
    this._swapPaths.next([]);
    this.reset.next(true);
  }
}
