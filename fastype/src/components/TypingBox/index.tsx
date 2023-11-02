import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { fetchTexts } from "../../features/text/textThunk";
import { selectText } from "../../features/text/textSlice";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

interface CharBoxProps {
  $status: string | null;
}

const TypingBoxContainer = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: 400px;
  background-color: #faf8f8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 2rem 0;
  padding: 1rem;
  overflow: hidden;
`;

const WordContainer = styled.div`
  display: flex;
  white-space: nowrap;
  line-height: 1;
  margin-bottom: 2rem;
  height: 25px;
`;

const CharBox = styled.div<CharBoxProps>`
  display: flex;
  width: 20px;
  margin: 0 1px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  height: 25px;
  background-color: ${(props) => {
    switch (props.$status) {
      case "current":
        return "#add8e6"; // bleu
      case "correct":
        return "#00ff00"; // vert
      case "incorrect":
        return "#ff0000"; // rouge
      default:
        return "#dcfcd4";
    }
  }};
`;

const SmallBox = styled(CharBox)`
  width: 8px;
`;

const TypingBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const text = useSelector(selectText);
  const [currentCharPosition, setCurrentCharPosition] = useState(0);
  const [charStatuses, setCharStatuses] = useState<Record<number, string>>({});

  const typingBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchTexts());
    if (typingBoxRef.current) {
      typingBoxRef.current.focus();
    }
  }, [dispatch]);

  const [accent, setAccent] = useState<string | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    event.preventDefault(); // Empêcher les comportements par défaut des touches comme la navigation du navigateur
    console.log("event.key:", event.key);
    console.log("event.ctrlKey:", event.ctrlKey);

    // Ignorer l'événement si l'utilisateur a appuyé sur Shift ou Control seulement
    if (
      event.key === "Shift" ||
      event.key === "Control" ||
      event.ctrlKey ||
      event.altKey ||
      event.key === "AltGraph"
    ) {
      return;
    }

    const char = text.charAt(currentCharPosition);
    let expectedKey = char;

    if (accent) {
      expectedKey = accent + char;
    }

    if (event.key.length === 1 && RegExp(/[\^¨]/).exec(event.key)) {
      // Si l'utilisateur a appuyé sur une touche d'accent
      setAccent(event.key);
    } else {
      setAccent(null); // Réinitialiser l'accent pour les futurs caractères
      if (event.shiftKey) {
        expectedKey = expectedKey.toUpperCase();
      }

      const newStatus = event.key === expectedKey ? "correct" : "incorrect";
      setCharStatuses({
        ...charStatuses,
        [currentCharPosition]: newStatus,
      });
      setCurrentCharPosition((prev) => prev + 1);
    }
  };
  const words = text.split(" ");

  const handleBoxSizing = (char: string, status: string | null) => {
    switch (char) {
      case ".":
      case ",":
      case ";":
      case ":":
      case "!":
      case "'":
      case "i":
      case "l":
      case "I":
      case "t":
      case "j":
        return (
          <SmallBox key={uuidv4()} $status={status}>
            {char}
          </SmallBox>
        );
      default:
        return (
          <CharBox key={uuidv4()} $status={status}>
            {char}
          </CharBox>
        );
    }
  };
  interface Accumulator {
    elements: JSX.Element[];
    absoluteCharIndex: number;
  }
  return (
    <TypingBoxContainer
      ref={typingBoxRef}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {
        words.reduce<Accumulator>(
          (acc, word, index) => {
            const characters = word.split("");
            const elements = [
              ...acc.elements,
              <React.Fragment key={uuidv4()}>
                <WordContainer>
                  {characters.map((char, charIndex) => {
                    const absoluteCharIndex = acc.absoluteCharIndex + charIndex;
                    const status =
                      charStatuses[absoluteCharIndex] ||
                      (absoluteCharIndex === currentCharPosition
                        ? "current"
                        : null);
                    return handleBoxSizing(char, status);
                  })}
                </WordContainer>
                {index !== words.length - 1 && (
                  <>
                    <SmallBox
                      $status={
                        charStatuses[acc.absoluteCharIndex + word.length] ||
                        (acc.absoluteCharIndex + word.length ===
                        currentCharPosition
                          ? "current"
                          : null)
                      }
                    />
                  </>
                )}
              </React.Fragment>,
            ];
            return {
              elements: elements,
              absoluteCharIndex: acc.absoluteCharIndex + word.length + 1, // +1 pour l'espace
            };
          },
          { elements: [], absoluteCharIndex: 0 }
        ).elements
      }
    </TypingBoxContainer>
  );
};

export default TypingBox;
