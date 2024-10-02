import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

// Import fruit images
import apple from "../assets/images/fruits/apple.png";
import dragonfruit from "../assets/images/fruits/dragonfruit.png";
import durian from "../assets/images/fruits/durian.png";
import mangosteen from "../assets/images/fruits/mangosteen.png";
import passionfruit from "../assets/images/fruits/passionfruit.png";
import pineapple from "../assets/images/fruits/pineapple.png";
import starfruit from "../assets/images/fruits/starfruit.png";
import watermelon from "../assets/images/fruits/watermelon.png";

// Import memory song
import memorySong from "../assets/MemorySong.mp3";

interface Card {
  id: number;
  fruit: string;
  flipped: boolean;
}

interface GameContextType {
  cards: Card[];
  flipCard: (index: number) => void;
  matchedPairs: string[];
  showIcons: boolean;
  timeLeft: number;
  gameOver: boolean;
  gameWon: boolean;
  restartGame: () => void;
  score: number;
  startGame: () => void;
  isGameStarted: boolean; // State to track if the game has started
}

interface GameContextProviderProps {
  children: ReactNode;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [showIcons, setShowIcons] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); // Initialize game state
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initializeGame = () => {
    const fruitIcons: string[] = [
      apple,
      dragonfruit,
      durian,
      mangosteen,
      passionfruit,
      pineapple,
      starfruit,
      watermelon,
    ];

    const pairIcons = [...fruitIcons, ...fruitIcons];
    const shuffledIcons = pairIcons.sort(() => Math.random() - 0.5);

    const cardItems: Card[] = shuffledIcons.map((fruit, index) => ({
      id: index,
      fruit,
      flipped: false,
    }));

    setCards(cardItems);
    setShowIcons(true);
    setIsGameStarted(true); // Mark game as started

    setTimeout(() => {
      setShowIcons(false);
    }, 3000);

    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(45);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (!gameWon) setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startGame = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(memorySong);
    }
    audioRef.current.currentTime = 0; // Reset audio to start
    audioRef.current.play();
    initializeGame();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const flipCard = (index: number) => {
    if (flippedCards.length === 2 || cards[index].flipped) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);

    setFlippedCards((prevFlippedCards) => {
      const newFlippedCards = [...prevFlippedCards, index];

      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;

        if (
          updatedCards[firstIndex].fruit === updatedCards[secondIndex].fruit
        ) {
          const newMatchedPairs = [
            ...matchedPairs,
            updatedCards[firstIndex].fruit,
          ];
          setMatchedPairs(newMatchedPairs);

          if (newMatchedPairs.length === cards.length / 2) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(() => {
              setGameWon(true);
              setScore(timeLeft * 10);
            }, 1000);
          }
        } else {
          setTimeout(() => {
            const resetCards = [...updatedCards];
            resetCards[firstIndex].flipped = false;
            resetCards[secondIndex].flipped = false;
            setCards(resetCards);
          }, 1000);
        }

        return [];
      }

      return newFlippedCards;
    });
  };

  const restartGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    setIsGameStarted(false); // Reset game state
    initializeGame();
  };

  return (
    <GameContext.Provider
      value={{
        cards,
        flipCard,
        matchedPairs,
        showIcons,
        timeLeft,
        gameOver,
        gameWon,
        restartGame,
        score,
        startGame,
        isGameStarted, // Provide game state
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
