import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface PasswordInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  input {
    width: 100%;
  }
  buton {
    margin: 0;
  }
  span {
    position: absolute;
    right: 1rem;
    bottom: 0.6rem;
    &:hover {
      cursor: pointer;
    }
  }
`;
const PasswordInput: React.FC<PasswordInputProps> = ({ onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Content>
      <label htmlFor="password">Mot de passe</label>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        id="password"
      />
      <span
        onClick={togglePasswordVisibility}
        onKeyDown={togglePasswordVisibility}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </span>
    </Content>
  );
};

export default PasswordInput;
