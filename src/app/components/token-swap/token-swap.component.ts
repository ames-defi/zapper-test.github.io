import { Component } from '@angular/core';
import { USDC } from 'src/app/data/routes';
import { BasicToken, DexService } from 'src/lib/services/DEX/dex.service';
import { TokenService } from 'src/lib/services/tokens/token.service';
import { Web3Service } from 'src/lib/services/web3.service';

@Component({
  selector: 'quartz-token-swap',
  templateUrl: './token-swap.component.html',
  styleUrls: ['./token-swap.component.scss'],
})
export class TokenSwapComponent {
  pathResults = [];
  swapInfo: BasicToken[] = [];
  userTokenZeroBalance = null;
  userTokenOneBalance = null;
  currentInToken: BasicToken = null;
  currentOutToken: BasicToken = null;
  gettingBalance = false;

  constructor(
    public readonly web3: Web3Service,
    public readonly dex: DexService,
    public readonly tokens: TokenService
  ) {
    this.dex = new DexService(web3);
    this.dex.swapPaths.subscribe((paths) => {
      this.pathResults = paths;
    });

    this.dex.swapComplete.subscribe(async (done) => {});
  }

  startQuote(token0: BasicToken, inputAmount: string) {
    this.dex.startQuote(inputAmount, token0.address === USDC.address ? 6 : 18);
  }

  startSwap(path: BasicToken[]) {
    this.dex.executeCurrentSwap(path.map((p) => p.address));
  }

  async updateToken0(token0: BasicToken) {
    this.dex.updateSwap(0, token0);
    this.currentInToken = token0;
    this.userTokenZeroBalance = null;
    const balance = await this.tokens.getUserTokenBalance(token0.address);
    this.userTokenZeroBalance = balance.toNumber();
  }

  async updateToken1(token1: BasicToken) {
    this.dex.updateSwap(1, token1);
    this.currentOutToken = token1;
    this.userTokenOneBalance = null;
    const balance = await this.tokens.getUserTokenBalance(token1.address);
    this.userTokenOneBalance = balance.toNumber();
  }
}
