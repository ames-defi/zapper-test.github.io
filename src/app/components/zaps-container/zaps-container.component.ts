import { Component } from '@angular/core';
import { ethers, BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import {
  ZAP_CONTRACT_MAINNET_ADDRESS,
  QUARTZ_TOKEN_ADDRESS_HARMONY,
  QuartzToken,
  QSHARE_TOKEN_ADDRESS_HARMONY,
  QShareToken,
  UST_ADDRESS,
  UstToken,
  QUARTZ_QSHARE_DFK_LP_ADDRESS,
  QSHARE_QUARTZ_PAIR,
  QUARTZ_UST_DFK_LP_ADDRESS,
  QUARTZ_UST_PAIR,
  DFK_ROUTER_HARMONY,
} from 'src/app/data/contracts';
import { QUARTZ_POOLS, QuickPool } from 'src/app/data/quartz-pools';
import { RewardPool } from 'src/lib/services/reward-pool/reward-pool';
import { Web3Service } from 'src/lib/services/web3.service';
import { Zapper } from 'src/lib/services/zapper/zapper';
import { FormattedResult } from 'src/lib/utils/formatting';
import { giveContactApproval } from 'src/lib/utils/web3-utils';
import { ZapOutParams } from '../zap-out/zap-out.component';

@Component({
  selector: 'defi-zaps-container',
  templateUrl: './zaps-container.component.html',
  styleUrls: ['./zaps-container.component.scss'],
})
export class ZapsContainerComponent {
  private zapper: Zapper;
  public rewardPool: RewardPool;
  pools = QUARTZ_POOLS;
  fetchingBalances = false;
  addressRefs: any = {};
  pairRefs: any = {};

  constructor(public readonly web3: Web3Service) {
    this.web3.ready.subscribe((ready) => {
      if (ready) {
        this.setContractRefs();
        this.setEventListeners();
        this.checkLPs();
      }
    });

    this.web3.error.subscribe((err) => {
      console.log(err);
    });
  }

  private async checkLPs() {
    for (const pool of this.pools) {
      await this.getLpBalance(pool.lpAddress);
    }
  }

  private setEventListeners() {
    this.zapper.contract.on('ZappedInLP', (who, pairAddress, lpAmount) => {
      console.log('ZappedInLP Event');
      window.location.reload();
    });

    this.zapper.contract.on('ZappedOutLP', (who, pairAddress, lpAmount) => {
      console.log('ZappedOutLP Event');
      window.location.reload();
    });
  }

  private async getLpBalance(lpAddress: string) {
    const pool = this.pools.find((p) => p.lpAddress == lpAddress);
    pool.loading = true;

    pool.selectedToken = null;
    pool.selectedTokenBalance = null;
    const lpTokenBalance = await this.pairRefs[lpAddress].balanceOf(
      this.web3.web3Info.userAddress
    );
    pool.lpTokenBalance = lpTokenBalance.isZero()
      ? null
      : formatUnits(lpTokenBalance, 18);
    console.log(pool.lpTokenBalance);
    pool.loading = false;
  }

  async handleZapIn(
    inputTokenAddress: string,
    lpAddress: string,
    amount: string
  ) {
    try {
      const pool = this.pools.find((p) => p.lpAddress == lpAddress);
      pool.loading = true;

      await this.checkApprovals(inputTokenAddress, lpAddress, amount);

      await this.zapper.zapIn(
        inputTokenAddress,
        lpAddress,
        parseUnits(amount, 18)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async handleZapOut(data: ZapOutParams) {
    console.log(data);
    // Need to make sure user has approved contract for pair and both tokens
    // The router also needs approvals
    data.pool.loading = true;
    await this.zapper.zapOut(
      data.lpAddress,
      data.outputTokenAddress,
      parseUnits(data.pool.lpTokenBalance, 18)
    );
  }

  async checkApprovals(
    inputTokenAddress: string,
    lpAddress: string,
    amount: string
  ) {
    const bnAmount = parseUnits(amount, 18);

    // Check contract allowance first
    const tokenContract = this.addressRefs[inputTokenAddress];
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
      await giveContactApproval(
        tokenContract,
        ZAP_CONTRACT_MAINNET_ADDRESS,
        bnAmount,
        this.web3.web3Info.userAddress
      );

      window.location.reload();
    }

    if (bnAmount.gt(pairAllowance)) {
      await giveContactApproval(
        pairContract,
        ZAP_CONTRACT_MAINNET_ADDRESS,
        bnAmount,
        this.web3.web3Info.userAddress
      );

      window.location.reload();
    }
  }

  async getBalances(pool) {
    this.fetchingBalances = true;
    const balance = await this.addressRefs[pool.selectedToken].balanceOf(
      this.web3.web3Info.userAddress
    );
    console.log(new FormattedResult(balance).toNumber());
    pool.selectedTokenBalance = formatUnits(balance, 18);
    this.fetchingBalances = false;
  }

  private setContractRefs() {
    this.addressRefs[QUARTZ_TOKEN_ADDRESS_HARMONY] = QuartzToken.connect(
      this.web3.web3Info.signer
    );
    this.addressRefs[QSHARE_TOKEN_ADDRESS_HARMONY] = QShareToken.connect(
      this.web3.web3Info.signer
    );
    this.addressRefs[UST_ADDRESS] = UstToken.connect(this.web3.web3Info.signer);

    this.pairRefs[QUARTZ_QSHARE_DFK_LP_ADDRESS] = QSHARE_QUARTZ_PAIR.connect(
      this.web3.web3Info.signer
    );

    this.pairRefs[QUARTZ_UST_DFK_LP_ADDRESS] = QUARTZ_UST_PAIR.connect(
      this.web3.web3Info.signer
    );

    this.zapper = new Zapper(this.web3, DFK_ROUTER_HARMONY);
    this.rewardPool = new RewardPool(this.web3, this.pools);
    // this.rewardPool.getPendingRewards(this.pools);
  }
}
