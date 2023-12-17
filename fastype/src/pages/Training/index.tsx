import styled from "styled-components";
import Main from "../../layouts/MainContent";
import TypingBox from "../../components/TypingBox";
import AinsiKeyboard from "../../components/AinsiKeyboard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Title = styled.h2`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--grey-color);
`;
const SubTitle = styled.h3`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--grey-color);
`;
const Training: React.FC = () => {
  const userName = useSelector(
    (state: RootState) => state.login.user
  )?.firstName;

  return (
    <Main>
      <Title>Prêt pour l'entraînement {userName} ?</Title>
      <SubTitle>Commence par sélectionner ton niveau !</SubTitle>
      <TypingBox />
      <AinsiKeyboard />
    </Main>
  );
};

export default Training;
