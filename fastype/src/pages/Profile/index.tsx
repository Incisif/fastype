import Main from "../../layouts/MainContent";
import styled from "styled-components";


const StyledProfile = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  height: 310px;
  width: 80%;
  background-color: var(--typing-box-background-color);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin: 2rem 0 1rem 0;
  overflow: hidden;
  outline: none;
  border-radius: 15px;
`;
const Profile: React.FC = () => {
  return (
    <Main>
      <StyledProfile>
 
      </StyledProfile>
    </Main>
  );
};

export default Profile;
