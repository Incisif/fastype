import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectText } from "../../features/text/textSlice";
import { keyMap } from "./keyMap";

interface KeyStyle {
  $highlight: boolean;
  $finger?: string;
}

const KeyboardContainer = styled.div`
  position: relative;
  width: 80%;
  margin-bottom: 2rem;
  margin-top: 1.8rem;
`;
const LineContainer = styled.div`
  display: flex;
  gap: 4px;
`;
const Keys = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: #e9e9e9;
  height: 62px;
  color: #9c9c9c;
`;
const FirstLineContainer = styled(LineContainer)``;

const SecondLineContainer = styled(LineContainer)`
  margin-top: 4px;
`;
const ThirdLineContainer = styled(LineContainer)`
  margin-top: 4px;
`;
const FourthLineContainer = styled(LineContainer)`
  margin-top: 4px;
`;
const FifthLineContainer = styled(LineContainer)`
  margin-top: 4px;
`;

const StandartKeyboardKey = styled(Keys)<KeyStyle>`
  width: 62px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: ${(props) =>
    getBackgroundColor(props.$highlight, props.$finger)};
`;

const DoubleWidthKey = styled(Keys)`
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 62px;
`;
const TabKey = styled(Keys)`
  justify-content: center;
  align-items: center;
  width: 94px;
`;
const SemiLargeKey = styled(Keys)<KeyStyle>`
  justify-content: center;
  align-items: center;
  width: 80px;
  background-color: ${(props) => (props.$highlight ? "#99E9E5" : "#e9e9e9")};
`;

const RightMajorKey = styled(Keys)<KeyStyle>`
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: ${(props) => (props.$highlight ? "#99E9E5" : "#e9e9e9")};
`;

const LeftMajorKey = styled(SemiLargeKey)<KeyStyle>`
  background-color: ${(props) => (props.$highlight ? "#99E9E5" : "#e9e9e9")};
`;

const SpaceBar = styled(Keys)<KeyStyle>`
  flex-grow: 1;
  background-color: ${(props) => (props.$highlight ? "#99E9E5" : "#e9e9e9")};
`;

const EnterKey = styled.div`
  position: absolute;
  right: 0;
  top: 66px;
  width: 80px;
  height: 128px;
`;
const EscacpeKey = styled(Keys)`
  width: 62px;
  justify-content: center;
  align-items: center;
`;
const TopEnterKey = styled(Keys)`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 92px;
  border-radius: 5px 5px 0 5px;
`;
const BottomEnterKey = styled(Keys)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 62px;
  height: 66px;
  border-radius: 0 0 5px 5px;
`;
const StyledSymbol = styled.span`
  font-size: 1.1rem;
`;
const TripleSymbolKey = styled(Keys)<KeyStyle>`
  width: 62px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: ${(props) => (props.$highlight ? "#99E9E5" : "#e9e9e9")};
`;
const TripleSymbolKeyTop = styled.div`
  grid-row: 1;
  grid-column: 1 / span 2;
  text-align: left;
  padding-left: 10px;
`;
const TripleSymbolKeyBottom = styled.div`
  grid-row: 2;
  grid-column: 1 / -1; /* Étend sur toutes les colonnes */
  display: flex;
  justify-content: space-between; /* Alignement horizontal */
  padding: 0 10px; /* Ajustez selon vos besoins */
`;
const DoubleSymbolKey = styled(Keys)<KeyStyle>`
  flex-direction: column;
  justify-content: space-between;
  width: 62px;
  padding: 7px 10px;
  background-color: ${(props) => (props.$highlight ? "#99E9E5" : "#e9e9e9")};
`;

const getBackgroundColor = (highlight: boolean, finger?: string) => {
  if (highlight) {
    switch (finger) {
      case "left-pinky": // auriculaire
        return "#C9C8FF";
      case "left-ring": // annulaire
        return "#ACF3C7";
      case "left-middle": // majeur
        return "#FFBDCA";
      case "left-index": // index
        return "#99E9E5";
      case "right-pinky": // auriculaire
        return "#C9C8FF";
      case "right-ring": // annulaire
        return "#ACF3C7";
      case "right-middle": // majeur
        return "#FFBDCA";
      case "right-index": // index
        return "#FFEB99";
      default:
        return "#99E9E5";
    }
  } else {
    return "#e9e9e9"; // Couleur par défaut
  }
};

const Keyboard: React.FC = () => {
  const text = useSelector(selectText);
  const currentChar = text.charAt(
    useSelector((state: RootState) => state.session.currentCharPosition)
  );


  const shouldHighlightKey = (keyChar: string) => {
    const currentKeyInfo = keyMap[currentChar];

    return (
      keyChar === currentChar ||
      (currentKeyInfo && keyChar === currentKeyInfo.mod)
    );
  };

  return (
    <KeyboardContainer>
      <FirstLineContainer>
        <EscacpeKey>ESC</EscacpeKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("1") || shouldHighlightKey("&")}
          $finger={"left-pinky"}
        >
          <StyledSymbol>1</StyledSymbol>
          <StyledSymbol>&</StyledSymbol>
        </DoubleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("2") ||
            shouldHighlightKey("é") ||
            shouldHighlightKey("~")
          }
          $finger="left-pinky"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>2</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>é</StyledSymbol>
            <StyledSymbol>~</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("3") ||
            shouldHighlightKey('"') ||
            shouldHighlightKey("#")
          }
          $finger="left-ring"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>3</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>"</StyledSymbol>
            <StyledSymbol>#</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("4") ||
            shouldHighlightKey("'") ||
            shouldHighlightKey("{")
          }
          $finger="left-middle"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>4</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>'</StyledSymbol>
            <StyledSymbol>{"{"}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("5") ||
            shouldHighlightKey("(") ||
            shouldHighlightKey("[")
          }
          $finger="left-index"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>5</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>{"("}</StyledSymbol>
            <StyledSymbol>{"["}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("6") ||
            shouldHighlightKey("-") ||
            shouldHighlightKey("|")
          }
          $finger="left-index"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>6</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>-</StyledSymbol>
            <StyledSymbol>|</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("7") ||
            shouldHighlightKey("è") ||
            shouldHighlightKey("`")
          }
          $finger="right-index"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>7</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>è</StyledSymbol>
            <StyledSymbol>`</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("8") ||
            shouldHighlightKey("_") ||
            shouldHighlightKey("\\")
          }
          $finger="right-middle"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>8</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>_</StyledSymbol>
            <StyledSymbol>\</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={shouldHighlightKey("9") || shouldHighlightKey("ç")}
          $finger="right-ring"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>9</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>ç</StyledSymbol>
            <StyledSymbol>^</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("0") ||
            shouldHighlightKey("à") ||
            shouldHighlightKey("@")
          }
          $finger="right-pinky"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>0</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>à</StyledSymbol>
            <StyledSymbol>@</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("°") ||
            shouldHighlightKey(")") ||
            shouldHighlightKey("]")
          }
          $finger="right-pinky"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>°</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>{")"}</StyledSymbol>
            <StyledSymbol>{"]"}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("+") ||
            shouldHighlightKey("=") ||
            shouldHighlightKey("}")
          }
          $finger="right-pinky"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>+</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>=</StyledSymbol>
            <StyledSymbol>{"}"}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <DoubleWidthKey>BACK</DoubleWidthKey>
      </FirstLineContainer>
      <SecondLineContainer>
        <TabKey>TAB</TabKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("a") || shouldHighlightKey("A")}
          $finger="left-pinky"
        >
          A
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("z") || shouldHighlightKey("Z")}
          $finger="left-ring"
        >
          Z
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("e") || shouldHighlightKey("E")}
          $finger="left-middle"
        >
          E
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("r") || shouldHighlightKey("R")}
          $finger="left-index"
        >
          R
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("t") || shouldHighlightKey("T")}
          $finger="left-index"
        >
          T
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("y") || shouldHighlightKey("Y")}
          $finger="right-index"
        >
          Y
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("u") || shouldHighlightKey("U")}
          $finger="right-index"
        >
          U
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("i") || shouldHighlightKey("I")}
          $finger="right-middle"
        >
          I
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("o") || shouldHighlightKey("O")}
          $finger="right-ring"
        >
          O
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("p") || shouldHighlightKey("P")}
          $finger="right-pinky"
        >
          P
        </StandartKeyboardKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("¨") || shouldHighlightKey("^")}
          $finger="right-pinky"
        >
          <StyledSymbol>¨</StyledSymbol>
          <StyledSymbol>^</StyledSymbol>
        </DoubleSymbolKey>
        <TripleSymbolKey
          $highlight={
            shouldHighlightKey("£") ||
            shouldHighlightKey("$") ||
            shouldHighlightKey("¤")
          }
          $finger="right-pinky"
        >
          <TripleSymbolKeyTop>
            <StyledSymbol>£</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>$</StyledSymbol>
            <StyledSymbol>¤</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
      </SecondLineContainer>
      <ThirdLineContainer>
        <DoubleWidthKey>LOCK</DoubleWidthKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("q") || shouldHighlightKey("P")}
          $finger="left-pinky"
        >
          Q
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("s") || shouldHighlightKey("S")}
          $finger="left-ring"
        >
          S
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("d") || shouldHighlightKey("P")}
          $finger="left-middle"
        >
          D
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("f") || shouldHighlightKey("F")}
          $finger="left-index"
        >
          F
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("g") || shouldHighlightKey("G")}
          $finger="left-index"
        >
          G
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("h") || shouldHighlightKey("H")}
          $finger="right-index"
        >
          H
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("j") || shouldHighlightKey("J")}
          $finger="right-index"
        >
          J
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("k") || shouldHighlightKey("K")}
          $finger="right-middle"
        >
          K
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("l") || shouldHighlightKey("L")}
          $finger="right-ring"
        >
          L
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("m") || shouldHighlightKey("M")}
          $finger="right-pinky"
        >
          M
        </StandartKeyboardKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("%") || shouldHighlightKey("ù")}
          $finger="right-pinky"
        >
          <StyledSymbol>%</StyledSymbol>
          <StyledSymbol>ù</StyledSymbol>
        </DoubleSymbolKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("µ") || shouldHighlightKey("*")}
          $finger="right-pinky"
        >
          <StyledSymbol>µ</StyledSymbol>
          <StyledSymbol>*</StyledSymbol>
        </DoubleSymbolKey>
      </ThirdLineContainer>
      <FourthLineContainer>
        <LeftMajorKey
          $highlight={shouldHighlightKey("left-shift")}
          $finger="left-pinky"
        >
          SHIFT
        </LeftMajorKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey(">") || shouldHighlightKey("<")}
          $finger="left-pinky"
        >
          <StyledSymbol>{">"}</StyledSymbol>
          <StyledSymbol>{"<"}</StyledSymbol>
        </DoubleSymbolKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("w") || shouldHighlightKey("K")}
          $finger="left-pinky"
        >
          W
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("x") || shouldHighlightKey("X")}
          $finger="left-ring"
        >
          X
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("c") || shouldHighlightKey("C")}
          $finger="left-middle"
        >
          C
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("v") || shouldHighlightKey("V")}
          $finger="left-index"
        >
          V
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("b") || shouldHighlightKey("B")}
          $finger="left-index"
        >
          B
        </StandartKeyboardKey>
        <StandartKeyboardKey
          $highlight={shouldHighlightKey("n") || shouldHighlightKey("N")}
          $finger="right-index"
        >
          N
        </StandartKeyboardKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("?") || shouldHighlightKey(",")}
          $finger="right-index"
        >
          <StyledSymbol>?</StyledSymbol>
          <StyledSymbol>,</StyledSymbol>
        </DoubleSymbolKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey(".") || shouldHighlightKey(";")}
          $finger="right-middle"
        >
          <StyledSymbol>.</StyledSymbol>
          <StyledSymbol>;</StyledSymbol>
        </DoubleSymbolKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("/") || shouldHighlightKey(":")}
          $finger="right-ring"
        >
          <StyledSymbol>/</StyledSymbol>
          <StyledSymbol>:</StyledSymbol>
        </DoubleSymbolKey>
        <DoubleSymbolKey
          $highlight={shouldHighlightKey("§") || shouldHighlightKey("!")}
          $finger="right-pinky"
        >
          <StyledSymbol>§</StyledSymbol>
          <StyledSymbol>!</StyledSymbol>
        </DoubleSymbolKey>
        <RightMajorKey $highlight={shouldHighlightKey("right-shift")}
        $finger="right-pinky">
          SHIFT
        </RightMajorKey>
      </FourthLineContainer>
      <FifthLineContainer>
        <SemiLargeKey>Ctrl</SemiLargeKey>
        <SemiLargeKey></SemiLargeKey>
        <SemiLargeKey>Alt</SemiLargeKey>
        <SpaceBar $highlight={shouldHighlightKey(" ")}></SpaceBar>
        <SemiLargeKey $highlight={shouldHighlightKey("altGr")}>
          Alt Gr
        </SemiLargeKey>
        <SemiLargeKey></SemiLargeKey>
        <SemiLargeKey>Ctrl</SemiLargeKey>
      </FifthLineContainer>
      <EnterKey>
        <TopEnterKey className="top">Enter</TopEnterKey>
        <BottomEnterKey className="bottom"></BottomEnterKey>
      </EnterKey>
    </KeyboardContainer>
  );
};
export default Keyboard;
