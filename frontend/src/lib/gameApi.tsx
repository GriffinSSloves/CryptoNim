import { createPublicClient, createWalletClient, encodeFunctionData, Hex, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { gamesAbi, gamesContract } from './games';
import { privateKeyToAccount } from 'viem/accounts';
import { APP_ENV } from '../getEnv';

export function parseGame(result?: [number, number, bigint] | readonly [number, number, bigint]) {
  if (!result) return undefined;
  return {
    start: result[0],
    end: result[1],
    totalAttended: parseInt(result[2].toString()),
  };
}

// This is really to get one game, from the games function
// export async function getGames(gameId) {

// }

export async function viewGame(gameId: bigint) {
  try {
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });

    const game = await publicClient.readContract({
      address: gamesContract,
      abi: gamesAbi,
      functionName: 'viewGame',
      args: [gameId],
    });
    return game;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAvailableGames() {
  try {
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });

    const availableGames = await publicClient.readContract({
      address: gamesContract,
      abi: gamesAbi,
      functionName: 'getAvailableGames',
      args: [],
    });
    return availableGames;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function joinGame(gameId: bigint) {
  const privateKey = APP_ENV.privateKey;
  const account = privateKeyToAccount(privateKey as Hex);
  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  });

  const transactionHash = await walletClient.writeContract({
    address: gamesContract,
    abi: gamesAbi,
    functionName: 'joinGame',
    args: [gameId],
  });
  return transactionHash;
}

export async function takeTurn(gameId: bigint, row: bigint, numStones: bigint) {
  try {
    const privateKey = APP_ENV.privateKey;
    const account = privateKeyToAccount(privateKey as Hex);
    const walletClient = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(),
    });

    const transactionHash = await walletClient.sendTransaction({
      to: gamesContract,
      data: encodeFunctionData({
        abi: gamesAbi,
        functionName: 'playTurn',
        args: [gameId, row, numStones],
      }),
    });

    return transactionHash;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
