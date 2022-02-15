import { Component } from '@angular/core';
import { Web3Service } from 'src/lib/services/web3.service';

@Component({
  selector: 'quartz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public readonly web3: Web3Service) {
    this.web3.ready.subscribe((ready) => {
      if (ready) {
      }
    });

    this.web3.error.subscribe((err) => {
      console.log(err);
    });
  }
}
