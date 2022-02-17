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
  currentInToken: BasicToken = null;
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

    this.dex.swapComplete.subscribe(async (done) => {
      await this.setUserToken0(this.currentInToken.address);
      this.currentInToken = null;
    });
  }

  startQuote(token0: BasicToken, inputAmount: string) {
    this.dex.startQuote(inputAmount, token0.address === USDC.address ? 6 : 18);
  }

  startSwap(path: BasicToken[]) {
    this.dex.executeCurrentSwap(path.map((p) => p.address));
  }

  updateToken0(token0: BasicToken) {
    this.dex.updateSwap(0, token0);
    this.currentInToken = token0;
    this.setUserToken0(token0.address);
  }

  private async setUserToken0(address: string) {
    this.userTokenZeroBalance = null;
    this.gettingBalance = true;
    const balance = await this.tokens.getUserTokenBalance(address);
    this.userTokenZeroBalance = balance.toNumber();
    this.gettingBalance = false;
  }
}
