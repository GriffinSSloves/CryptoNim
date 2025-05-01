import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { createGame, getAvailableGames } from '../lib/gameApi';

function HomePage() {
  const [games, setGames] = useState<bigint[]>([]);

  useEffect(() => {
    getAvailableGames().then(availableGames => setGames([...availableGames]));
  }, []);

  const handleCreateGame = async () => {
    const transactionHash = await createGame();
    console.log('transactionHash', transactionHash);
  };

  return (
    <>
      <div className="text-3xl font-bold">Welcome to Nim!</div>
      <div className="text-xl">Please join an available game:</div>

      {/* Create Game Button */}
      <button
        onClick={handleCreateGame}
        className="mt-6 mb-4 px-6 py-3 bg-indigo-600  font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Create New Game
      </button>

      <div className="mt-4">
        {games.map((game, index) => (
          <Link key={index} to={`/game/${game}`} className="text-blue-500 hover:underline block">
            Join game #{game}
          </Link>
        ))}
      </div>
    </>
  );
}

export default HomePage;
