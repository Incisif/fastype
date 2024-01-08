import styled, { css, keyframes } from "styled-components";
import Main from "../../layouts/MainContent";
import TypingBox from "../../components/TypingBox";
import AinsiKeyboard from "../../components/AinsiKeyboard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  $hide?: boolean;
}

const slideUp = keyframes`
  0% {
   ;
    opacity: 1;
    ; 
  }50%{max-height: 150;}
  100%{
    ;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
`;
const trnaslateUp = keyframes`
    0% {
        transform: translateY(0%);
    }
    100%{
        transform: translateY(-100px);
    }
    `;

    const TrainingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
const TitleContainer = styled.div<Props>`
  width: 100%;
  overflow: hidden;
  height: 100px;
  text-align: center;

  ${(props) =>
    props.$hide &&
    css`
      animation: ${slideUp} 2s ease forwards;
    `}
`;
const Title = styled.h2<Props>`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark-blue-color);
  ${(props) =>
    props.$hide &&
    css`
      animation: ${trnaslateUp} 2s ease forwards;
    `}
`;
const SubTitle = styled.h3<Props>`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-blue-color);
  ${(props) =>
    props.$hide &&
    css`
      animation: ${trnaslateUp} 2s ease forwards;
    `}
`;
const Training: React.FC = () => {
  const selectedLevel = useSelector(
    (state: RootState) => state.session.selectedLevel
  );
  const isLevelSelected = !!selectedLevel;
  const userName = useSelector(
    (state: RootState) => state.login.user
  )?.firstName;

  return (
    <Main>
      <TrainingContainer>
      <TitleContainer $hide={isLevelSelected}>
        <Title $hide={isLevelSelected}>
          Prêt pour l'entraînement {userName} ?
        </Title>
        <SubTitle $hide={isLevelSelected}>
          Commence par sélectionner ton niveau !
        </SubTitle>
      </TitleContainer>

      <TypingBox />
      <AinsiKeyboard />
      </TrainingContainer>
    </Main>
  );
};

export default Training;
