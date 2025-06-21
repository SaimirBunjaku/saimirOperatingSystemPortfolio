import React from 'react';
import { Gamepad } from 'lucide-react'; // or any icon you want to represent Snake

interface GamesWindowProps {
  onOpenGame: (gameId: string) => void;
}

const GamesWindow: React.FC<GamesWindowProps> = ({ onOpenGame }) => {
  const games = [
    {
      id: 'snake',
      name: 'Snake Game',
      icon: Gamepad,
    }
  ];

  return (
    <div className="p-4 flex flex-wrap gap-6">
      {games.map((game) => {
        const Icon = game.icon;
        return (
          <div
            key={game.id}
            onDoubleClick={() => onOpenGame(game.id)}
            className="w-20 cursor-pointer select-none flex flex-col items-center"
            title={game.name}
          >
            <Icon className="w-12 h-12 text-green-600 mb-1" />
            <span className="text-center text-sm">{game.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GamesWindow;
