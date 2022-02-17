import { Component } from '@angular/core';
import { DFK_ROUTER_HARMONY } from 'src/app/data/contracts';
import { USDC } from 'src/app/data/routes';
import { BasicToken, DexService } from 'src/lib/services/DEX/dex.service';
import { Web3Service } from 'src/lib/services/web3.service';

@Component({
  selector: 'quartz-token-swap',
  templateUrl: './token-swap.component.html',
  styleUrls: ['./token-swap.component.scss'],
})
export class TokenSwapComponent {
  dex: DexService;
  pathResults = [];

  constructor(public readonly web3: Web3Service) {
    this.dex = new DexService(DFK_ROUTER_HARMONY, web3);
    this.dex.swapPaths.subscribe((paths) => {
      console.log(paths);
      this.pathResults = paths;
    });
  }

  setSwap(token0: BasicToken, token1: BasicToken, inputAmount) {
    this.dex.startQuote(inputAmount, token0.address === USDC.address ? 6 : 18);
  }
}
