import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectText } from "../../features/text/textSlice";
import { keyMap } from "./keyMap";
import IsoKeyboard from "./IsoKeyboard.tsx";
import styled from "styled-components";

const KeyboardContainer = styled.div`
  position: relative;
  width: 80%;
  margin-bottom: 3rem;
`;

const Keyboard = () => {
  const text = useSelector(selectText);

  const currentChar = text.charAt(
    useSelector((state: RootState) => state.session.currentCharPosition)
  );

  const [highlightedId, setHighlightedId] = useState("");
  const [mod, setMod] = useState("");
  const [finger, setFinger] = useState("");

  useEffect(() => {
    // Determines the key information for the current character.
    let keyInfo;

    // Handles the space character separately from other characters.
    if (currentChar !== " ") {
      keyInfo = keyMap[currentChar];
    } else {
      keyInfo = keyMap["space"];
    }
    // Sets the state based on the current character's key information.
    if (keyInfo?.id) {
      setHighlightedId(keyInfo.id);
      setMod(keyInfo.mod ?? "");
      setFinger(keyInfo.finger ?? "");
    } else {
      // Resets the state if no key information is found.
      setHighlightedId("");
      setMod("");
      setFinger("");
    }
  }, [currentChar]);

  return (
    <KeyboardContainer>
      <IsoKeyboard highlightedId={highlightedId} mod={mod} finger={finger} />
    </KeyboardContainer>
  );
};

export default Keyboard;
