import { Component } from '@angular/core';
import { IVault } from 'src/app/data/vaults';
import { VaultService } from 'src/lib/services/vaults/vault.service';

@Component({
  selector: 'quartz-vaults-container',
  templateUrl: './vaults-container.component.html',
  styleUrls: ['./vaults-container.component.scss'],
})
export class VaultsContainerComponent {
  depositValue = 0;
  withdrawValue = 0;

  constructor(public readonly vaultService: VaultService) {}

  async setVaultDeposit(vault: IVault) {
    vault.loading = true;
    await this.vaultService.deposit(vault);
    vault.loading = false;
  }

  async setVaultWithdrawAll(vault: IVault) {
    vault.loading = true;
    await this.vaultService.withdrawAll(vault);
    vault.loading = false;
  }
}
