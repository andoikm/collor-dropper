import React, { useRef } from 'react';
import Canvas from './Canvas';
import * as hooks from '../../hooks';
import HexInput from '../Input/HexInput';
import { CANVAS_WIDTH } from '../../constants/constants';

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
        <Canvas htmlId="canvas-board" ref={canvasRef} />
        <Canvas htmlId="canvas-worker" ref={canvasWorkerRef} />
      </div>
    </>
  );
};

export default DrawingBoard;
