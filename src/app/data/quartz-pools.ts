import { FormattedResult } from 'src/lib/utils/formatting';
import {
  HARMONY_wONE_ADDRESS,
  QSHARE_ONE_DFK_LP_ADDRESS,
  QSHARE_TOKEN_ADDRESS_HARMONY,
  QUARTZ_QSHARE_DFK_LP_ADDRESS,
  QUARTZ_TOKEN_ADDRESS_HARMONY,
  QUARTZ_UST_DFK_LP_ADDRESS,
  UST_ADDRESS,
} from './contracts';

export interface QuickPool {
  name: string;
  poolId: number;
  lpAddress: string;
  token0: {
    name: string;
    address: string;
  };
  token1: {
    name: string;
    address: string;
  };
  selectedToken?: string;
  selectedTokenBalance?: string;
  lpTokenBalance?: string;
  loading?: boolean;

  pendingRewards?: FormattedResult;
}

export const QUARTZ_POOLS: QuickPool[] = [
  {
    name: 'Quartz-UST-LP',
    poolId: 0,
    lpAddress: QUARTZ_UST_DFK_LP_ADDRESS,
    token0: {
      name: 'Quartz',
      address: QUARTZ_TOKEN_ADDRESS_HARMONY,
    },
    token1: {
      name: 'UST',
      address: UST_ADDRESS,
    },
    selectedToken: null,
  },
  {
    name: 'Quartz-QShare-LP',
    poolId: 1,
    lpAddress: QUARTZ_QSHARE_DFK_LP_ADDRESS,
    token0: {
      name: 'Quartz',
      address: QUARTZ_TOKEN_ADDRESS_HARMONY,
    },
    token1: {
      name: 'QShare',
      address: QSHARE_TOKEN_ADDRESS_HARMONY,
    },
    selectedToken: null,
  },
  // {
  //   name: 'QShare-ONE-LP',
  //   lpAddress: QSHARE_ONE_DFK_LP_ADDRESS,
  //   token0: {
  //     name: 'QShare',
  //     address: QUARTZ_TOKEN_ADDRESS_HARMONY,
  //   },
  //   token1: {
  //     name: 'ONE',
  //     address: HARMONY_wONE_ADDRESS,
  //   },
  // },
];
