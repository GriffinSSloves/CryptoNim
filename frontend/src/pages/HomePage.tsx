import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { createGame, getAvailableGames } from '../lib/gameApi';
import nimGameImage from '../assets/images/nim-game.png';

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Nim!</h1>
        <p className="text-lg text-gray-600 mb-6">
          A strategic game where players take turns removing stones from different rows.
          The player who takes the last stone loses!
        </p>
        
        {/* Nim Game Image */}
        <div className="relative rounded-lg overflow-hidden shadow-xl mb-8 max-w-md mx-auto">
          <img 
            src={nimGameImage} 
            alt="Nim game with stones arranged in rows" 
            className="w-full h-auto"
          />
        </div>

        {/* Create Game Button */}
        <button
          onClick={handleCreateGame}
          className="mt-6 mb-8 px-8 py-4 bg-indigo-600 text-black font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Create New Game
        </button>

        {/* Available Games Section */}
        {games.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Available Games</h2>
            <div className="grid gap-3">
              {games.map((game, index) => (
                <Link 
                  key={index} 
                  to={`/game/${game}`} 
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 hover:scale-102 text-indigo-600 hover:text-indigo-700"
                >
                  Join Game #{game.toString()}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
