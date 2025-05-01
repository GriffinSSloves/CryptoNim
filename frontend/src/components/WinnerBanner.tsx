import React from 'react';

interface WinnerBannerProps {
  isWinner: boolean;
  isGameOver: boolean;
}

const WinnerBanner: React.FC<WinnerBannerProps> = ({ isWinner, isGameOver }) => {
  if (!isGameOver) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full p-6 text-center text-3xl font-bold ${
        isWinner ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
      style={{
        zIndex: 50,
        animation: 'fadeIn 0.5s ease-in-out',
      }}
    >
      {isWinner ? (
        <div>
          <span className="text-4xl mr-2">😃</span>
          You Won!
          <span className="text-4xl ml-2">🎉</span>
        </div>
      ) : (
        <div>
          <span className="text-4xl mr-2">😢</span>
          You Lost
          <span className="text-4xl ml-2">💔</span>
        </div>
      )}
    </div>
  );
};

export default WinnerBanner;
