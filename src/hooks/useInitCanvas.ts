import { useEffect, RefObject } from 'react';
import { CANVAS_BACKGROUND_COLOR } from '../constants/constants';

export const useInitCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
      }
    }
  }, [canvasRef]);
};
