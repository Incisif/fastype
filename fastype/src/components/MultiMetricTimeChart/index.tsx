import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
} from "victory";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
 
`;

const Caption = styled.p`
  text-align: center;
`;

interface MyChartProps {
  data: Array<{ day: number; precision: number; accuracy: number }>;
  interval: "week" | "month";
}

const MyChart: React.FC<MyChartProps> = ({ data, interval }) => {
  const xValues =
    interval === "week"
      ? [1, 2, 3, 4, 5, 6, 7]
      : [...Array(30).keys()].map((k) => k + 1);
  const xTickFormat = xValues.map(() => "|");

  return (
    <Container>
      <VictoryChart
        domainPadding={20}
        padding={{ top: 20, bottom: 50, left: 50, right: 50 }}
      >
        <VictoryAxis tickValues={xValues} tickFormat={xTickFormat} />
        <VictoryAxis
          dependentAxis
          domain={[0, 100]}
        />
        <VictoryLine
          data={data}
          x="day"
          y="precision"
          style={{ data: { stroke: "var(--orange-color)" } }}
        />
        {interval === "week" && (
          <VictoryScatter
            data={data}
            x="day"
            y="precision"
            size={5}
            style={{ data: { fill: "var(--orange-color)" } }}
          />
        )}
        <VictoryLine
          data={data}
          x="day"
          y="accuracy"
          style={{ data: { stroke: "var(--violet-color)" } }}
        />
        {interval === "week" && (
          <VictoryScatter
            data={data}
            x="day"
            y="accuracy"
            size={5}
            style={{ data: { fill: "var(--violet-color)" } }}
          />
        )}
      </VictoryChart>
      <Caption> {interval === "week" ? "Last 7 days" : "Last 30 days"}</Caption>
    </Container>
  );
};

export default MyChart;
