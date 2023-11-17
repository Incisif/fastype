import { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/fastype_Logo.png";
import LoginModal from "../LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import Select, {
  StylesConfig,
  OptionProps,
  GroupBase,
  CSSObjectWithLabel,
} from "react-select";
import frenchFlag from "../../assets/france.png";
import englishFlag from "../../assets/united-kingdom.png";

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
  border-radius: 15px;
  height: 30px;
  padding: 0 10px;
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
  background-color: var(--orange-gold-color);
  color: var(--white-color);
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #404344;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  &:hover::after {
    opacity: 1;
  }
`;
interface OptionType {
  value: string;
  label: string;
}
const customStyles: StylesConfig<OptionType, false> = {
  option: (
    base: CSSObjectWithLabel,
    props: OptionProps<OptionType, false, GroupBase<OptionType>>
  ) => ({
    ...base,
    paddingLeft: 30,
    backgroundImage:
      props.data.value === "fr" ? `url(${frenchFlag})` : `url(${englishFlag})`,
    backgroundSize: "20px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "5px center",
    color: "#000000",
  }),
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "transparent",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
const languageOptions: OptionType[] = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];
const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
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
            <Select
              aria-label="Langue"
              options={languageOptions}
              styles={customStyles}
              defaultValue={languageOptions[0]}
            />
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
