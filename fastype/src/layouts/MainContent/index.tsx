import styled from "styled-components";
import "../../fonts/font.css"
import { device } from "../../styles/breakpoints";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 17.5rem);
  width: 100vw;
  max-width: 1228px;
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  @media ${device.sm} {
    min-height: calc(100vh - 16.25rem);
  }
`;
interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return <MainContent>{children}</MainContent>;
};

export default Main;
