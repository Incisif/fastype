import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/fastype_Logo.png";
import LoginModal from "../LoginModal";

const Header__Content = styled.div`
  display: flex;
  width: 100vw;
  height: 80px;
  background-color: #4f5458;
  padding: 0 20px;
`;

const Header__Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1228px;
  height: 100%;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 60px;
  height: 49px;
  align-self: flex-end;
  margin-bottom: 15px;
`;

const Header__Title = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  color: #ffffff;
  align-self: flex-end;
  margin-left: 10px;
  margin-bottom: 15px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  align-self: flex-end;
  margin-left: 40px;
  margin-bottom: 13px;
  align-items: center;
`;

const NavBarLeft = styled.div`
  display: flex;
  gap: 40px;
`;

const NavBarRight = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const StyledSelect = styled.select`
  background: transparent;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  border: none;
  outline: none;
  appearance: none;
`;
const Header: React.FC = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);

  };
  return (
    <Header__Content>
      <Header__Wrapper>
        <Logo src={logo} alt="logo" />

        <Header__Title>Fastype</Header__Title>
        <NavBar>
          <NavBarLeft>
            <a href="#">Accueil</a>
            <a href="#">Résultats</a>
          </NavBarLeft>
          <NavBarRight>
            <StyledSelect>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </StyledSelect>
            <a href="#" onClick={handleModalToggle}>Se connecter</a>
          </NavBarRight>
          {isModalOpen && <LoginModal onClose={handleModalToggle} />}
        </NavBar>
      </Header__Wrapper>
    </Header__Content>
  );
};

export default Header;
