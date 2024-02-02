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
import { selectText } from "../../features/text/textSlice";
import {
  setTotalChars,
  updateCorrectChars,
  updateCharsTyped,
  setStartTime,
  setEndingTime,
  setIsFirstChar,
  setStatsUpdated,
  resetTypingStats,
} from "../../features/typingStats/typingStatsSlice";
import {
  setCharStatus,
  setCurrentCharPosition,
  setIsTypingComplete,
  setTranslateY,
  resetSession,
  setExiting,
  setSelectedLevel,
} from "../../features/typingSession/typingSessionSlice";

import TypingResultDisplay from "../TypingResultDisplay";
import ProgressBar from "../ProgressBar";
import StartTypingSignal from "../StartTypingSignal";
import Loader from "../Loader";
import { fetchTexts } from "../../features/text/textThunk";
import CardLevelSelect from "../LevelSelector";
import { updateSessionStatsThunk } from "../../features/typingStats/statsThunk";
import { calculateDurationInSeconds } from "../../utils/calculateTypingStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faForward } from "@fortawesome/free-solid-svg-icons";
import EasyLogo from "../../assets/easy_icon- 1.svg";
import MediumLogo from "../../assets/medium_icon- 1.svg";
import HardLogo from "../../assets/hard_icon- 1.svg";

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

interface TextContainerProps {
  $translateY: number;
}

const TypingBoxWrapper = styled.div`
  position: relative;
  width: 80%;
`;
const TypingBoxContainer = styled.div`
  position: relative;
  z-index: 2;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  height: 310px;
  background-color: var(--typing-box-background-color);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin: 4rem 0 2rem;
  overflow: hidden;
  outline: none;
  border-radius: 15px;
`;
const SlideButton = styled.button`
  position: absolute;
  right: -50px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 0 10px 10px 0;
  background-color: var(--light-grey-color);
  color: white;
  font-size: 1.5rem;
  box-shadow: 0px 10px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  transform: translateX(0); // Position initiale
  transition: transform 0.3s ease, background-color 0.3s ease, width 0.3s ease;

  &:hover {
    background-color: var(--grey-color);
    width: 60px;
    transform: translateX(10px); // Déplacez le bouton sur le côté au survol
  }
`;
const SlideButtonIconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NextButton = styled(SlideButton)`
  top: 80px;
`;
const RedoButton = styled(SlideButton)`
  top: 140px;
`;
const SelectedLevelButton = styled(SlideButton)`
  top: 200px;
  img {
    width: 30px;
    height: 30px;
  }
`;
const TextContainer = styled.div<TextContainerProps>`
  width: 100%;
  transform: translateY(-${(props) => props.$translateY}px);
  transition: transform 0.3s ease;

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
  const dispatch = useAppDispatch();

  //GLOBAL STATES
  const text = useSelector(selectText);
  const textTitle = useSelector((state: RootState) => state.texts.title);

  const totalChars = useSelector((state: RootState) => state.stats.totalChars);
  const currentCharPosition = useSelector(
    (state: RootState) => state.session.currentCharPosition
  );
  const charStatuses = useSelector(
    (state: RootState) => state.session.charStatuses
  );
  const isTypingComplete = useSelector(
    (state: RootState) => state.session.isTypingComplete
  );
  const translateY = useSelector(
    (state: RootState) => state.session.translateY
  );
  const isFirstChar = useSelector(
    (state: RootState) => state.stats.isFirstChar
  );
  const loadingStatus = useSelector((state: RootState) => state.texts.status);
  const typingStats = useSelector((state: RootState) => state.stats);

  const selectedLevel = useSelector(
    (state: RootState) => state.session.selectedLevel
  );
  const statsUpdated = useSelector(
    (state: RootState) => state.stats.statsUpdated
  );
  const uid = useSelector((state: RootState) => state.login.user?.uid) ?? "";

  //LOCAL STATES
  const [isDeadKey, setIsDeadKey] = useState<boolean>(false);
  const [deadKeyChar, setDeadKeyChar] = useState<string>("");
  const [containerWidth, setContainerWidth] = useState(0);
  const [lines, setLines] = useState<LineType[]>([]);

  //REFS
  const typingBoxRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  //CONSTANTS
  const words = text.split(" ");
  const charMargin = 1;
  const charWidth = 18 + 2 * charMargin;
  const lineHeight = 49;
  const endTime = typingStats.endingTime ?? (isFirstChar ? null : Date.now());
  const timeInSecond = calculateDurationInSeconds(
    typingStats.startTime,
    endTime
  );

  const showTypingResult = isTypingComplete && endTime !== null;
  let selectedLevelLogo;
  if (selectedLevel === "easy") {
    selectedLevelLogo = EasyLogo;
  } else if (selectedLevel === "medium") {
    selectedLevelLogo = MediumLogo;
  } else {
    selectedLevelLogo = HardLogo;
  }

  //MEMOS
  const sessionStats = useMemo(
    () => ({
      totalChars: typingStats.totalChars,
      correctChars: typingStats.correctChars,
      date: new Date().toISOString(),
      timeInSecond: timeInSecond,
      wpm: typingStats.wpm,
      accuracy: typingStats.accuracy,
      level: selectedLevel ?? undefined,
      textTitle: textTitle ?? undefined,
    }),
    [typingStats, selectedLevel, timeInSecond, textTitle]
  );

  const numberOfCharsPossibleInLine = useMemo(() => {
    const paddingRem = 1.2 * 16;
    const usableTypingBoxWidth = containerWidth - 2 * paddingRem;
    return Math.floor(usableTypingBoxWidth / charWidth);
  }, [containerWidth, charWidth]);

  //EFFECTS
  useEffect(() => {
    if (loadingStatus === "succeeded" && typingBoxRef.current) {
      typingBoxRef.current.focus();
    }
  }, [loadingStatus]);

  useEffect(() => {
    dispatch(fetchTexts(selectedLevel));
  }, [dispatch, selectedLevel]);

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

  useEffect(() => {
    if (
      isTypingComplete &&
      typingStats.wpm !== 0 &&
      typingStats.accuracy !== 0 &&
      !statsUpdated
    ) {
      dispatch(updateSessionStatsThunk({ userId: uid, sessionStats }));
      dispatch(setStatsUpdated(true));
    }
  }, [
    isTypingComplete,
    typingStats.wpm,
    typingStats.accuracy,
    statsUpdated,
    uid,
    dispatch,
    sessionStats,
  ]);

  //CALLBACKS
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

  //HANDLERS
  const handleKeyPress = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (isFirstChar) {
      dispatch(setStartTime(Date.now()));
      dispatch(setIsFirstChar(false));
    }

    if (currentCharPosition + 1 === text.length) {
      dispatch(setEndingTime(Date.now()));
    }

    if (handleSpecialKeys(event.key)) {
      return;
    }

    if (currentCharPosition + 1 === text.length) {
      dispatch(setEndingTime(Date.now()));
      dispatch(setIsTypingComplete(true));
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
      dispatch(updateCorrectChars(1));
    }

    dispatch(
      setCharStatus({
        ...charStatuses,
        [currentCharPosition]: newStatus,
      })
    );

    dispatch(setCurrentCharPosition(currentCharPosition + 1));

    const nextCharBox = typingBoxRef.current?.querySelector(
      `[data-charindex="${currentCharPosition + 1}"]`
    );
    if (nextCharBox && nextCharBox.getAttribute("data-firstchar") === "true") {
      const newTranslateY = translateY + lineHeight;
      dispatch(setTranslateY(newTranslateY));
    }
  };

  const getCharStatus = (charIndex: number): string | null => {
    if (charIndex === currentCharPosition) {
      return "current";
    }
    return charStatuses[charIndex] || null;
  };

  const handleReset = () => {
    dispatch(setExiting(true));
    setTimeout(() => {
      dispatch(resetSession());
      dispatch(resetTypingStats());
      dispatch(setTranslateY(0));
      dispatch(setExiting(false));
      dispatch(setIsFirstChar(true));
      typingBoxRef.current?.focus();
    }, 1000);
  };

  const handleNext = () => {
    dispatch(setExiting(true));
    setTimeout(() => {
      dispatch(resetSession());
      dispatch(resetTypingStats());
      dispatch(setTranslateY(0));
      dispatch(fetchTexts(selectedLevel));
      dispatch(setExiting(false));
      dispatch(setIsFirstChar(true));
      typingBoxRef.current?.focus();
    }, 1000);
  };

  const handleOnClickSettings = () => {
    dispatch(setSelectedLevel(null));
  };

  //RENDER
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
        lineIndex >= 4 &&
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

  return (
    <TypingBoxWrapper>
      <TypingBoxContainer
        ref={typingBoxRef}
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        {selectedLevel === null ? (
          <CardLevelSelect />
        ) : (
          loadingStatus === "loading" && <Loader />
        )}
        {showTypingResult ? (
          <TypingResultDisplay
            totalChars={typingStats.totalChars}
            correctChars={typingStats.correctChars}
            startTime={typingStats.startTime}
            endTime={endTime}
            typingBoxRef={typingBoxRef}
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
      <StartTypingSignal $shouldExit={typingStats.startTime != null} />
      <RedoButton onClick={handleReset}>
        <SlideButtonIconContainer>
          <FontAwesomeIcon icon={faRedo} />
        </SlideButtonIconContainer>
      </RedoButton>
      <NextButton onClick={handleNext}>
        <SlideButtonIconContainer>
          <FontAwesomeIcon icon={faForward} />
        </SlideButtonIconContainer>
      </NextButton>
      <SelectedLevelButton onClick={handleOnClickSettings}>
        <SlideButtonIconContainer>
          {selectedLevelLogo && (
            <img src={selectedLevelLogo} alt="Selected Level" />
          )}
        </SlideButtonIconContainer>
      </SelectedLevelButton>
    </TypingBoxWrapper>
  );
};

export default TypingBox;
