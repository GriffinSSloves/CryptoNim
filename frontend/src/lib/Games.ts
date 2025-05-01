import { Address } from 'viem';

export const gamesContract = '0x0581D5505043798178E0BfBAc33486C62bE44d41' as Address;
export const gamesAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'owner_',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'games',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'playerOneTurn',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'playerOne',
        type: 'tuple',
        internalType: 'struct Nim.Player',
        components: [
          {
            name: 'playerAddress',
            type: 'address',
            internalType: 'address',
          },
        ],
      },
      {
        name: 'playerTwo',
        type: 'tuple',
        internalType: 'struct Nim.Player',
        components: [
          {
            name: 'playerAddress',
            type: 'address',
            internalType: 'address',
          },
        ],
      },
      {
        name: 'winner',
        type: 'tuple',
        internalType: 'struct Nim.Player',
        components: [
          {
            name: 'playerAddress',
            type: 'address',
            internalType: 'address',
          },
        ],
      },
      {
        name: 'lastUpdatedAt',
        type: 'uint48',
        internalType: 'uint48',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAvailableGames',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initializeGame',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Nim.Game',
        components: [
          {
            name: 'gameId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rows',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'playerOneTurn',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'playerOne',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'playerTwo',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'winner',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'lastUpdatedAt',
            type: 'uint48',
            internalType: 'uint48',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'joinGame',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Nim.Game',
        components: [
          {
            name: 'gameId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rows',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'playerOneTurn',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'playerOne',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'playerTwo',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'winner',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'lastUpdatedAt',
            type: 'uint48',
            internalType: 'uint48',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'playTurn',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'row',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'stones',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Nim.Game',
        components: [
          {
            name: 'gameId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rows',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'playerOneTurn',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'playerOne',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'playerTwo',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'winner',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'lastUpdatedAt',
            type: 'uint48',
            internalType: 'uint48',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'totalGames',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'viewGame',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Nim.Game',
        components: [
          {
            name: 'gameId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rows',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'playerOneTurn',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'playerOne',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'playerTwo',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'winner',
            type: 'tuple',
            internalType: 'struct Nim.Player',
            components: [
              {
                name: 'playerAddress',
                type: 'address',
                internalType: 'address',
              },
            ],
          },
          {
            name: 'lastUpdatedAt',
            type: 'uint48',
            internalType: 'uint48',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'GameCreated',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'creator',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameEnded',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'winner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameJoined',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'joiner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TurnPlayed',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'player',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'row',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'stones',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'CannotJoinOwnGame',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'player',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'GameAlreadyEnded',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'winner',
        type: 'tuple',
        internalType: 'struct Nim.Player',
        components: [
          {
            name: 'playerAddress',
            type: 'address',
            internalType: 'address',
          },
        ],
      },
    ],
  },
  {
    type: 'error',
    name: 'GameAlreadyHasTwoPlayers',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'playerOne',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'playerTwo',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'GameDoesNotExist',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'totalGames',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidRow',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'row',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidStones',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'row',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'stones',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'NotYourTurn',
    inputs: [
      {
        name: 'gameId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'currentPlayer',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
] as const;
