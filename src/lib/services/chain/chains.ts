import { ChainBaseConfig } from 'src/lib/types/chain.types';

export const CURRENT_CHAINS: ChainBaseConfig[] = [
  {
    name: 'Solana',
    nativeToken: { coinGeckoId: 'solana' },
  },
  {
    name: 'BSC',
    nativeToken: { coinGeckoId: 'binancecoin' },
  },
  {
    name: 'Polygon',
    nativeToken: { coinGeckoId: 'matic-network' },
  },
  {
    name: 'Harmony',
    nativeToken: { coinGeckoId: 'harmony' },
    chainId: 1666600000,
  },
  {
    name: 'Osmosis',
    nativeToken: { coinGeckoId: 'osmosis' },
  },
  {
    name: 'Terra',
    nativeToken: { coinGeckoId: 'terra-luna' },
  },
  {
    name: 'Avalanche',
    nativeToken: { coinGeckoId: 'avalanche-2' },
    chainId: 43114,
  },
  {
    name: 'Fantom',
    nativeToken: { coinGeckoId: 'fantom' },
    chainId: 250,
  },
  {
    name: 'Near',
    nativeToken: { coinGeckoId: 'near' },
  },
  {
    name: 'Aurora',
    nativeToken: { coinGeckoId: 'aurora-near' },
  },
  {
    name: 'Oasis',
    nativeToken: { coinGeckoId: 'oasis-network' },
  },
  {
    name: 'Cosmos',
    nativeToken: { coinGeckoId: 'cosmos' },
  },
];
