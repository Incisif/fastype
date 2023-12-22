import { VictoryPie, VictoryLabel } from "victory";
import { useState, useEffect } from "react";
interface WpmGaugeProps {
    value: string;
    num: number;
    }

export const WpmGauge:React.FC<WpmGaugeProps> = ({ value, num} ) => {
  const [wpmAnimated, setWpmAnimated] = useState(0);

  useEffect(() => {
    const animationDelay = 300;

    const startAnimation = () => {
      const wpmInterval = setInterval(() => {
        setWpmAnimated((prevWpm) => {
          if (prevWpm < num) {
            return prevWpm + 1;
          } else {
            clearInterval(wpmInterval);
            return prevWpm;
          }
        });
      }, 10);
    };

    const animationTimer = setTimeout(startAnimation, animationDelay);

    return () => {
      clearInterval(animationTimer);
    };
  }, [num]);

  return (
    <svg height="300" width="300">
      <VictoryPie
        standalone={false} 
        data={[
          { x: 1, y: wpmAnimated },
          { x: 2, y: 100 - wpmAnimated },
        ]}
        height={300}
        width={300}
        innerRadius={75}
        colorScale={["var(--light-green-color)", "var( --light-grey-color)"]}
        labels={() => null}
        style={{
          data: {
            fillOpacity: 0.9,
          },
        }}
      />
        <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={150}
        y={140} 
        text={`${wpmAnimated}`}
        style={{ fontSize: 60 , fontWeight: "bold",fill: "var(--light-green-color)"}}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={150}
        y={180} 
        text={value}
        style={{ fontSize: 19, fontWeight: "bold",fill: "var(--light-green-color)" }}
      />
    </svg>
  );
};
