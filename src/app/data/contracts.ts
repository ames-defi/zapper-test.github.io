import { ethers } from 'ethers';
import { ERC20_ABI } from 'src/lib/abis/erc20-abi';
import { UNIV2_PAIR_ABI } from 'src/lib/abis/UniV2Pair';

// export const ZAP_CONTRACT_MAINNET_ADDRESS =
//   '0x0Cc23b51B3A89728c85a63c819E8283e353FC86c';

// export const ZAP_CONTRACT_MAINNET_ADDRESS =
//   '0xCD0e8bF5ccfF936b6aff1C4C539cc8a03Cf43279';

export const ZAP_CONTRACT_MAINNET_ADDRESS =
  '0x0b4C72fe9aafaFdB7c9675B41b6D3F6Fa44C0004';

// QUARTZ.DEFI
export const QSHARE_TOKEN_ADDRESS_HARMONY =
  '0xfa4b16b0f63f5a6d0651592620d585d308f749a4';
export const QUARTZ_TOKEN_ADDRESS_HARMONY =
  '0xb9e05b4c168b56f73940980ae6ef366354357009';
export const QBOND_ADDRESS_HARMONY =
  '0x5A12bc3Ad86c674a50fae82510DcB03751ab218b';
export const QSHARE_REWARD_POOL_HARMONY =
  '0x1da194F8baf85175519D92322a06b46A2638A530';
export const QUARTZ_TAX_ORACLE_ADDRESS_HARMONY =
  '0x24866b121217F391b0079348146Ea139d7Fd77c7';
export const QUARTZ_TREASURY_ADDRESS_HARMONY =
  '0xFc0B7c105A6dd49Fd956b607CA8c8f00Ed159353';
export const QUARTZ_BOARDROOM_ADDRESS_HARMONY =
  '0xE1E48d3476027af9dC92542b3a60F2D45A36e082';
export const QUARTZ_ORACLE_ADDRESS_HARMONY =
  '0x543AB16f3EDe6dDD26a7C182869a282618B0891C';
export const QUARTZ_DEPLOYER_ADDRESS_HARMONY =
  '0x6b2FD2BD34676E4c312cA2F8a472e7C2d9e380e7';
export const QUARTZ_DAO_FUND_ADDRESS_HARMONY =
  '0xEE07b8Ee4D827F7EDAC3FFA7bf1a84B8c816623A';
export const QUARTZ_DEV_WALLET_ADDRESS_HARMONY =
  '0xB182b5b0Cf6bDB738e9157D6a21B02d92dbf5C38';
export const QUARTZ_TEAM_WALLET_ADDRESS_HARMONY =
  '0xc4A0A5D5B50BAB1Ee3D37769e94cAe5B9023f1d3';

// QUARTZ DFK LP's
export const QUARTZ_UST_DFK_LP_ADDRESS =
  '0x90a48cb3a724ef6f8e6240f4788559f6370b6925';
export const QSHARE_ONE_DFK_LP_ADDRESS =
  '0x157e2E205b8d307501F1AAd1C5C96c562e6f07c5';
export const QUARTZ_QSHARE_DFK_LP_ADDRESS =
  '0x3736B5B6f2033433Ea974e121cE19cc6d0E10DC9';

// DFK
export const DFK_ROUTER_HARMONY = '0x24ad62502d1c652cc7684081169d04896ac20f30';
export const HARMONY_wONE_ADDRESS =
  '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a';
export const JEWEL_ADDRESS = '0x72Cb10C6bfA5624dD07Ef608027E366bd690048F';
export const UST_ADDRESS = '0x224e64ec1BDce3870a6a6c777eDd450454068FEC';
export const USDC_ADDRESS = '0x985458E523dB3d53125813eD68c274899e9DfAb4';

export let QuartzToken = new ethers.Contract(
  QUARTZ_TOKEN_ADDRESS_HARMONY,
  ERC20_ABI
);
export let QShareToken = new ethers.Contract(
  QSHARE_TOKEN_ADDRESS_HARMONY,
  ERC20_ABI
);
export let UstToken = new ethers.Contract(UST_ADDRESS, ERC20_ABI);
export let UsdcToken = new ethers.Contract(USDC_ADDRESS, ERC20_ABI);
export let JewelToken = new ethers.Contract(JEWEL_ADDRESS, ERC20_ABI);
export let wOneToken = new ethers.Contract(HARMONY_wONE_ADDRESS, ERC20_ABI);

export const QUARTZ_UST_PAIR = new ethers.Contract(
  QUARTZ_UST_DFK_LP_ADDRESS,
  UNIV2_PAIR_ABI
);
export const QSHARE_QUARTZ_PAIR = new ethers.Contract(
  QUARTZ_QSHARE_DFK_LP_ADDRESS,
  UNIV2_PAIR_ABI
);
