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
  color: var(--light-grey-color);
`;

interface MyChartProps {
  data: Array<{ day: number; wpm: number; accuracy: number }>;
  interval: "week" | "month";
}

const MyChart: React.FC<MyChartProps> = ({ data, interval }) => {
  const xValues =
    interval === "week"
      ? [1, 2, 3, 4, 5, 6, 7]
      : [...Array(30).keys()].map((k) => k + 1);
  const xTickFormat = xValues.map(() => "");
  const axisStyle = {
    axis: { stroke: "var(--grey-color)", strokeWidth: 2 },
    ticks: { size: 9, stroke: "#000" },
    tickLabels: { fontSize: 10, padding: 5 },
  };

  return (
    <Container>
      <VictoryChart
        domainPadding={20}
        padding={{ top: 20, bottom: 50, left: 50, right: 50 }}
      >
        <VictoryAxis
          tickValues={xValues}
          tickFormat={xTickFormat}
          style={axisStyle}
        />
        <VictoryAxis dependentAxis domain={[0, 100]} style={axisStyle} />
        <VictoryLine
          data={data}
          x="day"
          y="wpm"
          style={{ data: { stroke: "var(--orange-color)" } }}
        />
        {interval === "week" && (
          <VictoryScatter
            data={data}
            x="day"
            y="wpm"
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
      <Caption>
        {" "}
        {interval === "week" ? "7 derniers jours" : "30 derniers jours"}
      </Caption>
    </Container>
  );
};

export default MyChart;
