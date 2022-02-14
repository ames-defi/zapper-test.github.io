import axios from 'axios';
import { TokenBaseConfig, TokenMarketData } from '../types/token.types';
import { roundDecimals } from './formatting';
import { format } from 'date-fns';
import { getTokenStorageData, setTokenStorageData } from './storage-utils';

const headers = {
  accept: 'application/json',
};

const axiosConfig = {
  headers,
};

const geckoDataSimpleQueryParams = `
localization=false&
community_data=true&
developer_data=true&
tickers=false
market_data=true
sparkline=false`;

/**
 * Utility to flatten an array over token ids into one API call
 */
export async function getPriceInfoForTokenIdsUtil(tokens: TokenBaseConfig[]) {
  const ids = tokens.map((c) => c.coinGeckoId).join(',');
  return getSingleTokenPrice(ids);
}

/**
 * Utility to flatten an array over token ids into one API call
 */
export async function getMarketDataForTokens(
  tokens: TokenBaseConfig[]
): Promise<{ [id: string]: TokenMarketData }> {
  try {
    const ids = tokens.map((c) => c.coinGeckoId).join(',');
    const { data }: any = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`,
      axiosConfig
    );
    for (const id in data) {
      const marketData: TokenMarketData = {
        usd: data[id].usd,
        last_updated_at: data[id].last_updated_at,
        usd_24h_change: roundDecimals(data[id].usd_24h_change, 2),
        usd_24h_vol: data[id].usd_24h_vol,
      };

      data[id] = marketData;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSingleTokenPrice(
  tokenApiID: string
): Promise<TokenMarketData> {
  try {
    const id = tokenApiID.toLowerCase();
    const isStableCoin =
      id === 'usdc' ||
      id === 'terrausd' ||
      id === 'usdt' ||
      id === 'dai' ||
      id === 'busd' ||
      id === 'usd-coin';
    if (isStableCoin) {
      return { usd: 1 };
    }
    const data: any = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenApiID}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`,
      axiosConfig
    );
    return data.data[tokenApiID];
  } catch (error) {
    throw error;
  }
}

export function processCoinGeckoData(token: TokenBaseConfig) {
  token.categoryLabel = token.categories.join(', ');
}

export async function getCoinGeckoData(
  coinGeckoId: string,
  skipLocal = false
): Promise<TokenBaseConfig> {
  try {
    const local = await getTokenStorageData<TokenBaseConfig>(coinGeckoId);
    if (local && !skipLocal) {
      console.log('Retrieving from storage.');
      return local;
    }
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinGeckoId}?${geckoDataSimpleQueryParams}`,
      axiosConfig
    );

    const tokenConfig: TokenBaseConfig = {
      coinGeckoId,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      image: data.image,
      categories: data.categories,
      currentPrice: 0,
      meta: { ...data },
    };

    console.log('Setting local storage data.');
    await setTokenStorageData(coinGeckoId, tokenConfig);
    return tokenConfig;
  } catch (error) {
    throw error;
  }
}

export async function getTickerData(coinGeckoId: string) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/tickers?exchange_ids=binance,gdax,crypto_com&include_exchange_logo=true`;
    const { data } = await axios.get(url, axiosConfig);

    const targetMarkets = ['USDT', 'USD', 'USDC'];
    const tickers = data.tickers.filter((t) =>
      targetMarkets.includes(t.target)
    );

    const binanceTickers = tickers.filter(
      (t) => t.market.identifier === 'binance'
    );
    const coinbaseTickers = tickers.filter(
      (t) => t.market.identifier === 'gdax'
    );
    const cryptoComTickers = tickers.filter(
      (t) => t.market.identifier === 'crypto_com'
    );
    const results = {
      name: data.name,
      binanceTickers,
      coinbaseTickers,
      cryptoComTickers,
    };
    return results;
  } catch (error) {
    throw error;
  }
}

export async function getGeckoTrendingTokens() {
  const { data } = await axios.get(
    'https://api.coingecko.com/api/v3/search/trending',
    axiosConfig
  );
  const trending = data.coins.map((c) => c.item);
  return setTokenData(
    trending.map((t) => {
      return { coinGeckoId: t.id };
    })
  );
}

export async function setTokenData(
  ids: TokenBaseConfig[],
  skipLocal = false
): Promise<TokenBaseConfig[]> {
  const tokens: TokenBaseConfig[] = [];
  for (const token of ids) {
    tokens.push(await getCoinGeckoData(token.coinGeckoId, skipLocal));
  }

  const marketData = await getMarketDataForTokens(ids);
  for (const id in marketData) {
    const t = tokens.find((t) => t.coinGeckoId === id);
    t.marketData = marketData[id];
  }

  return tokens;
}

export async function getMarketChart(id: string, daysBack: number) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${daysBack}&interval=daily`;
  const { data } = await axios.get(url, axiosConfig);
  const results: any = {};
  for (const key in data) {
    const info = data[key];
    const parsed = [];
    info.forEach((datum) => {
      parsed.push({
        time: format(new Date(datum[0]), 'yyyy-MM-dd').toString(),
        value: roundDecimals(datum[1], 2),
      });
    });

    results[key] = parsed;
  }
  return results;
}
