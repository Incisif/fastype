import styled from "styled-components";

const KeyboardContainer = styled.div`
  position: relative;
  width: 80%;
margin-bottom: 2rem;
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

const StandartKeyboardKey = styled(Keys)`
  width: 62px;
  justify-content: center;
  align-items: center;
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
const SemiLargeKey = styled(Keys)`
  justify-content: center;
  align-items: center;
  width: 80px;
`;

const RightMajorKey = styled(Keys)`
justify-content: center;
align-items: center;
  flex-grow: 1;
`;
const SpaceBar = styled(Keys)`
  flex-grow: 1;
`;

const EnterKey = styled.div`
  position: absolute;
  right: 0;
  top: 66px;
  width: 80px;
  height: 128px;
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
const TripleSymbolKey = styled(Keys)`
  width: 62px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
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
const DoubleSymbolKey = styled(Keys)`
  flex-direction: column;
  justify-content: space-between;
  width: 62px;
  padding: 7px 10px;
`;

const Keyboard = () => {
  return (
    <KeyboardContainer>
      <FirstLineContainer>
        <StandartKeyboardKey>ESC</StandartKeyboardKey>
        <DoubleSymbolKey>
          <StyledSymbol>1</StyledSymbol>
          <StyledSymbol>&</StyledSymbol>
        </DoubleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>2</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>é</StyledSymbol>
            <StyledSymbol>~</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>3</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>"</StyledSymbol>
            <StyledSymbol>#</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>4</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>'</StyledSymbol>
            <StyledSymbol>{"{"}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>5</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>{"("}</StyledSymbol>
            <StyledSymbol>{"["}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>6</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>-</StyledSymbol>
            <StyledSymbol>|</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>7</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>è</StyledSymbol>
            <StyledSymbol>`</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>8</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>_</StyledSymbol>
            <StyledSymbol>\</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>9</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>ç</StyledSymbol>
            <StyledSymbol>^</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>0</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>à</StyledSymbol>
            <StyledSymbol>@</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
          <TripleSymbolKeyTop>
            <StyledSymbol>°</StyledSymbol>
          </TripleSymbolKeyTop>
          <TripleSymbolKeyBottom>
            <StyledSymbol>{")"}</StyledSymbol>
            <StyledSymbol>{"]"}</StyledSymbol>
          </TripleSymbolKeyBottom>
        </TripleSymbolKey>
        <TripleSymbolKey>
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
        <StandartKeyboardKey>A</StandartKeyboardKey>
        <StandartKeyboardKey>Z</StandartKeyboardKey>
        <StandartKeyboardKey>E</StandartKeyboardKey>
        <StandartKeyboardKey>R</StandartKeyboardKey>
        <StandartKeyboardKey>T</StandartKeyboardKey>
        <StandartKeyboardKey>Y</StandartKeyboardKey>
        <StandartKeyboardKey>U</StandartKeyboardKey>
        <StandartKeyboardKey>I</StandartKeyboardKey>
        <StandartKeyboardKey>O</StandartKeyboardKey>
        <StandartKeyboardKey>P</StandartKeyboardKey>
        <DoubleSymbolKey>
          <StyledSymbol>¨</StyledSymbol>
          <StyledSymbol>^</StyledSymbol>
        </DoubleSymbolKey>
        <TripleSymbolKey>
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
        <StandartKeyboardKey>Q</StandartKeyboardKey>
        <StandartKeyboardKey>S</StandartKeyboardKey>
        <StandartKeyboardKey>D</StandartKeyboardKey>
        <StandartKeyboardKey>F</StandartKeyboardKey>
        <StandartKeyboardKey>G</StandartKeyboardKey>
        <StandartKeyboardKey>H</StandartKeyboardKey>
        <StandartKeyboardKey>J</StandartKeyboardKey>
        <StandartKeyboardKey>K</StandartKeyboardKey>
        <StandartKeyboardKey>L</StandartKeyboardKey>
        <StandartKeyboardKey>M</StandartKeyboardKey>
        <DoubleSymbolKey>
          <StyledSymbol>%</StyledSymbol>
          <StyledSymbol>ù</StyledSymbol>
        </DoubleSymbolKey>
        <DoubleSymbolKey>
          <StyledSymbol>µ</StyledSymbol>
          <StyledSymbol>*</StyledSymbol>
        </DoubleSymbolKey>
      </ThirdLineContainer>
      <FourthLineContainer>
        <SemiLargeKey>SHIFT</SemiLargeKey>
        <DoubleSymbolKey>
          <StyledSymbol>{">"}</StyledSymbol>
          <StyledSymbol>{"<"}</StyledSymbol>
        </DoubleSymbolKey>
        <StandartKeyboardKey>W</StandartKeyboardKey>
        <StandartKeyboardKey>X</StandartKeyboardKey>
        <StandartKeyboardKey>C</StandartKeyboardKey>
        <StandartKeyboardKey>V</StandartKeyboardKey>
        <StandartKeyboardKey>B</StandartKeyboardKey>
        <StandartKeyboardKey>N</StandartKeyboardKey>
        <DoubleSymbolKey>
          <StyledSymbol>?</StyledSymbol>
          <StyledSymbol>,</StyledSymbol>
        </DoubleSymbolKey>{" "}
        <DoubleSymbolKey>
          <StyledSymbol>.</StyledSymbol>
          <StyledSymbol>;</StyledSymbol>
        </DoubleSymbolKey>{" "}
        <DoubleSymbolKey>
          <StyledSymbol>/</StyledSymbol>
          <StyledSymbol>:</StyledSymbol>
        </DoubleSymbolKey>{" "}
        <DoubleSymbolKey>
          <StyledSymbol>§</StyledSymbol>
          <StyledSymbol>!</StyledSymbol>
        </DoubleSymbolKey>
        <RightMajorKey>SHIFT</RightMajorKey>
      </FourthLineContainer>
      <FifthLineContainer>
        <SemiLargeKey>Ctrl</SemiLargeKey>
        <SemiLargeKey></SemiLargeKey>
        <SemiLargeKey>Alt</SemiLargeKey>
        <SpaceBar></SpaceBar>
        <SemiLargeKey>Alt Gr</SemiLargeKey>
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
