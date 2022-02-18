import { Component, OnDestroy } from '@angular/core';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Subscription } from 'rxjs';
import { ZAP_CONTRACT_MAINNET_ADDRESS } from 'src/app/data/contracts';
import { QUARTZ_POOLS, QuickPool } from 'src/app/data/quartz-pools';
import { QUARTZ, QSHARE, UST } from 'src/app/data/routes';
import { RewardPool } from 'src/lib/services/reward-pool/reward-pool';
import { TokenService } from 'src/lib/services/tokens/token.service';
import { Web3Service } from 'src/lib/services/web3.service';
import { Zapper } from 'src/lib/services/zapper/zapper';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';
import { ZapOutParams } from '../zap-out/zap-out.component';

@Component({
  selector: 'defi-zaps-container',
  templateUrl: './zaps-container.component.html',
  styleUrls: ['./zaps-container.component.scss'],
})
export class ZapsContainerComponent implements OnDestroy {
  pools = QUARTZ_POOLS;
  fetchingBalances = false;
  zapPath = [];
  private subs = new Subscription();

  constructor(
    public readonly web3: Web3Service,
    public readonly rewardPool: RewardPool,
    public readonly tokens: TokenService,
    private readonly zapper: Zapper
  ) {
    const done = async () => {
      await this.checkLPs();
    };
    const readySub = this.web3.ready.subscribe((ready) => {
      if (ready) {
        done();
      }
    });
    this.subs.add(readySub);
    const zapSub = this.zapper.zapComplete.subscribe(done);
    this.subs.add(zapSub);
    const depositSub = this.rewardPool.deposited.subscribe(done);
    this.subs.add(depositSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async getUserBalanceForPool(pool: QuickPool) {
    this.fetchingBalances = true;
    const balance = await this.tokens.getUserTokenBalance(pool.selectedToken);
    pool.selectedTokenBalance = balance.formatUnits(18);
    this.fetchingBalances = false;
  }

  private async checkLPs() {
    for (const pool of this.pools) {
      await this.getLpBalance(pool.lpAddress);
    }
  }

  private async getLpBalance(lpAddress: string) {
    const pool = this.pools.find((p) => p.lpAddress == lpAddress);
    pool.loading = true;

    pool.selectedToken = null;
    pool.selectedTokenBalance = null;
    const lpTokenBalance = await this.tokens.getUserTokenBalance(lpAddress);
    pool.lpTokenBalance = lpTokenBalance.value.isZero()
      ? null
      : lpTokenBalance.formatUnits(18);
    console.log(pool.lpTokenBalance);
    pool.loading = false;
  }

  async handleZapIn(
    inputTokenAddress: string,
    lpAddress: string,
    amount: string,
    withPath: boolean
  ) {
    try {
      const pool = this.pools.find((p) => p.lpAddress == lpAddress);
      pool.loading = true;

      await this.checkApprovals(inputTokenAddress, lpAddress, amount);

      if (!withPath) {
        await this.zapper.zapIn(
          inputTokenAddress,
          lpAddress,
          parseUnits(amount, 18)
        );
      } else {
        this.handleZapInWithPath(inputTokenAddress, lpAddress, amount);
      }

      pool.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  async handleZapInWithPath(
    inputTokenAddress: string,
    lpAddress: string,
    amount: string
  ) {
    // Test zap in with path
    let path;
    if (inputTokenAddress == QUARTZ.address) {
      path = [QUARTZ.address, UST.address];
    } else {
      path = [UST.address, QUARTZ.address];
    }

    await this.zapper.zapInWithPath(
      inputTokenAddress,
      lpAddress,
      parseUnits(amount, 18),
      path
    );
  }

  async handleZapOut(data: ZapOutParams) {
    data.pool.loading = true;
    await this.zapper.zapOut(
      data.lpAddress,
      data.outputTokenAddress,
      parseUnits(data.pool.lpTokenBalance, 18)
    );

    data.pool.loading = false;
  }

  async checkApprovals(
    inputTokenAddress: string,
    lpAddress: string,
    amount: string
  ) {
    const bnAmount = parseUnits(amount, 18);

    // Check contract allowance first
    const tokenContract = this.tokens.getTokenContract(inputTokenAddress);
    const pairContract = new ethers.Contract(
      lpAddress,
      [
        'function allowance(address, address) public view returns (uint256)',
        'function approve(address, uint256) public',
        'event Approval(address, address, uint256)',
      ],
      this.web3.web3Info.signer
    );

    const [inputTokenAllowance, pairAllowance] = await Promise.all([
      tokenContract.allowance(
        this.web3.web3Info.userAddress,
        ZAP_CONTRACT_MAINNET_ADDRESS
      ),
      pairContract.allowance(
        this.web3.web3Info.userAddress,
        ZAP_CONTRACT_MAINNET_ADDRESS
      ),
    ]);

    if (bnAmount.gt(inputTokenAllowance)) {
      const tx = await tokenContract.approve(
        ZAP_CONTRACT_MAINNET_ADDRESS,
        bnAmount
      );
      await awaitTransactionComplete(tx);
    }

    if (bnAmount.gt(pairAllowance)) {
      const tx = await pairContract.approve(
        ZAP_CONTRACT_MAINNET_ADDRESS,
        bnAmount
      );
      await awaitTransactionComplete(tx);
    }
  }
}
