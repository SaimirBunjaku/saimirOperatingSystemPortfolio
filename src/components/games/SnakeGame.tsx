import React, { useState, useEffect, useRef } from 'react';

const boardSize = 10;
const initialSnake = [{ x: 5, y: 5 }];
const initialDirection = { x: 1, y: 0 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState({ x: 2, y: 2 });
  const [isGameOver, setIsGameOver] = useState(false);

  const direction = useRef(initialDirection); // current direction for movement
  const nextDirection = useRef(initialDirection); // next direction based on input
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  });

  // Direction control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { x, y } = direction.current;

      switch (e.key) {
        case 'ArrowUp':
          if (y === 0) nextDirection.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (y === 0) nextDirection.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (x === 0) nextDirection.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (x === 0) nextDirection.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSnake(prev => {
        // Apply buffered direction
        direction.current = nextDirection.current;

        const newHead = {
          x: (prev[0].x + direction.current.x + boardSize) % boardSize,
          y: (prev[0].y + direction.current.y + boardSize) % boardSize,
        };

        // Game over condition
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomPosition());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120); // slightly faster tick

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [food]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-black text-white">
      <div className="text-xl font-bold mb-2">Snake Game</div>
      {isGameOver && <div className="text-red-500 mb-2">Game Over</div>}
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${boardSize}, 20px)`,
          gridTemplateColumns: `repeat(${boardSize}, 20px)`
        }}
      >
        {[...Array(boardSize * boardSize)].map((_, index) => {
          const x = index % boardSize;
          const y = Math.floor(index / boardSize);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={index}
              className={`w-5 h-5 border border-gray-800 ${
                isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-black'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SnakeGame;
