import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../types/Game';
import { viewGame } from '../lib/gameApi';

function GamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    viewGame(BigInt(gameId || -1)).then(data => {
      setGame(data as Game);
    });
  }, [gameId]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Game #{gameId}</h1>
      <p>
        {game?.playerOneTurn && <span className="font-bold text-blue-500">[Current Turn]</span>}{' '}
        Player 1: {game?.playerOne.playerAddress}
      </p>
      <p>
        {!game?.playerOneTurn && <span className="font-bold text-blue-500">[Current Turn]</span>}{' '}
        Player 2: {game?.playerTwo.playerAddress}
      </p>
    </div>
  );
}

export default GamePage;
