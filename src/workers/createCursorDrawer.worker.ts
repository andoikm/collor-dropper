type Coordinates = {
  x: number;
  y: number;
};

const createCursorDrawer = () => {
  const initializeContext = (
    canvas: HTMLCanvasElement,
  ): CanvasRenderingContext2D => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    return ctx;
  };

  const drawSquare = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    fillColor: string,
    strokeColor: string,
    lineWidth: number,
  ) => {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, size, size);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(x, y, size, size);
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    strokeColor: string,
    lineWidth: number,
    shadowBlur: number = 0,
    shadowColor: string = 'transparent',
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.stroke();
    ctx.closePath();
  };

  class CustomCursorDrawer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    cursorX: number = 0;
    cursorY: number = 0;
    cursorRadius: number = 390;
    borderWidth: number = 70;
    shadowColor: string = '#000000';
    shadowBlur: number = 20;
    centerSquareColor: string = '';
    centerSquareBorderColor: string = 'transparent';
    outerBorderWidth: number = 10;
    smallSquareSize: number = 15;
    centerSquareSize: number = 100;
    strokeColor: string = '#efefef';

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.ctx = initializeContext(canvas);
    }

    drawBorder(color: string) {
      drawCircle(
        this.ctx,
        this.cursorX,
        this.cursorY,
        this.cursorRadius,
        color ?? this.strokeColor,
        this.borderWidth,
        this.shadowBlur,
        this.shadowColor,
      );
    }

    drawOuterBorder() {
      drawCircle(
        this.ctx,
        this.cursorX,
        this.cursorY,
        this.cursorRadius + this.borderWidth - 25,
        this.strokeColor,
        this.outerBorderWidth,
      );
    }

    drawPattern(color: string, colorsSet: string[]) {
      const drawSize = this.cursorRadius + this.borderWidth;
      const startX = this.cursorX - drawSize;
      const endX = this.cursorX + drawSize;
      const startY = this.cursorY - drawSize;
      const endY = this.cursorY + drawSize;

      for (let y = startY; y <= endY; y += this.smallSquareSize) {
        for (let x = startX; x <= endX; x += this.smallSquareSize) {
          const distance = Math.hypot(this.cursorX - x, this.cursorY - y);
          if (distance <= this.cursorRadius) {
            const colorIndex =
              Math.floor(distance / this.smallSquareSize) % colorsSet.length;
            drawSquare(
              this.ctx,
              x,
              y,
              this.smallSquareSize,
              colorsSet[colorIndex],
              this.strokeColor,
              1,
            );
          }
        }
      }

      const centerX = this.cursorX - this.centerSquareSize / 2;
      const centerY = this.cursorY - this.centerSquareSize / 2;
      drawSquare(
        this.ctx,
        centerX,
        centerY,
        this.centerSquareSize,
        this.centerSquareColor,
        this.centerSquareBorderColor,
        3,
      );

      this.drawBorder(color);
      this.drawOuterBorder();
    }

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCursor(
      color: string,
      colorsSet: string[],
      x: number,
      y: number,
      centerSquareColor?: string,
    ) {
      this.cursorX = x;
      this.cursorY = y;
      if (centerSquareColor) {
        this.centerSquareColor = centerSquareColor;
      }
      this.clearCanvas();
      this.drawPattern(color, colorsSet);
    }
  }

  let cursorDrawer: CustomCursorDrawer | null = null;

  onmessage = (ev: MessageEvent) => {
    const {
      coordinates,
      canvas: passedCanvas,
      centerColor,
      colorsSet,
      clear,
    }: {
      coordinates: Coordinates;
      canvas: HTMLCanvasElement;
      centerColor: string;
      colorsSet: string[];
      clear: boolean;
    } = ev.data;

    if (!cursorDrawer) {
      cursorDrawer = new CustomCursorDrawer(passedCanvas);
    }

    if (clear) {
      cursorDrawer.clearCanvas();
    }

    if (coordinates) {
      cursorDrawer.drawCursor(
        centerColor,
        colorsSet,
        coordinates.x,
        coordinates.y,
        centerColor,
      );
    }
  };
};

export default createCursorDrawer;
