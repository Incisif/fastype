import styled from "styled-components";
const HeaderContent = styled.div`
width: 100vw;
height: 100px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #1a1a1a;`;
const Header: React.FC = () => {
  return <HeaderContent></HeaderContent>;
};
export default Header;
