import { useEffect, useState } from "react";
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
  gap: 5px;
  background-color: var(--white-color);
  border-radius: 10px;
  bottom: -90px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
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
const DropDown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.login.user);
  const [hideDropdown, setHideDropdown] = useState(false);

  useEffect(() => {
    if (!user) {
      setHideDropdown(true);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <>
      {!hideDropdown && (
        <DropDownContent>
          <StyledLink to="/profile">Profil</StyledLink>
          <StyledOptions onClick={handleLogout}>Déconnexion</StyledOptions>
        </DropDownContent>
      )}
    </>
  );
};

export default DropDown;
