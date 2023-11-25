import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/fastype_Logo.png";
import LoginModal from "../LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

const HeaderContent = styled.div`
  display: flex;
  width: 100vw;
  height: 80px;
  background-color: var(--white-color));
  padding: 0 20px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1228px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
`;

const Logo = styled.img`
  width: 60px;
  height: 49px;
  align-self: flex-end;
  margin-bottom: 15px;
`;

const HeaderTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  background: -webkit-linear-gradient(#6C95FF, #0E50FA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #ffffff;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: var(--grey-color);
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  align-self: flex-end;
  margin-left: 40px;
  align-items: center;
  align-self: center;
`;

const NavBarLeft = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 7px;
  a {
    text-decoration: none;
    position: relative;
    padding-bottom: 5px;
    transition: all 0.3s ease-in-out; // Ajoute une transition

    &:hover::after {
      border-bottom: 2px solid #ffffff;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 2px solid transparent;
      transition: 0.3s ease;
    }
  }
`;
const StyledLinks = styled(Link)`
`;
const NavBarRight = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const ButtonConnexion = styled.button`
z-index: 1;
  border-radius: 5px;
  height: 30px;
  padding: 0 10px;
  font-size: 1.2rem;
  position: relative;
  background-color: var(--orange-gold-color);
  color: var(--white-color);
  &:hover {
    border: 1px solid #9b8c77;
    transform: translateY(-2px);
    box-shadow: 0 3px 0 #9b8c77; /* Ajout de l'ombre au survol */
  }
  &:active {
    transform: translateY(0px);
    box-shadow: 0 0px 0 #9b8c77; /* Retrait de l'ombre au clic */
  }
`;

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  return (
    <HeaderContent>
      <HeaderWrapper>
        <Logo src={logo} alt="Fastype logo" />

        <HeaderTitle>Fastype</HeaderTitle>
        <NavBar>
          <NavBarLeft>
            <StyledLinks to="/">Accueil</StyledLinks>
            <StyledLinks to="/results">Résultats</StyledLinks>
          </NavBarLeft>
          <NavBarRight>
            <ButtonConnexion onClick={handleModalToggle}>
              {!isLoggedIn ? "Se connecter" : "Déconnexion"}
            </ButtonConnexion>
          </NavBarRight>
          {isModalOpen && <LoginModal onClose={handleModalToggle} />}
        </NavBar>
      </HeaderWrapper>
    </HeaderContent>
  );
};

export default Header;
