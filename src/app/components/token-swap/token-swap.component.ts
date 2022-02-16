import { Component, OnInit } from '@angular/core';
import { DFK_ROUTER_HARMONY } from 'src/app/data/contracts';
import { DexService } from 'src/lib/services/DEX/dex.service';
import { Web3Service } from 'src/lib/services/web3.service';

@Component({
  selector: 'quartz-token-swap',
  templateUrl: './token-swap.component.html',
  styleUrls: ['./token-swap.component.scss'],
})
export class TokenSwapComponent implements OnInit {
  dex: DexService;
  pathResults = [];

  constructor(public readonly web3: Web3Service) {
    this.dex = new DexService(DFK_ROUTER_HARMONY, web3);
    this.dex.swapPaths.subscribe((paths) => {
      this.pathResults = paths;
    });
  }

  ngOnInit(): void {}
}
