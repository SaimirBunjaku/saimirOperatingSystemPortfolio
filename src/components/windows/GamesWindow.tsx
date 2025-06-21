import React from 'react';

interface GamesWindowProps {
  onOpenGame: (gameId: string) => void;
}

const GamesWindow: React.FC<GamesWindowProps> = ({ onOpenGame }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Games</h2>
      <button
        onClick={() => onOpenGame('snake')}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        🐍 Play Snake
      </button>
    </div>
  );
};

export default GamesWindow;
