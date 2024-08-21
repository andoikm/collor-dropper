import { RefObject, useEffect } from 'react';

export const useDrawImage = (
  canvasRef: RefObject<HTMLCanvasElement>,
  src: string,
) => {
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;

    img.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d', {
          willReadFrequently: true,
        });
        if (ctx) {
          const canvas = canvasRef.current;
          const maxWidth = canvas.width;
          const maxHeight = canvas.height;

          const scaleX = maxWidth / img.width;
          const scaleY = maxHeight / img.height;
          const scale = Math.min(scaleX, scaleY);

          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          // Clear the canvas before drawing the new image
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            (maxWidth - newWidth) / 2,
            (maxHeight - newHeight) / 2,
            newWidth,
            newHeight,
          );
        }
      }
    };

    return () => {
      img.onload = null;
    };
  }, [canvasRef, src]);
};
