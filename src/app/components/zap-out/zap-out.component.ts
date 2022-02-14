import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { QuickPool } from 'src/app/data/quartz-pools';

@Component({
  selector: 'defi-zap-out',
  templateUrl: './zap-out.component.html',
  styleUrls: ['./zap-out.component.scss'],
})
export class ZapOutComponent implements OnInit {
  @Output() zapOut = new Subject<{
    outputTokenAddress: string;
    lpAddress: string;
  }>();
  @Input() pool: QuickPool;
  fetchingBalances = false;

  constructor() {}

  ngOnInit(): void {}

  emitZapOut(outputTokenAddress: string) {
    this.zapOut.next({
      lpAddress: this.pool.lpAddress,
      outputTokenAddress,
    });
  }
}
