import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { QuickPool } from 'src/app/data/quartz-pools';

@Component({
  selector: 'defi-zap-in',
  templateUrl: './zap-in.component.html',
  styleUrls: ['./zap-in.component.scss'],
})
export class ZapInComponent {
  @Output() zapLP = new Subject<{
    inputTokenAddress: string;
    lpAddress: string;
    amount: string;
  }>();
  @Input() pool: QuickPool;
  zapping = false;

  constructor() {}

  emitZap(inputTokenAddress: string, amount: string) {
    this.zapLP.next({
      inputTokenAddress,
      lpAddress: this.pool.lpAddress,
      amount,
    });
  }
}
