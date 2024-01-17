import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logoutUserThunk } from "../../features/user/userThunks";
import { Link } from "react-router-dom";
import styled from "styled-components";



const DropDownContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 3;
  gap: 10px;
  background-color: var(--white-color);
  border-radius: 10px;
  bottom: -150px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem 1rem;
`;

const StyledOptions = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--option-hover-color);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--option-hover-color);
  }
`;
const DropDown: React.FC<{ isOpen: boolean; toggleDropdown: () => void }> = ({
  isOpen,
  toggleDropdown,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.login.user);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) {
      toggleDropdown();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          if (isOpen) {
            toggleDropdown();
          }
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user, dropdownRef, toggleDropdown, isOpen]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    toggleDropdown();
  };

  return (
    <>
      {isOpen && (
        <DropDownContent ref={dropdownRef}>
          <StyledLink to="/training" onClick={toggleDropdown}>
            Entraînement
          </StyledLink>
          <StyledLink to="/results" onClick={toggleDropdown}>
            Statistiques
          </StyledLink>
          <StyledOptions onClick={handleLogout}>Déconnexion</StyledOptions>
        </DropDownContent>
      )}
    </>
  );
};

export default DropDown;
