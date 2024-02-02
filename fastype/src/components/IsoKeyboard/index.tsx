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
    let keyInfo;

    if (currentChar !== " ") {
      keyInfo = keyMap[currentChar];
    } else {
      keyInfo = keyMap["space"];
    }

    if (keyInfo?.id) {
      setHighlightedId(keyInfo.id);
      setMod(keyInfo.mod ?? "");
      setFinger(keyInfo.finger ?? "");
    } else {
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
