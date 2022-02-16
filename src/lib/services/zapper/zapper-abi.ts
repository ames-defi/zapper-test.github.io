export const ZAPPER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'who',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'pairAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'lpAmount',
        type: 'uint256',
      },
    ],
    name: 'ZappedInLP',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'who',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenOut',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    name: 'ZappedOutLP',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'adminReturnAssets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_routerAddress',
        type: 'address',
      },
    ],
    name: 'unapproveRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenInAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_pairAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenInAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_routerAddress',
        type: 'address',
      },
    ],
    name: 'zapIn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_pairAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_desiredTokenOut',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_routerAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_withdrawAmount',
        type: 'uint256',
      },
    ],
    name: 'zapOut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
