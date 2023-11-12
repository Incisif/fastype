import styled, { keyframes } from 'styled-components';

const size = 60; 
const ligthtBluePastel = '#B6D8F2';
const animationDuration = '1.8s'; 
const yellowPastel = '#F7F6CF';
const pinkPastel = '#F4CFDF';
const darkBluePastel = '#5784BA';
const greenPastel = '#BED3C3';

const rotation = keyframes`
  0% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  50% {
    transform: rotateX(45deg) rotateY(0) rotateZ(225deg);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  100% {
    transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
`;

const bouncing = keyframes`
  0% {
    transform: translateY(-${size * 0.5}px);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  45% {
    transform: translateY(${size * 0.5}px);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  100% {
    transform: translateY(-${size * 0.5}px);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
`;

const bouncingShadow = keyframes`
  0% {
    transform: translateZ(-${size}px) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.1;
  }
  45% {
    transform: translateZ(0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.3;
  }
  100% {
    transform: translateZ(-${size}px) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.1;
  }
`;


const Scene = styled.div`
  position: relative;
  z-index: 2;
  height: ${size * 2.75}px;
  width: ${size * 2.75}px;
  display: grid;
  place-items: center;
`;

const CubeWrapper = styled.div`
  transform-style: preserve-3d;
  animation: ${bouncing} ${animationDuration} infinite;
`;

const Cube = styled.div`
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
  animation: ${rotation} ${animationDuration} 0.2s infinite;
`;

const CubeFaces = styled.div`
  transform-style: preserve-3d;
  height: ${size}px;
  width: ${size}px;
  position: relative;
  transform-origin: 0 0;
  transform: translateX(0) translateY(0) translateZ(-${size / 2}px);
`;

const CubeFace = styled.div`
  position: absolute;
  inset: 0;

  &.shadow {
    transform: translateZ(-${size}px);
    animation: ${bouncingShadow} ${animationDuration} infinite;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &.top {
    transform: translateZ(${size}px);
    background-color: ${yellowPastel};
  }
  &.front {
    transform-origin: 0 50%;
    transform: rotateY(-90deg);
    background-color: ${ligthtBluePastel};
  }
  &.back {
    transform-origin: 0 50%;
    transform: rotateY(-90deg) translateZ(-${size}px);
    background-color: ${pinkPastel};
  }
  &.right {
    transform-origin: 50% 0;
    transform: rotateX(-90deg) translateY(-${size}px);
    background-color: ${darkBluePastel};
  }
  &.left {
    transform-origin: 50% 0;
    transform: rotateX(-90deg) translateY(-${size}px) translateZ(${size}px);
    background-color: ${greenPastel};
  }
`;


const Loader = () => (
  
    <Scene>
      <CubeWrapper>
        <Cube>
          <CubeFaces>
            <CubeFace className="shadow" />
            <CubeFace className="top" />
            <CubeFace className="front" />
            <CubeFace className="back" />
            <CubeFace className="right" />
            <CubeFace className="left" />
          </CubeFaces>
        </Cube>
      </CubeWrapper>
    </Scene>
);

export default Loader;
