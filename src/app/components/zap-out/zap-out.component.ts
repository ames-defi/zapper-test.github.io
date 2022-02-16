import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { QuickPool } from 'src/app/data/quartz-pools';

export interface ZapOutParams {
  outputTokenAddress: string;
  lpAddress: string;
  pool: QuickPool;
}

@Component({
  selector: 'defi-zap-out',
  templateUrl: './zap-out.component.html',
  styleUrls: ['./zap-out.component.scss'],
})
export class ZapOutComponent implements OnInit {
  @Output() zapOut = new Subject<ZapOutParams>();
  @Input() pool: QuickPool;
  fetchingBalances = false;

  constructor() {}

  ngOnInit(): void {}

  emitZapOut(outputTokenAddress: string) {
    this.zapOut.next({
      lpAddress: this.pool.lpAddress,
      outputTokenAddress,
      pool: this.pool,
    });
  }
}
