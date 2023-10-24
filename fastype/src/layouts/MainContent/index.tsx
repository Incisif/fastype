import styled from "styled-components";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 1228px;
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
`;
interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return <MainContent>{children}</MainContent>;
};

export default Main;
