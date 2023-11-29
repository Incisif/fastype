import styled from "styled-components";

interface ThreeDButtonProps {
  $backgroundColor: string;
  $shadowColor: string;
  color: string;
  children: React.ReactNode;
  fontSize?: string;
  onClick?: () => void;
}


const Styled3DButton = styled.button<ThreeDButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.color};
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  font-size: ${(props) => props.fontSize ?? "none"};
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 0 ${(props) => (props.$shadowColor)}, 0 0 0 1px ${(props) => (props.$shadowColor)}; 
  }
  &:active {
    transform: translateY(0px);
    box-shadow: none; 
  }
`;

const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  children,
  color,
  $backgroundColor,
  $shadowColor,
  fontSize,
  onClick,
}) => {
  return (
    <Styled3DButton onClick={onClick} color={color} $backgroundColor={$backgroundColor}
    $shadowColor={$shadowColor} fontSize={fontSize}>
      {children}
    </Styled3DButton>
  );
};
export default ThreeDButton;
