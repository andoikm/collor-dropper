import { CANVAS_RATIO_FACTOR, RECT_COLOR_COUNT } from '../constants/constants';

export function pickColor(
  ev: MouseEvent,
  canvas: HTMLCanvasElement,
  colorsSetSize = RECT_COLOR_COUNT,
  canvasRatioFactor = CANVAS_RATIO_FACTOR,
) {
  const { left, top } = canvas.getBoundingClientRect();
  const x = ~~((ev.clientX - left) * canvasRatioFactor);
  const y = ~~((ev.clientY - top) * canvasRatioFactor);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (ctx) {
    const pixelRect = ctx.getImageData(x, y, colorsSetSize, colorsSetSize);
    const { data: rectData } = pixelRect;
    const hexColors = [];
    for (let i = 0; i < rectData.length; i += 4) {
      const hex = rgbToHex(rectData[i], rectData[i + 1], rectData[i + 2]);
      hexColors.push(hex);
    }

    return {
      colorsSet: hexColors,
      centerColor: hexColors[Math.floor(hexColors.length / 2)],
    };
  }

  return {
    colorsSet: [],
    centerColor: '',
  };
}

export const rgbToHex = (r: number, g: number, b: number): string =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
