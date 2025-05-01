import { useParams } from 'react-router-dom';

function GamePage() {
  const { gameId } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">Game #{gameId}</h1>
      <p>This is the game page with ID: {gameId}</p>
    </div>
  );
}

export default GamePage;
