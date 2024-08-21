import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { pickColor } from '../utils/colorHelper';
import WorkerFactory from '../workers/WorkerFactory';
import { CANVAS_RATIO_FACTOR } from '../constants/constants';
import createCursorDrawerWorker from '../workers/createCursorDrawer.worker';
import { useDropPickerContext } from '../contexts/DropPickerContext';

export const useCanvasWorker = (
  canvasBoardRef: RefObject<HTMLCanvasElement>,
  canvasWorkerRef: RefObject<HTMLCanvasElement>,
) => {
  const { isDropPickerActive, selectedColor, setSelectedColor } =
    useDropPickerContext();
  const worker = useRef<Worker | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string>('');

  useEffect(() => {
    if (canvasWorkerRef.current && !worker.current) {
      try {
        const transferedCanvas =
          canvasWorkerRef.current.transferControlToOffscreen();

        worker.current = WorkerFactory(createCursorDrawerWorker);

        worker.current.onmessage = function (event: MessageEvent) {
          console.log('Received message', event.data);
        };

        worker.current.postMessage({ canvas: transferedCanvas, x: 0, y: 0 }, [
          transferedCanvas,
        ]);
      } catch (error) {
        console.error('Canvas transfer failed', error);
      }
    }

    return () => {
      if (worker.current) {
        worker.current.terminate();
        worker.current = null;
      }
    };
  }, [canvasWorkerRef]);

  useEffect(() => {
    if (isDropPickerActive) {
      const canvasWorker = canvasWorkerRef.current;

      const handler = (ev: MouseEvent) => {
        if (canvasWorker && canvasBoardRef.current) {
          const bounding = canvasWorker.getBoundingClientRect();
          const x = ~~((ev.clientX - bounding.left) * CANVAS_RATIO_FACTOR);
          const y = ~~((ev.clientY - bounding.top) * CANVAS_RATIO_FACTOR);
          const { centerColor, colorsSet } = pickColor(
            ev,
            canvasBoardRef.current,
          );

          if (centerColor !== hoveredColor) {
            setHoveredColor(centerColor);
          }

          worker.current?.postMessage({
            coordinates: { x, y },
            centerColor,
            colorsSet,
          });
        }
      };

      const outHandler = () => {
        worker.current?.postMessage({ clear: true });
      };

      canvasWorker?.addEventListener('mousemove', handler);
      canvasWorker?.addEventListener('mouseout', outHandler);

      return () => {
        canvasWorker?.removeEventListener('mousemove', handler);
        canvasWorker?.removeEventListener('mouseout', outHandler);
      };
    }
  }, [canvasBoardRef, canvasWorkerRef, isDropPickerActive, hoveredColor]);

  const clickHandler = useCallback(() => {
    if (canvasWorkerRef.current && canvasBoardRef.current) {
      setSelectedColor(hoveredColor);
    }
  }, [canvasBoardRef, canvasWorkerRef, hoveredColor, setSelectedColor]);

  useEffect(() => {
    const canvasWorker = canvasWorkerRef.current;

    if (canvasWorker && isDropPickerActive) {
      canvasWorker.addEventListener('click', clickHandler);
    }

    return () => {
      canvasWorker?.removeEventListener('click', clickHandler);
    };
  }, [canvasWorkerRef, clickHandler, isDropPickerActive]);

  return {
    hoveredColor,
    selectedColor,
  };
};
