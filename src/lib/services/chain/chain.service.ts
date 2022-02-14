import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChainBaseConfig } from 'src/lib/types/chain.types';
import { getCoinGeckoData } from 'src/lib/utils/http-utils';
import { CURRENT_CHAINS } from './chains';

@Injectable({ providedIn: 'root' })
export class ChainService {
  private _chains = new BehaviorSubject<ChainBaseConfig[]>(CURRENT_CHAINS);
  get chains() {
    return this._chains.asObservable();
  }

  constructor() {}

  async getChain(name: string): Promise<ChainBaseConfig> {
    const chain = this._chains.value.find((c) => c.name === name);
    chain.nativeToken = await getCoinGeckoData(chain.nativeToken.coinGeckoId);
    return chain;
  }

  // EVM chains
  async getChainById(chainId: number): Promise<ChainBaseConfig> {
    const chain = this._chains.value.find((c) => c.chainId === chainId);
    chain.nativeToken = await getCoinGeckoData(chain.nativeToken.coinGeckoId);
    return chain;
  }
}
