import { SVGProps } from "react";
interface SvgComponentProps extends SVGProps<SVGSVGElement> {
  highlightedId: string;
  mod: string;
  finger: string;
}

const SvgComponent: React.FC<SvgComponentProps> = ({
  highlightedId,
  mod,
  finger,
  ...props
}) => {
  const getFillStyle = (id: string) => {
    return highlightedId === id || mod === id
      ? getColorForFinger(finger)
      : "#e9e9e9";
  };

  const getColorForFinger = (finger: string | undefined) => {
    switch (finger) {
      case "left-pinky":
        return "#C9C8FF";
      case "left-ring":
        return "#ACF3C7";
      case "left-middle":
        return "#FFBDCA";
      case "left-index":
        return "#99E9E5";
      case "right-index":
        return "#FFEB99";
      case "right-middle":
        return "#FFBDCA";
      case "right-ring":
        return "#FFD599";
      case "right-pinky":
        return "#ACF3C7";
      case "thumb":
        return "#57D6FE";
      default:
        return "#e9e9e9";
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Calque_1"
      data-name="Calque 1"
      viewBox="0 0 312.01 103.64"
      {...props}
    >
      <defs>
        <style>
          {
            ".cls-10,.cls-4,.cls-6,.cls-8,.cls-9{isolation:isolate}.cls-10,.cls-6,.cls-8,.cls-9{fill:#9d9c9c;font-family:Roboto-Regular,Roboto}.cls-6{font-size:6.36px}.cls-8,.cls-9{font-size:5px}.cls-4{fill:none}.cls-8{letter-spacing:-.04em}.cls-10{font-size:8px}"
          }
        </style>
      </defs>
      <g id="ESC" fill={getFillStyle("r1k1")}>
        <rect
          width={19.74}
          height={19.65}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(4.9 11.76)">
            <tspan x={0} y={0}>
              {"ESC"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k2" fill={getFillStyle("r1k2")} data-testid="key-1">
        <rect
          width={19.74}
          height={19.65}
          x={20.87}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(24.17 7.61)">
            <tspan x={0} y={0}>
              {"1"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(23.87 16.06)">
            <tspan x={0} y={0}>
              {"&"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k3" fill={getFillStyle("r1k3")} data-testid="key-2">
        <rect
          width={19.74}
          height={19.65}
          x={41.85}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(44.92 7.61)">
            <tspan x={0} y={0}>
              {"2"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(45.21 16.06)">
            <tspan x={0} y={0}>
              {"\xE9"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(54.55 16.06)">
            <tspan x={0} y={0}>
              {"~"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k4" fill={getFillStyle("r1k4")} data-testid="key-3">
        <rect
          width={19.74}
          height={19.65}
          x={62.91}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(66.46 7.61)">
            <tspan x={0} y={0}>
              {"3"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(74.9 16.06)">
            <tspan x={0} y={0}>
              {"#"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(67.05 18.06)">
            <tspan x={0} y={0}>
              {'"'}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k5" fill={getFillStyle("r1k5")} data-testid="key-4">
        <rect
          width={19.74}
          height={19.65}
          x={83.83}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(87.13 7.61)">
            <tspan x={0} y={0}>
              {"4"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(87.29 18.06)">
            <tspan x={0} y={0}>
              {"\u2018"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(98.01 16.06)">
            <tspan x={0} y={0}>
              {"{"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k6" fill={getFillStyle("r1k6")} data-testid="key-5">
        <rect
          width={19.74}
          height={19.65}
          x={104.66}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(108.1 7.61)">
            <tspan x={0} y={0}>
              {"5"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(108.58 16.06)">
            <tspan x={0} y={0}>
              {"("}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(117.63 16.06)">
            <tspan x={0} y={0}>
              {"["}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k7" fill={getFillStyle("r1k7")} data-testid="key-6">
        <rect
          width={19.74}
          height={19.65}
          x={125.9}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(128.67 7.61)">
            <tspan x={0} y={0}>
              {"6"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(129.08 17.06)">
            <tspan x={0} y={0}>
              {"-"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(139.76 16.06)">
            <tspan x={0} y={0}>
              {"|"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k8" fill={getFillStyle("r1k8")} data-testid="key-7">
        <rect
          width={19.74}
          height={19.65}
          x={146.79}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(149.66 7.61)">
            <tspan x={0} y={0}>
              {"7"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(149.61 16.06)">
            <tspan x={0} y={0}>
              {"\xE8"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(160.28 18.06)">
            <tspan x={0} y={0}>
              {"`"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k9" fill={getFillStyle("r1k9")} data-testid="key-8">
        <rect
          width={19.74}
          height={19.65}
          x={167.77}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(171.66 7.61)">
            <tspan x={0} y={0}>
              {"8"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(171.71 16.06)">
            <tspan x={0} y={0}>
              {"_"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(180.63 16.06)">
            <tspan x={0} y={0}>
              {"\\"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k10" fill={getFillStyle("r1k10")} data-testid="key-9">
        <rect
          width={19.74}
          height={19.65}
          x={188.6}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(192.15 7.61)">
            <tspan x={0} y={0}>
              {"9"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(192.46 16.06)">
            <tspan x={0} y={0}>
              {"\xE7"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(201.53 16.06)">
            <tspan x={0} y={0}>
              {"^"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k11" fill={getFillStyle("r1k11")} data-testid="key-0">
        <rect
          width={19.74}
          height={19.65}
          x={209.53}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(213.44 7.61)">
            <tspan x={0} y={0}>
              {"0"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(213.79 16.06)">
            <tspan x={0} y={0}>
              {"\xE0"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(221.11 16.06)">
            <tspan x={0} y={0}>
              {"@"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k12" fill={getFillStyle("r1k12")} data-testid="key-°">
        <rect
          width={19.74}
          height={19.65}
          x={230.71}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(234.65 7.61)">
            <tspan x={0} y={0}>
              {"\xB0"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(235.05 16.06)">
            <tspan x={0} y={0}>
              {")"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(244.3 16.06)">
            <tspan x={0} y={0}>
              {"]"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k13" fill={getFillStyle("r1k13")} data-testid="key-+">
        <rect
          width={19.74}
          height={19.65}
          x={251.67}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(255.59 7.61)">
            <tspan x={0} y={0}>
              {"+"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(255.83 16.06)">
            <tspan x={0} y={0}>
              {"="}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(264.54 16.06)">
            <tspan x={0} y={0}>
              {"}"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r1k14" fill={getFillStyle("r1k14")} data-testid="key-return">
        <rect
          width={39.23}
          height={19.65}
          x={272.75}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(283.38 11.69)">
            <tspan x={0} y={0}>
              {"B"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(286.49 11.69)">
            <tspan x={0} y={0}>
              {"A"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(289.73 11.69)">
            <tspan x={0} y={0}>
              {"CK"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k1" fill={getFillStyle("r2k1")} data-testid="key-tab">
        <rect
          width={29.6}
          height={19.65}
          x={0.1}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text
            style={{
              letterSpacing: "-.06em",
              fontSize: 5,
              fill: "#9d9c9c",
              fontFamily: "Roboto-Regular,Roboto",
              isolation: "isolate",
            }}
            transform="translate(9.08 32.71)"
          >
            <tspan x={0} y={0}>
              {"T"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(11.87 32.71)">
            <tspan x={0} y={0}>
              {"AB"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k2" fill={getFillStyle("r2k2")} data-testid="key-a">
        <rect
          width={19.74}
          height={19.65}
          x={30.99}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(38.78 32.71)">
            <tspan x={0} y={0}>
              {"A"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k3" fill={getFillStyle("r2k3")} data-testid="key-z">
        <rect
          width={19.74}
          height={19.65}
          x={52.2}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(60.17 32.71)">
            <tspan x={0} y={0}>
              {"Z"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k4" fill={getFillStyle("r2k4")} data-testid="key-e">
        <rect
          width={19.74}
          height={19.65}
          x={73.05}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(81.12 32.71)">
            <tspan x={0} y={0}>
              {"E"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k5" fill={getFillStyle("r2k5")} data-testid="key-r">
        <rect
          width={19.74}
          height={19.65}
          x={94.18}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(102.09 32.71)">
            <tspan x={0} y={0}>
              {"R"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k6" fill={getFillStyle("r2k6")} data-testid="key-t">
        <rect
          width={19.74}
          height={19.65}
          x={114.94}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <text
          className="cls-4"
          style={{
            fontSize: "6.36px",
            fill: "#9d9c9c",
            fontFamily: "Roboto-Regular,Roboto",
            isolation: "isolate",
            letterSpacing: "-.04em",
          }}
          transform="translate(122.98 32.71)"
        >
          <tspan x={0} y={0}>
            {"T"}
          </tspan>
        </text>
      </g>
      <g id="r2k7" fill={getFillStyle("r2k7")} data-testid="key-y">
        <rect
          width={19.74}
          height={19.65}
          x={136.11}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(144.08 32.71)">
            <tspan x={0} y={0}>
              {"Y"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k8" fill={getFillStyle("r2k8")} data-testid="key-u">
        <rect
          width={19.74}
          height={19.65}
          x={157.01}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(164.82 32.71)">
            <tspan x={0} y={0}>
              {"U"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k9" fill={getFillStyle("r2k9")} data-testid="key-i">
        <rect
          width={19.74}
          height={19.65}
          x={178.05}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(187.05 32.71)">
            <tspan x={0} y={0}>
              {"I"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k10" fill={getFillStyle("r2k10")} data-testid="key-o">
        <rect
          width={19.74}
          height={19.65}
          x={198.81}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(206.5 32.71)">
            <tspan x={0} y={0}>
              {"O"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k11" fill={getFillStyle("r2k11")} data-testid="key-p">
        <rect
          width={19.74}
          height={19.65}
          x={219.94}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(227.8 32.71)">
            <tspan x={0} y={0}>
              {"P"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k12" fill={getFillStyle("r2k12")} data-testid="key-¨">
        <rect
          width={19.74}
          height={19.65}
          x={240.79}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(245.76 30.08)">
            <tspan x={0} y={0}>
              {"\xA8"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(245.67 38.85)">
            <tspan x={0} y={0}>
              {"^"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r2k13" fill={getFillStyle("r2k13")} data-testid="key-£">
        <rect
          width={19.74}
          height={19.65}
          x={261.96}
          y={21.03}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(265.43 28.2)">
            <tspan x={0} y={0}>
              {"\xA3"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(265.25 36.59)">
            <tspan x={0} y={0}>
              {"$"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(273.82 36.63)">
            <tspan x={0} y={0}>
              {"\xA4"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="enter" fill={getFillStyle("enter")} data-testid="key-enter">
        <path
          d="M311.98 22.75v-.16c0-.82-.63-1.48-1.44-1.55-.03 0-.06-.01-.09-.01h-25.96c-.86 0-1.56.7-1.56 1.56v16.53c0 .86.7 1.56 1.56 1.56h5.5c1.31 0 2.37 1.06 2.37 2.37V59.3c0 1.2.7 2.17 1.56 2.17h16.53c.86 0 1.56-.97 1.56-2.17V23.2c0-.15-.01-.3-.03-.45Z"
          className="cls-1"
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(289.85 32.22)">
            <tspan x={0} y={0}>
              {"E"}
            </tspan>
          </text>
          <text
            style={{
              letterSpacing: 0,
              fontSize: 5,
              fill: "#9d9c9c",
              fontFamily: "Roboto-Regular,Roboto",
              isolation: "isolate",
            }}
            transform="translate(292.69 32.22)"
          >
            <tspan x={0} y={0}>
              {"N"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(296.19 32.22)">
            <tspan x={0} y={0}>
              {"TER"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k1" fill={getFillStyle("r3k1")} data-testid="key-lock">
        <rect
          width={39.17}
          height={19.65}
          x={0.1}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text
            style={{
              fontSize: 5,
              letterSpacing: "-.03em",
              fill: "#9d9c9c",
              fontFamily: "Roboto-Regular,Roboto",
              isolation: "isolate",
            }}
            transform="translate(11.83 53.6)"
          >
            <tspan x={0} y={0}>
              {"L"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(14.36 53.6)">
            <tspan x={0} y={0}>
              {"OCK"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k2" fill={getFillStyle("r3k2")} data-testid="key-q">
        <rect
          width={19.74}
          height={19.65}
          x={40.62}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(48.31 53.6)">
            <tspan x={0} y={0}>
              {"Q"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k3" fill={getFillStyle("r3k3")} data-testid="key-s">
        <rect
          width={19.74}
          height={19.65}
          x={61.59}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(69.58 53.6)">
            <tspan x={0} y={0}>
              {"S"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k4" fill={getFillStyle("r3k4")} data-testid="key-d">
        <rect
          width={19.74}
          height={19.65}
          x={82.66}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(90.44 53.6)">
            <tspan x={0} y={0}>
              {"D"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k5" fill={getFillStyle("r3k5")} data-testid="key-f">
        <rect
          width={19.74}
          height={19.65}
          x={103.6}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(111.71 53.6)">
            <tspan x={0} y={0}>
              {"F"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k6" fill={getFillStyle("r3k6")} data-testid="key-g">
        <rect
          width={19.74}
          height={19.65}
          x={124.58}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(132.29 53.6)">
            <tspan x={0} y={0}>
              {"G"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k7" fill={getFillStyle("r3k7")} data-testid="key-h">
        <rect
          width={19.74}
          height={19.65}
          x={145.51}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(153.12 53.6)">
            <tspan x={0} y={0}>
              {"H"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k8" fill={getFillStyle("r3k8")} data-testid="key-j">
        <rect
          width={19.74}
          height={19.65}
          x={166.54}
          y={41.75}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(174.66 53.43)">
            <tspan x={0} y={0}>
              {"J"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k9" fill={getFillStyle("r3k9")} data-testid="key-k">
        <rect
          width={19.74}
          height={19.65}
          x={187.44}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(195.32 53.6)">
            <tspan x={0} y={0}>
              {"K"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k10" fill={getFillStyle("r3k10")} data-testid="key-l">
        <rect
          width={19.74}
          height={19.65}
          x={208.58}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(216.75 53.6)">
            <tspan x={0} y={0}>
              {"L"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k11" fill={getFillStyle("r3k11")} data-testid="key-m">
        <rect
          width={19.74}
          height={19.65}
          x={229.46}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(236.56 53.6)">
            <tspan x={0} y={0}>
              {"M"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k12" fill={getFillStyle("r3k12")} data-testid="key-%">
        <rect
          width={19.74}
          height={19.65}
          x={250.35}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(252.85 48.77)">
            <tspan x={0} y={0}>
              {"%"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(253.43 59.05)">
            <tspan x={0} y={0}>
              {"\xF9"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r3k13" fill={getFillStyle("r3k13")} data-testid="key-µ">
        <rect
          width={19.74}
          height={19.65}
          x={271.41}
          y={41.92}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(275.66 48.77)">
            <tspan x={0} y={0}>
              {"\xB5"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(276.09 59.05)">
            <tspan x={0} y={0}>
              {"*"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k1" fill={getFillStyle("r4k1")} data-testid="key-leftShift">
        <rect
          width={25.29}
          height={19.65}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(4.01 74.49)">
            <tspan x={0} y={0}>
              {"SHI"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(11.9 74.49)">
            <tspan x={0} y={0}>
              {"F"}
            </tspan>
          </text>
          <text className="cls-8" transform="translate(14.71 74.49)">
            <tspan x={0} y={0}>
              {"T"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k2" fill={getFillStyle("r4k2")} data-testid="key->">
        <rect
          width={19.74}
          height={19.65}
          x={26.62}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(30.12 70.11)">
            <tspan x={0} y={0}>
              {">"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(30.16 79.77)">
            <tspan x={0} y={0}>
              {"<"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k3" fill={getFillStyle("r4k3")} data-testid="key-w">
        <rect
          width={19.74}
          height={19.65}
          x={47.6}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(54.66 74.49)">
            <tspan x={0} y={0}>
              {"W"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k4" fill={getFillStyle("r4k4")} data-testid="key-x">
        <rect
          width={19.74}
          height={19.65}
          x={68.64}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(76.52 74.49)">
            <tspan x={0} y={0}>
              {"X"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k5" fill={getFillStyle("r4k5")} data-testid="key-c">
        <rect
          width={19.74}
          height={19.65}
          x={89.55}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(97.35 74.49)">
            <tspan x={0} y={0}>
              {"C"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k6" fill={getFillStyle("r4k6")} data-testid="key-v">
        <rect
          width={19.74}
          height={19.65}
          x={110.58}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(118.43 74.49)">
            <tspan x={0} y={0}>
              {"V"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4K7" fill={getFillStyle("r4k7")} data-testid="key-b">
        <rect
          width={19.74}
          height={19.65}
          x={131.49}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(139.38 74.49)">
            <tspan x={0} y={0}>
              {"B"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k8" fill={getFillStyle("r4k8")} data-testid="key-n">
        <rect
          width={19.74}
          height={19.65}
          x={152.55}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(160.16 74.49)">
            <tspan x={0} y={0}>
              {"N"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k9" fill={getFillStyle("r4k9")} data-testid="key-?">
        <rect
          width={19.74}
          height={19.65}
          x={173.62}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(176.54 70.84)">
            <tspan x={0} y={0}>
              {"?"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(177.42 78.2)">
            <tspan x={0} y={0}>
              {","}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k10" fill={getFillStyle("r4k10")} data-testid="key-.">
        <rect
          width={19.74}
          height={19.65}
          x={194.38}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-10" transform="translate(198.76 69.33)">
            <tspan x={0} y={0}>
              {"."}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(198.76 79.2)">
            <tspan x={0} y={0}>
              {";"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k11" fill={getFillStyle("r4k11")} data-testid="key-/">
        <rect
          width={19.74}
          height={19.65}
          x={215.48}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-6" transform="translate(218.72 70.84)">
            <tspan x={0} y={0}>
              {"/"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-10" transform="translate(219.26 79.2)">
            <tspan x={0} y={0}>
              {":"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k12" fill={getFillStyle("r4k12")} data-testid="key-§">
        <rect
          width={19.74}
          height={19.65}
          x={236.43}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(239.55 70.45)">
            <tspan x={0} y={0}>
              {"\xA7"}
            </tspan>
          </text>
        </g>
        <g className="cls-4">
          <text className="cls-6" transform="translate(240.68 79.2)">
            <tspan x={0} y={0}>
              {"!"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r4k13" fill={getFillStyle("r4k13")} data-testid="key-rightShift">
        <rect
          width={54.6}
          height={19.65}
          x={257.41}
          y={62.81}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(276.08 74.49)">
            <tspan x={0} y={0}>
              {"SHI"}
            </tspan>
          </text>
          <text className="cls-9" transform="translate(283.97 74.49)">
            <tspan x={0} y={0}>
              {"F"}
            </tspan>
          </text>
          <text className="cls-8" transform="translate(286.78 74.49)">
            <tspan x={0} y={0}>
              {"T"}
            </tspan>
          </text>
        </g>
      </g>
      <g id="r5k1" fill={getFillStyle("r5k1")} data-testid="key-leftCtrl">
        <rect
          width={25.29}
          height={19.65}
          y={83.99}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(7.69 95.67)">
            <tspan x={0} y={0}>
              {"Ctrl"}
            </tspan>
          </text>
        </g>
      </g>
      <rect
        id="r5k2"
        fill={getFillStyle("r5k2")}
        width={25.29}
        height={19.65}
        x={26.63}
        y={83.99}
        className="cls-1"
        rx={2.94}
        ry={2.94}
      />
      <g id="r5k3" fill={getFillStyle("r5k3")}>
        <rect
          width={25.29}
          height={19.65}
          x={53.48}
          y={83.99}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(62.25 95.67)">
            <tspan x={0} y={0}>
              {"Alt"}
            </tspan>
          </text>
        </g>
      </g>
      <rect
        id="r5k4"
        fill={getFillStyle("r5k4")}
        data-testid="key-space"
        width={152.12}
        height={19.65}
        x={79.88}
        y={83.99}
        className="cls-1"
        rx={2.94}
        ry={2.94}
      />
      <g id="r5K5" fill={getFillStyle("r5k5")}>
        <rect
          width={25.29}
          height={19.65}
          x={233.35}
          y={83.99}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(242.11 95.67)">
            <tspan x={0} y={0}>
              {"Alt"}
            </tspan>
          </text>
        </g>
      </g>
      <rect
        id="r5k6"
        fill={getFillStyle("r5k6")}
        width={25.29}
        height={19.65}
        x={259.99}
        y={83.99}
        className="cls-1"
        rx={2.94}
        ry={2.94}
      />
      <g id="r5k7" fill={getFillStyle("r5k7")}>
        <rect
          width={25.29}
          height={19.65}
          x={286.72}
          y={83.99}
          className="cls-1"
          rx={2.94}
          ry={2.94}
        />
        <g className="cls-4">
          <text className="cls-9" transform="translate(294.42 95.67)">
            <tspan x={0} y={0}>
              {"Ctrl"}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};
export default SvgComponent;
