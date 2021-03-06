import { BasicToken } from 'src/lib/services/DEX/dex.service';
import {
  QUARTZ_TOKEN_ADDRESS_HARMONY,
  QSHARE_TOKEN_ADDRESS_HARMONY,
  UST_ADDRESS,
  HARMONY_wONE_ADDRESS,
  JEWEL_ADDRESS,
  USDC_ADDRESS,
} from './contracts';

export const QUARTZ = {
  name: 'Quartz',
  address: QUARTZ_TOKEN_ADDRESS_HARMONY,
};

export const QSHARE = {
  name: 'QShare',
  address: QSHARE_TOKEN_ADDRESS_HARMONY,
};

export const UST = {
  name: 'UST',
  address: UST_ADDRESS,
};

export const JEWEL = {
  name: 'Jewel',
  address: JEWEL_ADDRESS,
};

export const WONE = {
  name: 'WONE',
  address: HARMONY_wONE_ADDRESS,
};

export const USDC = {
  name: 'USDC',
  address: USDC_ADDRESS,
};

export const TOKEN_LIST = [QUARTZ, QSHARE, JEWEL, WONE, UST, USDC];

export const DFK_QUARTZ_ROUTES: { [key: string]: { path: BasicToken[] } }[] = [
  // USDC -> QUARTZ
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

  // USDC -> QSHARE
  {
    [USDC.address]: {
      path: [USDC, WONE, QSHARE],
    },
  },
  {
    [USDC.address]: {
      path: [USDC, JEWEL, WONE, QSHARE],
    },
  },

  // QUARTZ -> UST
  {
    [QUARTZ.address]: {
      path: [QUARTZ, UST],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, QSHARE, UST],
    },
  },

  // QUARTZ -> JEWEL
  {
    [QUARTZ.address]: {
      path: [QUARTZ, UST, JEWEL],
    },
  },

  // QUARTZ -> QSHARE
  {
    [QUARTZ.address]: {
      path: [QUARTZ, QSHARE],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, UST, JEWEL, WONE, QSHARE],
    },
  },
  {
    [QUARTZ.address]: {
      path: [QUARTZ, UST, WONE, QSHARE],
    },
  },

  // QSHARE -> ONE
  {
    [QSHARE.address]: {
      path: [QSHARE, WONE],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, QUARTZ, UST, JEWEL, WONE],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, QUARTZ, UST, WONE],
    },
  },

  // QSHARE -> JEWEL
  {
    [QSHARE.address]: {
      path: [QSHARE, UST, JEWEL],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, WONE, JEWEL],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, QUARTZ, UST, JEWEL],
    },
  },

  // QSHARE -> UST
  {
    [QSHARE.address]: {
      path: [QSHARE, UST],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, WONE, UST],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, QUARTZ, UST],
    },
  },
  {
    [QSHARE.address]: {
      path: [QSHARE, QUARTZ, WONE, JEWEL, UST],
    },
  },

  // QSHARE -> QUARTZ
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

  // UST -> QUARTZ
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
  {
    [UST.address]: {
      path: [UST, JEWEL, WONE, QSHARE, QUARTZ],
    },
  },

  // UST -> QSHARE
  {
    [UST.address]: {
      path: [UST, JEWEL, WONE, QSHARE],
    },
  },
  {
    [UST.address]: {
      path: [UST, QUARTZ, QSHARE],
    },
  },
  {
    [UST.address]: {
      path: [UST, QUARTZ, WONE, QSHARE],
    },
  },

  // JEWEL -> QUARTZ
  {
    [JEWEL.address]: {
      path: [JEWEL, UST, QUARTZ],
    },
  },
  {
    [JEWEL.address]: {
      path: [JEWEL, WONE, QSHARE, QUARTZ],
    },
  },

  // JEWEL -> QSHARE
  {
    [JEWEL.address]: {
      path: [JEWEL, WONE, QSHARE],
    },
  },
  {
    [JEWEL.address]: {
      path: [JEWEL, UST, QUARTZ, QSHARE],
    },
  },
];
