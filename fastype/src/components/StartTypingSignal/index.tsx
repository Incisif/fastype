import styled, { keyframes, css } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface StartTypingSignalProps {
  $shouldExit: boolean;
}


const slideInTimingFunction = "ease";
const slideOutTimingFunction = "cubic-bezier(0.6, 0.04, 0.98, 0.34)";



const slideInFadeIn = keyframes`
  from {
    transform: translateX(-50%);
    opacity: 0;
    visibility: visible;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const shake = keyframes`
  0%, 100% {
    visibility: visible;
    transform: translatex(0);
  }
  50% {
    transform: translatex(-0.5rem);
  }
`;
const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-50%); 
`;
const StartTypingSignalContainer = styled.div<StartTypingSignalProps>`
  position: absolute;
  left: -11rem;
  top: 4rem;
  z-index: 2;
  background-color: var(--dark-violet-color);
  border-radius: 0.5rem 0 0.5rem 0.5rem;
  visibility: hidden; // Le composant est initialement invisible
  animation: ${(props) =>
    props.$shouldExit
      ? css`${slideOut} 0.4s ${slideOutTimingFunction} forwards`
      : css`
          ${slideInFadeIn} 0.8s ${slideInTimingFunction} 1s forwards, 
          ${shake} 1.5s ease-in-out 2s infinite`
      };
  animation-fill-mode: forwards; // Gardez le composant dans l'état final de l'animation
  animation-delay: 2s; // Délai avant que l'animation ne commence
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

const StartTypingSignalPointer = styled.div`
  position: absolute;
  right: -0.55rem;
  top: 0;
  width: 0.6rem; /* Assez large pour inclure le quart de cercle */
  height: 0.6rem; /* Assez haut pour inclure le quart de cercle */
  background-color: var(--dark-violet-color);
  clip-path: polygon(24% 45%, 11% 68%, 0 100%, 0 1%, 100% 0, 67% 11%, 43% 26%);
`;

const StartTypingSignal: React.FC<StartTypingSignalProps> = ({ $shouldExit }) => {
  const selectedLevel = useSelector(
    (state: RootState) => state.session.selectedLevel);
  return (
    <>
    {selectedLevel?
    <StartTypingSignalContainer $shouldExit={$shouldExit}>
      <StartTypingSignalBody>
        <p>Commence à taper !</p>
      </StartTypingSignalBody>
      <StartTypingSignalPointer />
    </StartTypingSignalContainer>
    :null}
    </>
  );
};

export default StartTypingSignal;
