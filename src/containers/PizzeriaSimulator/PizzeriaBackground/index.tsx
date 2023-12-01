/* eslint-disable max-statements */
import { useCallback, useEffect, useRef } from 'react';
import styles from './style.module.css';

const SURFACE_POSITION = { x: 564, y: 192 };

const FIRST_REGISTER_POSITION = { x: 460, y: 310 };
const NEXT_REGISTER_SHIFT_X = 60;
const NEXT_REGISTER_SHIFT_Y = 35;

const DINER_TO_DINER_SHIFT_X = -30;
const DINER_TO_DINER_SHIFT_Y = 30;

const DINER_TO_REGISTER_SHIFT_X = DINER_TO_DINER_SHIFT_X * 2;
const DINER_TO_REGISTER_SHIFT_Y = DINER_TO_DINER_SHIFT_Y * 2;

const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

const drawCashRegister = (ctx: CanvasRenderingContext2D, x: number, y: number, img: HTMLImageElement) => {
  const scale = 0.25;
  const imgWidth = img.width * scale;
  const imgHeight = img.height * scale;
  ctx.drawImage(img, x, y, imgWidth, imgHeight);
};

type Diners = Record<number, number>;

const drawCashRegisterWithDiners = (
  ctx: CanvasRenderingContext2D,
  cashRegisterImg: HTMLImageElement,
  dinerImg: HTMLImageElement,
  cashRegisterDiners: Diners
) => {
  let { x, y } = FIRST_REGISTER_POSITION;
  for (let i = 0; i < Object.keys(cashRegisterDiners).length; i++) {
    drawCashRegister(ctx, x, y, cashRegisterImg);
    const dinersNumber = cashRegisterDiners[i + 1] ?? 0;
    for (let j = 0; j < dinersNumber; j++) {
      const dinerX = x + DINER_TO_REGISTER_SHIFT_X + DINER_TO_DINER_SHIFT_X * j;
      const dinerY = y + DINER_TO_REGISTER_SHIFT_Y + DINER_TO_DINER_SHIFT_Y * j;
      ctx.drawImage(dinerImg, dinerX, dinerY);
    }
    x += NEXT_REGISTER_SHIFT_X;
    y += NEXT_REGISTER_SHIFT_Y;
  }
};

const diners: Diners = {
  1: 3,
  2: 4,
  3: 1,
  4: 0,
  5: 2
};

const PizzeriaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = async () => {
    const canvas = canvasRef.current;
    if (canvas?.getContext) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const bgImage = await loadImage('/images/kitchen-cut.png');
        const fgImage = await loadImage('/images/surface.png');
        const cashRegisterImg = await loadImage('/images/cash-register.png');
        const dinerImg = await loadImage('/images/diner.png');
        const cookImg = await loadImage('/images/cook.png');
        const cook2Img = await loadImage('/images/cook2.png');
        const cook3Img = await loadImage('/images/cook3.png');
        const cook4Img = await loadImage('/images/cook4.png');

        const scale = 1.1;
        const imgWidth = bgImage.width * scale;
        const imgHeight = bgImage.height * scale;
        const offsetY = -150;
        const offsetX = -500;

        ctx.drawImage(bgImage, offsetX, offsetY, imgWidth, imgHeight);

        // cooks go here
        ctx.drawImage(cookImg, 700, 150);
        ctx.drawImage(cook2Img, 1000, 150);
        ctx.drawImage(cook3Img, 830, 350);
        ctx.drawImage(cook4Img, 1200, 250);

        ctx.drawImage(fgImage, SURFACE_POSITION.x, SURFACE_POSITION.y, fgImage.width * scale, fgImage.height * scale);

        drawCashRegisterWithDiners(ctx, cashRegisterImg, dinerImg, diners);
      }
    }
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  return <canvas ref={canvasRef} className={styles.root} />;
};

export default PizzeriaBackground;

