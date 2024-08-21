import React, { forwardRef } from 'react';
import { CANVAS_SIZE } from '../../constants/constants';

interface CanvasProps {
  htmlId: string;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ htmlId }, ref) => {
  return (
    <canvas ref={ref} id={htmlId} width={CANVAS_SIZE} height={CANVAS_SIZE} />
  );
});

export default Canvas;
