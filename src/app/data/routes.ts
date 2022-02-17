import { BasicToken } from 'src/lib/services/DEX/dex.service';
import {
  QUARTZ_TOKEN_ADDRESS_HARMONY,
  QSHARE_TOKEN_ADDRESS_HARMONY,
  UST_ADDRESS,
  HARMONY_wONE_ADDRESS,
  JEWEL_ADDRESS,
} from './contracts';

const QUARTZ = {
  name: 'Quartz',
  address: QUARTZ_TOKEN_ADDRESS_HARMONY,
};

const QSHARE = {
  name: 'QShare',
  address: QSHARE_TOKEN_ADDRESS_HARMONY,
};

const UST = {
  name: 'UST',
  address: UST_ADDRESS,
};

const JEWEL = {
  name: 'Jewel',
  address: JEWEL_ADDRESS,
};

const WONE = {
  name: 'WONE',
  address: HARMONY_wONE_ADDRESS,
};

const USDC = {
  name: 'USDC',
  address: '0x985458E523dB3d53125813eD68c274899e9DfAb4',
};

export const TOKEN_LIST = [UST, USDC, QUARTZ, QSHARE, JEWEL];

export const DFK_QUARTZ_ROUTES: { [key: string]: { path: BasicToken[] } }[] = [
  {
    [USDC.address]: {
      path: [USDC, UST, JEWEL, WONE, QSHARE, QUARTZ],
    },
  },
  {
    [USDC.address]: {
      path: [USDC, JEWEL, WONE, QSHARE, QUARTZ],
    },
  },
  {
    [USDC.address]: {
      path: [USDC, WONE, QSHARE, QUARTZ],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, UST],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, UST, JEWEL],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, QSHARE, UST],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, QSHARE],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, UST],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, QUARTZ],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, WONE, JEWEL, UST, QUARTZ],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, WONE, UST, QUARTZ],
    },
  },
  {
    [QSHARE.address]: {
      path: [QUARTZ, QUARTZ, UST],
    },
  },
  {
    [QSHARE.address]: {
      path: [QUARTZ, WONE, JEWEL, UST],
    },
  },
  {
    [UST.address]: {
      path: [UST, QUARTZ],
    },
  },
  {
    [UST.address]: {
      path: [UST, JEWEL, WONE, QSHARE, QUARTZ],
    },
  },
  { [UST.address]: { path: [UST, JEWEL, WONE, QSHARE, QUARTZ] } },
];
