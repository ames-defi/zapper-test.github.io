
export interface TokenMarketData {
  usd: number;
  last_updated_at?: number;
  usd_24h_change?: number;
  usd_24h_vol?: number;
}

export interface TokenBaseConfig {
  coinGeckoId: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  logoURI?: string;
  image?: {
    thumb: string;
    small: string;
    large: string;
  };
  categories?: string[];
  categoryLabel?: string;
  currentPrice?: number;
  projectSiteURL?: string;
  marketData?: TokenMarketData;
  meta?: any;
}
