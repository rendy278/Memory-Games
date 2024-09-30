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
  const [score, setScore] = useState(0);

  const timerRef = useRef<number | null>(null);

  // Helper function to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Initialize cards and set timer
  useEffect(() => {
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

    const cardItems: Card[] = shuffleArray([...fruitIcons, ...fruitIcons]).map(
      (fruit, index) => ({
        id: index,
        fruit,
        flipped: false,
      })
    );

    setCards(cardItems);

    // Show icons for 3 seconds initially
    setTimeout(() => setShowIcons(false), 3000);

    // Start the countdown timer
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current !== null) window.clearInterval(timerRef.current);
          if (!gameWon) setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameWon]);

  const flipCard = (index: number) => {
    if (flippedCards.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;

      if (updatedCards[firstIndex].fruit === updatedCards[secondIndex].fruit) {
        const newMatchedPairs = [
          ...matchedPairs,
          updatedCards[firstIndex].fruit,
        ];
        setMatchedPairs(newMatchedPairs);

        if (newMatchedPairs.length === cards.length / 2) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => setGameWon(true), 1000);
          setScore(timeLeft * 10);
        }
      } else {
        setTimeout(() => {
          const resetCards = [...updatedCards];
          resetCards[firstIndex].flipped = false;
          resetCards[secondIndex].flipped = false;
          setCards(resetCards);
        }, 1000);
      }

      setFlippedCards([]);
    }
  };

  const restartGame = () => {
    window.location.reload();
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
