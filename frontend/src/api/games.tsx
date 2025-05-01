import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { gamesAbi, gamesContract } from '../lib/Games';

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
  //   const PAGE_SIZE = 50;
  try {
    // const { searchParams } = new URL(req.url);
    // const startId = parseInt(searchParams.get('startId') ?? '0');

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
    // const totalSessions = parseInt(availableGames.toString());

    // if (startId > totalSessions - 1) throw Error('startId exceeds max possible id');

    // const endId = totalSessions - startId > PAGE_SIZE ? startId + PAGE_SIZE : totalSessions - 1;
    // const sessionIds = Array.from({ length: endId - startId + 1 }, (_, i) => startId + i);
    // console.log({ sessionIds });
    // const sessionsRes = await publicClient.multicall({
    //   contracts: sessionIds.map(sessionId => ({
    //     abi: AttendanceAbi,
    //     address: attendenceContract,
    //     functionName: 'sessions',
    //     args: [sessionId],
    //   })),
    // });
    // const sessions = sessionsRes.map(({ result }, i) => ({
    //   sessionId: sessionIds[i],
    //   ...parseSession(result as unknown as [number, number, bigint]),
    // }));

    // return NextResponse.json(
    //   { totalSessions: parseInt(totalSessions.toString()), sessions },
    //   { status: 200 }
    // );
  } catch (error) {
    console.log(error);
    return [];
    // return NextResponse.json(
    //   { error: 'Invalid request', message: (error as Error).message },
    //   { status: 400 }
    // );
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { start, end } = body;

//     if (!start || !end) {
//       return NextResponse.json({ error: 'Missing start or end time' }, { status: 400 });
//     }

//     const privateKey = process.env.PRIVATE_KEY;
//     const account = privateKeyToAccount(privateKey as Hex);
//     const walletClient = createWalletClient({
//       account,
//       chain: baseSepolia,
//       transport: http(),
//     });

//     const transactionHash = await walletClient.sendTransaction({
//       to: attendenceContract,
//       data: encodeFunctionData({
//         abi: AttendanceAbi,
//         functionName: 'createSession',
//         args: [start, end],
//       }),
//     });

//     return NextResponse.json({ transactionHash }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Invalid request', message: (error as Error).message },
//       { status: 400 }
//     );
//   }
// }
