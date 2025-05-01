import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../types/Game';
import { joinGame, takeTurn, viewGame } from '../lib/gameApi';
import { useAccount } from 'wagmi';

// export type Game = {
//   gameId: bigint; // uint256 maps well to bigint
//   rows: bigint[]; // uint[] maps to bigint[]
//   playerOneTurn: boolean; // bool maps to boolean
//   playerOne: Player;
//   playerTwo: Player;
//   winner: Player;
//   lastUpdatedAt: number; // uint48 fits within JavaScript's number type safely
// };

function GamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedStones, setSelectedStones] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const { address } = useAccount();
  console.log(game);

  useEffect(() => {
    if (!gameId) {
      return;
    }

    console.log('gameId', gameId);

    viewGame(BigInt(gameId)).then(data => {
      setGame(data as Game);
      setLoading(false);
    });
  }, [gameId]);

  if (!gameId) {
    return <div>No game ID provided</div>;
  }

  if (loading) {
    return <div className="p-4">Loading game data...</div>;
  }

  // Check game state and user's role
  const isPlayerOne = address?.toLowerCase() === game?.playerOne.playerAddress.toLowerCase();
  const isPlayerTwo = address?.toLowerCase() === game?.playerTwo.playerAddress.toLowerCase();
  const isPlayer = isPlayerOne || isPlayerTwo;
  const hasPlayerTwo =
    game?.playerTwo.playerAddress !== '0x0000000000000000000000000000000000000000';

  const handleRowSelect = (rowIndex: number) => {
    setSelectedRow(rowIndex);
    // Reset selected stones when a new row is chosen
    const availableStones = game?.rows[rowIndex] ? Number(game.rows[rowIndex]) : 0;
    setSelectedStones(Math.min(1, availableStones));
  };

  const handleJoinGame = async () => {
    try {
      setLoading(true);

      await joinGame(BigInt(gameId));
      const updatedGame = await viewGame(BigInt(gameId));
      setGame(updatedGame as Game);
    } catch (error) {
      console.error('Error joining game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMove = async () => {
    if (selectedRow === null || selectedStones <= 0) return;

    // TODO: Implement the API call to submit the move
    console.log(`Submitting move: Row ${selectedRow}, Stones ${selectedStones}`);

    try {
      const response = await takeTurn(
        BigInt(gameId ?? -1),
        BigInt(selectedRow),
        BigInt(selectedStones)
      );
      console.log(response);

      // Reset selection after submission
      setSelectedRow(null);
      setSelectedStones(1);
    } catch (error) {
      console.error('Error submitting move:', error);
    }
  };

  // Render different views based on game state
  const renderGameState = () => {
    // Case 1: User is player one and waiting for player two
    if (isPlayerOne && !hasPlayerTwo) {
      return (
        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">Waiting for Player 2 to join</h2>
          <p className="mt-2">Share this game link with another player</p>
          <div className="mt-2 p-2 bg-white rounded border border-gray-300 font-mono text-sm">
            {window.location.href}
          </div>
        </div>
      );
    }

    // Case 2: User is not player one and player two slot is open
    if (!isPlayerOne && !hasPlayerTwo) {
      return (
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">Join this game as Player 2?</h2>
          <button
            onClick={handleJoinGame}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Join Game
          </button>
        </div>
      );
    }

    // Case 3: Game is full but user is not a player
    if (!isPlayer && hasPlayerTwo) {
      return (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">Game Full</h2>
          <p className="mt-2">You are viewing this game as a spectator</p>
        </div>
      );
    }

    // Case 4: User is a player and game is active
    if (isPlayer && hasPlayerTwo) {
      return (
        <>
          {/* Game board */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Game Board</h2>
            {game?.rows.map((rowCount, index) => (
              <div
                key={index}
                className={`flex items-center mb-3 p-2 rounded ${selectedRow === index ? 'bg-blue-100' : ''} ${
                  // Only highlight rows as clickable if it's the player's turn
                  (isPlayerOne && game.playerOneTurn) || (isPlayerTwo && !game.playerOneTurn)
                    ? 'cursor-pointer hover:bg-gray-100'
                    : 'opacity-80'
                }`}
                onClick={() => {
                  // Only allow selection if it's the player's turn
                  if ((isPlayerOne && game.playerOneTurn) || (isPlayerTwo && !game.playerOneTurn)) {
                    handleRowSelect(index);
                  }
                }}
              >
                <div className="w-8 mr-4 font-bold">#{index}:</div>
                <div className="flex-grow flex items-center">
                  {Array.from({ length: Number(rowCount) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-yellow-600 rounded-full mx-1"
                      title="Stone"
                    />
                  ))}
                </div>
                <div className="ml-4 font-medium">{rowCount.toString()} stones</div>
              </div>
            ))}
          </div>

          {/* Controls for making a move - only show if it's the player's turn */}
          {selectedRow !== null &&
            ((isPlayerOne && game?.playerOneTurn) || (isPlayerTwo && !game?.playerOneTurn)) && (
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-2">Make Your Move</h2>
                <p className="mb-2">Selected Row: {selectedRow}</p>

                <div className="flex items-center mb-4">
                  <label className="mr-2">Number of stones to remove:</label>
                  <input
                    type="number"
                    min="1"
                    max={game?.rows[selectedRow] ? Number(game.rows[selectedRow]) : 1}
                    value={selectedStones}
                    onChange={e => setSelectedStones(Number(e.target.value))}
                    className="border rounded px-2 py-1 w-16"
                  />
                </div>

                <button
                  onClick={handleSubmitMove}
                  disabled={
                    selectedStones <= 0 || selectedStones > Number(game?.rows[selectedRow] || 0)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  Submit Move
                </button>
              </div>
            )}

          {/* Message when it's not the player's turn */}
          {((isPlayerOne && !game?.playerOneTurn) || (isPlayerTwo && game?.playerOneTurn)) && (
            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-semibold">Waiting for opponent's move</h2>
              <p>It's the other player's turn.</p>
            </div>
          )}
        </>
      );
    }

    return <div>Loading game state...</div>;
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Game #{gameId}</h1>

      <div className="mb-6">
        <p className="mb-2">
          {game?.playerOneTurn && <span className="font-bold text-blue-500">[Current Turn]</span>}{' '}
          Player 1: {game?.playerOne.playerAddress}
        </p>
        {hasPlayerTwo ? (
          <p>
            {!game?.playerOneTurn && (
              <span className="font-bold text-blue-500">[Current Turn]</span>
            )}{' '}
            Player 2: {game?.playerTwo.playerAddress}
          </p>
        ) : (
          <p>
            Player 2: <span className="italic text-gray-500">Waiting for player to join...</span>
          </p>
        )}
      </div>

      {renderGameState()}
    </div>
  );
}

export default GamePage;
