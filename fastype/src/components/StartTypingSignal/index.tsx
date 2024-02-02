import styled, { keyframes, css } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface StartTypingSignalProps {
  $shouldExit: boolean;
}

const slideInTimingFunction = "cubic-bezier(0.6, 0.04, 0.98, 0.34)";
const slideOutTimingFunction = "ease";

const slideInFadeIn = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
    visibility: hidden;
  }
  to {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translatey(0);
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    transform: translatey(50%); 
    visibility: hidden;
`;
const StartTypingSignalContainer = styled.div<StartTypingSignalProps>`
  position: absolute;
  transform: translateY(100%);
  top: 1.5rem;
  left: 1rem;
  z-index: 1;
  background-color: var(--dark-violet-color);
  border-radius: 0.5rem;
  animation: ${(props) =>
    props.$shouldExit
      ? css`
          ${slideOut} 0.4s ${slideOutTimingFunction} forwards
        `
      : css`
          ${slideInFadeIn} 0.4s ${slideInTimingFunction} 0.4s forwards
        `};
  animation-fill-mode: forwards;
`;
const StartTypingSignalBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--white-color);
  padding: 1rem 1rem;
`;

const StartTypingSignal: React.FC<StartTypingSignalProps> = ({
  $shouldExit,
}) => {
  const selectedLevel = useSelector(
    (state: RootState) => state.session.selectedLevel
  );
  return (
    <>
      {selectedLevel ? (
        <StartTypingSignalContainer $shouldExit={$shouldExit}>
          <StartTypingSignalBody>
            <p>Commence à taper !</p>
          </StartTypingSignalBody>
        </StartTypingSignalContainer>
      ) : null}
    </>
  );
};

export default StartTypingSignal;
