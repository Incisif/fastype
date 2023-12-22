import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionStatsThunk } from "../../features/typingStats/statsThunk";
import { calculateAverage } from "../../features/typingStats/calculateTypingStats";
import { useEffect, useState } from "react";
import Main from "../../layouts/MainContent";
import styled from "styled-components";
import { WpmGauge } from "../../components/WpmGauge";


interface SessionStat {
  wpm: number;
  accuracy: number;
}

const Title = styled.h1`
  font-size: 2rem;
  color: var(--grey-color);
  margin-top: 2rem;
  text-align: left;
`;

const AverageSectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`;
const AverageSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 31%;
  height: 20rem;
  background-color: var(--avevrage-card-background-color);
  color: var(--grey-color);
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
`;
const SectionSubTitle = styled.h2`
  font-size: 1.2rem;
  align-self: flex-start;
  margin: 1.2rem;
`;

const AverageSpeed = styled(AverageSection)`
  span {
    font-size: 4rem;
    font-weight: bold;
  }
`;
const GaugeContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
const Caption = styled.p`
  position: absolute;
  font-size: 1rem;
  color: var(--grey-color);
  bottom: 0.8rem;
`;
const AverageAccuracy = styled(AverageSection)``;
const LastProgressPercentage = styled(AverageSection)``;
const SessionsHistory = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProgressGraphics = styled.div``;
const Results: React.FC = () => {
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);

  const uid = useSelector((state: RootState) => state.login.user?.uid);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchStats = async () => {
      if (uid) {
        const action = await dispatch(fetchSessionStatsThunk(uid));
        const sessions = action.payload as SessionStat[];
        const totalWPM = sessions.reduce(
          (acc, session) => acc + session.wpm,
          0
        );
        const averageWPM = calculateAverage(totalWPM, sessions.length);
        const totalAccuracy = sessions.reduce(
          (acc, session) => acc + session.accuracy,
          0
        );
        const averageAccuracy = calculateAverage(
          totalAccuracy,
          sessions.length
        );
        setAverageSpeed(averageWPM);
        setAverageAccuracy(averageAccuracy);
      }
    };

    fetchStats();
  }, [uid, dispatch]);
  return (
    <Main>
      <Title>Mes statistiques</Title>
      <AverageSectionsContainer>
        <AverageSpeed>
          <SectionSubTitle>Vitesse </SectionSubTitle>
          <GaugeContainer>
            <WpmGauge num={averageSpeed} value="mpm"></WpmGauge>
          </GaugeContainer>
          <Caption>Moyenne générale</Caption>
        </AverageSpeed>
        <AverageAccuracy>
          <SectionSubTitle>Précision</SectionSubTitle>
          <GaugeContainer>
          <WpmGauge num={averageAccuracy} value="%" ></WpmGauge>
          </GaugeContainer>
          <Caption>Moyenne générale</Caption>
        </AverageAccuracy>
        <LastProgressPercentage></LastProgressPercentage>
      </AverageSectionsContainer>
      <SessionsHistory></SessionsHistory>
      <ProgressGraphics></ProgressGraphics>
    </Main>
  );
};

export default Results;
