import React from "react";
import styled from "styled-components";

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
`;

const WordContainer = styled.div`
  display: flex;
  white-space: nowrap;
`;

const CharBox = styled.div`
  display: flex;
  width: 20px;
  height: 25px;
  background-color: grey;
  margin: 0 1px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`;

const SmallBox = styled(CharBox)`
  width: 8px;
`;

const TypingBox: React.FC = () => {
  const text =
    "Dans une forêt lointaine, un renard agile nommé Raphaël courait à travers les arbres, esquivant les racines et sautant par-dessus les ruisseaux. Il aimait la sensation du vent dans sa fourrure et le doux parfum des fleurs sauvages. Chaque matin, Raphaël se lançait un défi : parcourir la forêt d'un ";
  const words = text.split(" ");

  return (
    <TypingBoxContainer>
      {words.map((word, index) => {
        const characters = word.split("");
        return (
          <React.Fragment key={word + index}>
            <WordContainer>
              {characters.map((char, index) => {
                if (
                  char === "." ||
                  char === "," ||
                  char === ";" ||
                  char === ":" ||
                  char === "!" ||
                  char === "'" ||
                  char === "i" ||
                  char === "l"
                ) {
                  return <SmallBox key={char + index}>{char}</SmallBox>;
                } else {
                  return <CharBox key={char + index}>{char}</CharBox>;
                }
              })}
            </WordContainer>
            {index !== words.length - 1 && <SmallBox />}
          </React.Fragment>
        );
      })}
    </TypingBoxContainer>
  );
};

export default TypingBox;
