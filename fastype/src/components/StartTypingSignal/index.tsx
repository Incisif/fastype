import styled, { keyframes } from "styled-components";
//animation keyframes infinie qui fait bouger le signal de haut en bas
const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
  100% {
    transform: translateY(0);
  }
`;

const StartTypingSignalContainer = styled.div`
  position: absolute;
  left: -11rem;
  top: 4rem;
  z-index: 2;
  background-color: var(--dark-violet-color);
  border-radius: 0.5rem 0 0.5rem 0.5rem;
  animation: ${bounce} 2s ease-in-out infinite;
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

const StartTypingSignal: React.FC = () => {
  return (
    <StartTypingSignalContainer>
      <StartTypingSignalBody>
        <p>Commence à taper !</p>
      </StartTypingSignalBody>
      <StartTypingSignalPointer />
    </StartTypingSignalContainer>
  );
};

export default StartTypingSignal;
