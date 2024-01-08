import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/fastype_Logo.png";
import LoginModal from "../LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import DropDown from "../Dropdown";
import ThreeDButton from "../ThreeDButton/index";

const HeaderContent = styled.div`
font-family: "Roboto", sans-serif;
  width: 100vw;
  height: 80px;
  background-color: var(--white-color));
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  max-width: 1228px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  aspect-ratio: auto;
  align-self: flex-end;
`;

const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  font-style: italic;
  background: -webkit-linear-gradient(#6c95ff, #0e50fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #ffffff;
`;

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  color: var(--grey-color);
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 3rem;
  height: 100%;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;

const StyledLinks = styled(Link)`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1.2rem;
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 0 var(--shadow-connexion-button),
      0 0 0 1px var(--shadow-connexion-button);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: none;
  }
`;
const NavBarRight = styled.div`
  display: flex;
  align-items: center;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const MiddleContainer = styled.div``;
const RightContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;
const Flex ={"display": "flex", "alignItems": "center", "justifyContent": "center"}

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const user = useSelector((state: RootState) => state.login.user);

  return (
    <HeaderContent>
      <HeaderWrapper className="HeadWrapper">
        <LeftContainer>
          <Link to="/" style={Flex}>
            <Logo src={logo} alt="Fastype logo" />
            <HeaderTitle>Fastype</HeaderTitle>
          </Link>
        </LeftContainer>
        <MiddleContainer>
          <NavBar>
            <LinksContainer className="linksContainer">
              <StyledLinks to="/">Accueil</StyledLinks>
              <StyledLinks to="/results">Résultats</StyledLinks>
            </LinksContainer>
            <NavBarRight></NavBarRight>
            {isModalOpen && <LoginModal onClose={handleModalToggle} initialMode="signup" />}
          </NavBar>
        </MiddleContainer>
        <RightContainer>
          {!user ? (
            <ThreeDButton
              onClick={handleModalToggle}
              color={"white"}
              $backgroundColor={"var(--connexion-button)"}
              $shadowColor={"var(--shadow-connexion-button)"}
              type="button"
            >
              Se connecter
            </ThreeDButton>
          ) : (
            <ThreeDButton
              onClick={handleDropdownToggle}
              color={"white"}
              $backgroundColor={"var(--connexion-button)"}
              $shadowColor={"var(--shadow-connexion-button)"}
              type="button"
            >
              {user?.firstName}
              {user?.profilePictureUrl && (
                <StyledImg src={user?.profilePictureUrl} alt="avatar" />
              )}
            </ThreeDButton>
          )}
          {isDropdownOpen && <DropDown />}
        </RightContainer>
      </HeaderWrapper>
    </HeaderContent>
  );
};

export default Header;
