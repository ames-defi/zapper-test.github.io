import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Subject } from 'rxjs';
import { QuickPool } from 'src/app/data/quartz-pools';
import { FormattedResult } from 'src/lib/utils/formatting';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';
import { Web3Service } from '../web3.service';

const ABI = [
  'function pendingShare(uint256, address)',
  'function deposit(uint256, uint256)',
  'function withdraw(uint256, uint256)',
];

export const REWARD_POOL_ADDRESS_HARMONY =
  '0x1da194F8baf85175519D92322a06b46A2638A530';

@Injectable({ providedIn: 'root' })
export class RewardPool {
  public readonly contract: ethers.Contract;
  private _pendingRewards = new Subject<FormattedResult>();
  get pendingRewards() {
    return this._pendingRewards.asObservable();
  }

  constructor(private web3: Web3Service) {
    this.contract = new ethers.Contract(
      REWARD_POOL_ADDRESS_HARMONY,
      ABI,
      this.web3.web3Info.signer
    );
  }

  async getPendingRewards(pools: QuickPool[]) {
    for (const pool of pools) {
      const pending = await this.contract.pendingShare(
        pool.poolId,
        this.web3.web3Info.userAddress
      );
      pool.pendingRewards = new FormattedResult(pending);
    }
  }

  async depositLP(poolId: number, amount: string) {
    // Listen for event
    const tx = await this.contract.deposit(poolId, parseUnits(amount));
    await awaitTransactionComplete(tx);
  }
}
