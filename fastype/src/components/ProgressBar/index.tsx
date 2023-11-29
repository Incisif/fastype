import styled from "styled-components";
interface ProgressBarProps {
  totalChars: number;
  currentCharPosition: number;
}


const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  height: 0.5rem;
  background:  var(--typing-box-background-color);
`;
const Progress =
  styled.div <
  { $progress: number }>`
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
      background: #328ffc;
      height: 100%;
      width: ${(props) => props.$progress}%;
      transition: width 0.4s ease-out;
    `;

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalChars,
  currentCharPosition,
}) => {
  const calculateProgress = () => {
    return Math.trunc((currentCharPosition / totalChars) * 100);
  };
  return (
    <ProgressBarContainer className="ProgressBar">
      <Progress $progress={calculateProgress()} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
