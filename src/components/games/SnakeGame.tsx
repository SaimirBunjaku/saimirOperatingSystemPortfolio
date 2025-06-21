import React, { useState, useEffect, useRef } from 'react';

const boardSize = 10;
const initialSnake = [{ x: 5, y: 5 }];
const initialDirection = { x: 1, y: 0 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState({ x: 2, y: 2 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const direction = useRef(initialDirection);
  const nextDirection = useRef(initialDirection);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = (snakeBody: { x: number; y: number }[]) => {
    let position;
    do {
      position = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (snakeBody.some(segment => segment.x === position.x && segment.y === position.y));
    return position;
  };

  const resetGame = () => {
    const startingSnake = [{ x: 5, y: 5 }];
    direction.current = initialDirection;
    nextDirection.current = initialDirection;
    setSnake(startingSnake);
    setFood(generateFood(startingSnake));
    setIsGameOver(false);
    setScore(0);
  };

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSnake(prev => {
        direction.current = nextDirection.current;

        const newHead = {
          x: (prev[0].x + direction.current.x + boardSize) % boardSize,
          y: (prev[0].y + direction.current.y + boardSize) % boardSize,
        };

        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          const newFood = generateFood(newSnake);
          setFood(newFood);
          setScore(s => s + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [food]);

  return (
  <div className="w-[350px] h-[330px] flex flex-col items-center p-4 bg-black text-white overflow-hidden">
    <div className="text-xl font-bold mb-2">🐍 Snake Game</div>
    <div className="mb-2 text-sm">
      Score: <span className="font-semibold">{score}</span>
    </div>

    {isGameOver ? (
      <div className="flex flex-1 flex-col justify-center items-center text-red-500">
        <div className="text-3xl font-bold mb-4">Game Over</div>
        <button
          onClick={resetGame}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-base"
        >
          Restart
        </button>
      </div>
    ) : (
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${boardSize}, 20px)`,
          gridTemplateColumns: `repeat(${boardSize}, 20px)`,
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
    )}
  </div>
);

};

export default SnakeGame;
