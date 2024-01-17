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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Password input changed", e.target.value);
    onChange(e);
  }
  return (
    <Content>
      <label htmlFor="password">Mot de passe</label>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
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
