import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { createGame, getAvailableGames } from '../lib/gameApi';
import nimGameImage from '../assets/images/nim-game.png';

function HomePage() {
  const [games, setGames] = useState<bigint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAvailableGames().then(availableGames => setGames([...availableGames]));
  }, []);

  const handleCreateGame = async () => {
    try {
      setIsLoading(true);
      const transactionHash = await createGame();
      console.log('transactionHash', transactionHash);
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1>Welcome to Nim</h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8">
            A strategic game of mathematical prowess. Take turns removing stones from rows,
            but be careful - the player who takes the last stone loses!
          </p>
        </div>

        <div className="game-card mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={nimGameImage} 
              alt="Nim game with stones arranged in rows" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <button
            onClick={handleCreateGame}
            disabled={isLoading}
            className="relative group"
          >
            <span className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Game...
                </>
              ) : (
                <>
                  Create New Game
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </>
              )}
            </span>
          </button>

          {games.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-200">
                Available Games
              </h2>
              <div className="grid gap-4">
                {games.map((game, index) => (
                  <Link 
                    key={index} 
                    to={`/game/${game}`} 
                    className="game-card flex justify-between items-center group hover:cursor-pointer"
                  >
                    <span className="text-white font-medium">Game #{game.toString()}</span>
                    <span className="text-indigo-200 font-medium group-hover:text-white transition-colors duration-200">
                      Join Game <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
