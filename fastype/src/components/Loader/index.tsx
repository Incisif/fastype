import styled, { keyframes } from "styled-components";

const shadowRolling = keyframes`
  0% {
    box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 100px 0 var(--first-ball-color), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 120px 0 var(--first-ball-color), 100px 0 var(--second-ball-color), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  36% {
    box-shadow: 140px 0 var(--first-ball-color), 120px 0 var(--second-ball-color), 100px 0 var(--third-ball-color), 0px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 160px 0 var(--first-ball-color), 140px 0 var(--second-ball-color), 120px 0 var(--third-ball-color), 100px 0 red;
  }
  62% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 160px 0 var(--second-ball-color), 140px 0 var(--third-ball-color), 120px 0 red;
  }
  75% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 160px 0 var(--third-ball-color), 140px 0 red;
  }
  87% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 160px 0 red;
  }
  100% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
  }
`;

const StyledLoader = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  color: #fff;
  box-sizing: border-box;
  animation: ${shadowRolling} 2s linear infinite;
`;
interface LoaderProps {
  'data-testid'?: string;
}
const Loader: React.FC<LoaderProps> = ({'data-testid': testId}) => {
  return <StyledLoader data-testid={testId} />;
};

export default Loader;
