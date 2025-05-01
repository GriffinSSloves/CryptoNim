// import { useState } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
// import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { getAvailableGames } from '../api/games';

function HomePage() {
  const [games, setGames] = useState<bigint[]>([]);

  useEffect(() => {
    getAvailableGames().then(availableGames => setGames([...availableGames]));
  });

  return (
    <>
      <div className="text-3xl font-bold">Welcome to Nim!</div>
      <div className="text-xl">Please join an available game:</div>
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
