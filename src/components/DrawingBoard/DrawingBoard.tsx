import React, { useRef } from 'react';
import { CANVAS_WIDTH } from '../../constants/constants';
import * as hooks from '../../hooks';
import Canvas from './Canvas';
import HexInput from '../Input/HexInput';

interface DrawingBoardProps {
  src: string;
}

const DrawingBoard: React.FC<DrawingBoardProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWorkerRef = useRef<HTMLCanvasElement>(null);

  hooks.useInitCanvas(canvasRef);
  hooks.useDrawImage(canvasRef, src);

  const { selectedColor, hoveredColor } = hooks.useCanvasWorker(
    canvasRef,
    canvasWorkerRef,
  );

  const canvasContainerStyle: React.CSSProperties = {
    '--canvas-size': `${CANVAS_WIDTH}px`,
  } as React.CSSProperties;

  return (
    <>
      <HexInput selectedColor={selectedColor} hoveredColor={hoveredColor} />
      <div className="canvas-container" style={canvasContainerStyle}>
        <Canvas ref={canvasRef} htmlId="canvas-board" />
        <Canvas htmlId="canvas-worker" ref={canvasWorkerRef} />
      </div>
    </>
  );
};

export default DrawingBoard;
