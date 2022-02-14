import { BigNumber, BigNumberish, ethers } from 'ethers';

/**
 * Generic function to allow interface implementations (like MasterChefs)
 * to provide custom parsing of contract data return types per their needs.
 * Most standard DEX/Uniswap/Sushi clones follow a template and
 * sometimes alter return types as needed with additional or less properties.
 */
export type ParseFunction<ReturnT, ArgsT> = (args: ArgsT) => ReturnT;

export function getDollarStringValue(value: number) {
  return `$${commify(roundDecimals(value, 2))}`;
}

export function shaveDecimals(value: BigNumber, limit = 8) {
  let valueStr = formatEther(value);
  const decimalIndex = valueStr.indexOf('.');
  const remainingLength = valueStr.slice(decimalIndex).length;
  if (remainingLength > limit) {
    valueStr = valueStr.slice(decimalIndex, decimalIndex + limit);
  }
  return ethers.utils.parseUnits(valueStr);
}

export function formatEther(value: BigNumber) {
  return ethers.utils.formatEther(value);
}

export function parseEther(value: string) {
  return ethers.utils.parseEther(value);
}

export function parseUnits(value: string, unitName?: BigNumberish) {
  return ethers.utils.parseUnits(value, unitName);
}

export function formatUnits(value: BigNumberish, unitName?: BigNumberish) {
  return ethers.utils.formatUnits(value, unitName);
}

export function roundDecimals(value: number, decimalPlaces: number): number {
  return Number(
    Math.round(+(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces,
  );
}

export function toNumber(value: BigNumber, decimals?: number): number {
  if (decimals) {
    return Number(formatUnits(value, decimals));
  }
  return Number(formatEther(value));
}

export function commify(value: string | number): string {
  return ethers.utils.commify(value);
}

export function toCommaString(value: BigNumber, decimals?: number) {
  if (decimals) {
    return ethers.utils.commify(toNumber(value, decimals));
  }
  return ethers.utils.commify(formatEther(value));
}

export class FormattedResult {
  constructor(public readonly value: BigNumber) {}

  formatEther(): string {
    return formatEther(this.value);
  }

  parseEther(): BigNumber {
    return parseEther(formatEther(this.value));
  }

  parseUnits(unitName: BigNumberish) {
    return parseUnits(formatEther(this.value), unitName);
  }

  formatUnits(unitName: BigNumberish): string {
    return formatUnits(this.value, unitName);
  }

  toNumber(decimals?: number): number {
    return toNumber(this.value, decimals);
  }

  toCommaString(decimals?: number) {
    return toCommaString(this.value, decimals);
  }
}
