import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { fetchTexts } from "../../features/text/textThunk";
import { selectText } from "../../features/text/textSlice";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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

const CharBox = styled.div`
  display: flex;
  width: 20px;
  background-color: #dcfcd4;
  margin: 0 1px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  height: 25px;
`;

const SmallBox = styled(CharBox)`
  width: 8px;
`;

const TypingBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const text = useSelector(selectText);

  useEffect(() => {
    dispatch(fetchTexts());
  }, [dispatch]);

  const words = text.split(" ");

  const handleBoxSizing = (char: string) => {
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
        return <SmallBox key={uuidv4()}>{char}</SmallBox>;
      default:
        return <CharBox key={uuidv4()}>{char}</CharBox>;
    }
  };

  return (
    <TypingBoxContainer>
      {words.map((word, index) => {
        const characters = word.split("");
        return (
          <React.Fragment key={uuidv4()}>
            <WordContainer>
              {characters.map((char) => handleBoxSizing(char))}
            </WordContainer>
            {index !== words.length - 1 && <SmallBox />}
          </React.Fragment>
        );
      })}
    </TypingBoxContainer>
  );
};

export default TypingBox;
