import styled from "styled-components";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchTexts } from "../../features/text/textThunk";
import { selectText } from "../../features/text/textSlice";
import {
  setTotalChars,
  updateCorrectChars,
  updateCharsTyped,
  setStartTime,
  setEndingTime,
} from "../../features/typingStats/typingStatsSlice";
import TypingResultDisplay from "../TypingResultDisplay";
import ProgressBar from "../ProgressBar";


interface CharBoxProps {
  $status: string | null;
  $lineIndex: number;
  $wordIndex: number;
  $charIndex: number;
}
interface WordWithIndex {
  word: string;
  startIndex: number;
}

interface LineType {
  line: WordWithIndex[];
  lineIndex: number;
}

interface CharStatus {
  [key: number]: string;
}

interface TextContainerProps {
  $translateY: number;
}
const TypingBoxContainer = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: 426px;
  background-color: var(--typing-box-background-color);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin: 2rem 0 1rem 0;
  overflow: hidden;
  outline: none;
  border-radius: 15px;
`;
const TextContainer = styled.div<TextContainerProps>`
  width: 100%;
  transform: translateY(-${(props) => props.$translateY}px);
  transition: transform 0.3s ease; // Ajoutez une transition pour un effet de défilement fluide

  padding: 1.2rem;
`;

const LineContainer = styled.span`
  display: flex;
  margin-bottom: 1.5rem;
`;
const WordContainer = styled.div`
  display: flex;
  height: 25px;
`;

const CharBox = styled.div<CharBoxProps>`
  display: flex;
  width: 18px;
  margin: 0 1px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  height: 25px;
  background-color: ${(props) => {
    switch (props.$status) {
      case "current":
        return "#57D6FE";
      case "correct":
        return "#AEFD9A";
      case "incorrect":
        return "#FD9AA6";
      default:
        return "";
    }
  }};
`;

const TypingBox: React.FC = () => {
  const [isDeadKey, setIsDeadKey] = useState<boolean>(false);
  const [deadKeyChar, setDeadKeyChar] = useState<string>("");
  const [currentCharPosition, setCurrentCharPosition] = useState(0);
  const [charStatuses, setCharStatuses] = useState<CharStatus>({});
  const [containerWidth, setContainerWidth] = useState(0);
  const [lines, setLines] = useState<LineType[]>([]);
  const [isFirstChar, setIsFirstChar] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const loadingStatus = useSelector((state: RootState) => state.texts.status);
  const dispatch = useAppDispatch();
  const text = useSelector(selectText);
  const typingBoxRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const charMargin = 1;
  const charWidth = 18 + 2 * charMargin;
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [translateY, setTranslateY] = useState(0);
  const lineHeight = 49;
  const typingStats = useSelector((state: RootState) => state.stats);
  const endTime = typingStats.endingTime ?? (isFirstChar ? null : Date.now());
  const showTypingResult = isTypingComplete && endTime !== null;
  const totalChars = useSelector((state: RootState) => state.stats.totalChars);

  const numberOfCharsPossibleInLine = useMemo(() => {
    const paddingRem = 1.2 * 16;
    const usableTypingBoxWidth = containerWidth - 2 * paddingRem;
    return Math.floor(usableTypingBoxWidth / charWidth);
  }, [containerWidth, charWidth]);

  useEffect(() => {
    if (loadingStatus === "succeeded" && typingBoxRef.current) {
      typingBoxRef.current.focus();
    }
  }, [loadingStatus]);

  useEffect(() => {
    dispatch(fetchTexts());
  }, [dispatch]);

  useEffect(() => {
    if (text) {
      const totalChars = text.length;
      dispatch(setTotalChars(totalChars));
    }
  }, [text, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (typingBoxRef.current) {
        setContainerWidth(typingBoxRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [typingBoxRef]);

  useEffect(() => {
    lineRefs.current = lineRefs.current.slice(0, lines.length);
  }, [lines]);

  function createNewLine(newLines: LineType[], currentLine: WordWithIndex[]) {
    if (currentLine.length > 0) {
      newLines.push({ line: currentLine, lineIndex: newLines.length });
    }
  }

  const createLinesAndStartIndices = useCallback(
    (words: string[], numberOfCharsPossibleInLine: number) => {
      const newLines: LineType[] = [];
      let currentLine: WordWithIndex[] = [];
      let currentLineLength = 0;
      let charIndex = 0;

      words.forEach((word) => {
        const wordLength = word.length + 1;

        if (currentLineLength + wordLength <= numberOfCharsPossibleInLine) {
          currentLine.push({ word, startIndex: charIndex });
          currentLineLength += wordLength;
          charIndex += wordLength;
        } else {
          createNewLine(newLines, currentLine);
          currentLine = [{ word, startIndex: charIndex }];
          currentLineLength = wordLength;
          charIndex += wordLength;
        }
      });

      createNewLine(newLines, currentLine);
      return newLines;
    },
    []
  );

  useEffect(() => {
    const newLines = createLinesAndStartIndices(
      words,
      numberOfCharsPossibleInLine
    );

    if (JSON.stringify(newLines) !== JSON.stringify(lines)) {
      setLines(newLines);
    }
  }, [words, numberOfCharsPossibleInLine, lines, createLinesAndStartIndices]);

  const handleSpecialKeys = (key: string) => {
    if (key === "Dead") {
      if (isDeadKey) {
        setDeadKeyChar((prevChar) => prevChar + key);
      } else {
        setIsDeadKey(true);
        setDeadKeyChar(key);
      }
      return true;
    }

    return (
      key === "Shift" ||
      key === "CapsLock" ||
      key === "AltGraph" ||
      key === "Control"
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (isFirstChar) {
      dispatch(setStartTime(Date.now()));
      setIsFirstChar(false);
    }

    if (currentCharPosition + 1 === text.length) {
      dispatch(setEndingTime(Date.now()));
    }

    if (handleSpecialKeys(event.key)) {
      return;
    }

    if (currentCharPosition + 1 === text.length) {
      dispatch(setEndingTime(Date.now()));
      setIsTypingComplete(true);
    }

    const char = text.charAt(currentCharPosition);
    let newStatus = "incorrect";

    dispatch(updateCharsTyped(currentCharPosition + 1));

    let isCorrectChar = false;
    if (event.key === char || event.key === char.toUpperCase()) {
      newStatus = "correct";
      isCorrectChar = true;
    }

    if (isDeadKey) {
      const combinedChar = deadKeyChar + event.key;
      if (combinedChar === char) {
        newStatus = "correct";
        isCorrectChar = true;
      }
      setIsDeadKey(false);
      setDeadKeyChar("");
    }

    if (isCorrectChar) {
      // Mettre à jour le nombre de caractères corrects
      dispatch(updateCorrectChars(1));
    }

    setCharStatuses({
      ...charStatuses,
      [currentCharPosition]: newStatus,
    });
    setCurrentCharPosition(currentCharPosition + 1);

    const nextCharBox = typingBoxRef.current?.querySelector(
      `[data-charindex="${currentCharPosition + 1}"]`
    );
    if (nextCharBox && nextCharBox.getAttribute("data-firstchar") === "true") {
      setTranslateY((prevTranslateY) => prevTranslateY + lineHeight);
    }
  };

  const getCharStatus = (charIndex: number): string | null => {
    if (charIndex === currentCharPosition) {
      return "current";
    }
    return charStatuses[charIndex] || null;
  };

  const wordSplitter = (
    word: string,
    startIndex: number,
    wordIndex: number,
    lineIndex: number,
    isLastWordInText: boolean
  ): JSX.Element[] => {
    const chars = word.split("").map((char, charIndex) => {
      const absoluteCharIndex = startIndex + charIndex;
      const charStatus = getCharStatus(absoluteCharIndex);
      const isFirstChar =
        lineIndex >= 6 &&
        lineIndex < lines.length - 2 &&
        wordIndex === 0 &&
        charIndex === 0;

      return (
        <CharBox
          key={`char-${lineIndex}-${wordIndex}-${charIndex}`}
          $status={charStatus}
          $charIndex={charIndex}
          $wordIndex={wordIndex}
          $lineIndex={lineIndex}
          data-charindex={absoluteCharIndex}
          {...(isFirstChar ? { "data-firstchar": "true" } : {})}
        >
          {char}
        </CharBox>
      );
    });
    if (!isLastWordInText) {
      chars.push(
        <CharBox
          key={`space-${lineIndex}-${wordIndex}`}
          $lineIndex={lineIndex}
          $wordIndex={wordIndex}
          $charIndex={word.length}
          $status={getCharStatus(startIndex + word.length)}
          data-charindex={startIndex + word.length}
        >
          {" "}
        </CharBox>
      );
    }
    return chars;
  };
console.log(currentCharPosition)
console.log(totalChars)
  return (
    <TypingBoxContainer
      ref={typingBoxRef}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {showTypingResult ? (
        <TypingResultDisplay
          totalChars={typingStats.totalChars}
          correctChars={typingStats.correctChars}
          startTime={typingStats.startTime}
          endTime={endTime}
        />
      ) : (
        <TextContainer $translateY={translateY}>
          {lines.map(({ line, lineIndex }, lineArrayIndex, linesArray) => (
            <LineContainer
              className="line"
              key={`line-${lineIndex}`}
              ref={(el) => (lineRefs.current[lineIndex] = el)}
            >
              {line.map(({ word, startIndex }, wordIndex, wordArray) => (
                <WordContainer key={`word-${lineIndex}-${wordIndex}`}>
                  {wordSplitter(
                    word,
                    startIndex,
                    wordIndex,
                    lineIndex,
                    lineArrayIndex === linesArray.length - 1 &&
                      wordIndex === wordArray.length - 1
                  )}
                </WordContainer>
              ))}
            </LineContainer>
          ))}
        </TextContainer>
      )}
      <ProgressBar
        totalChars={totalChars}
        currentCharPosition={currentCharPosition}
      />
    </TypingBoxContainer>
  );
};

export default TypingBox;
