/* eslint-disable max-statements */
import { useCallback, useEffect, useRef } from 'react';
import styles from './style.module.css';
import { useCooks } from '@/context/CooksContext';
import { loadImage } from '@/utils/canvas';

const SURFACE_POSITION = { x: 564, y: 192 };

const FIRST_REGISTER_POSITION = { x: 460, y: 310 };
const NEXT_REGISTER_SHIFT_X = 60;
const NEXT_REGISTER_SHIFT_Y = 35;

const DINER_TO_DINER_SHIFT_X = -30;
const DINER_TO_DINER_SHIFT_Y = 30;

const DINER_TO_REGISTER_SHIFT_X = DINER_TO_DINER_SHIFT_X * 2;
const DINER_TO_REGISTER_SHIFT_Y = DINER_TO_DINER_SHIFT_Y * 2;

const bgScale = 1.1;

const drawCashRegister = (ctx: CanvasRenderingContext2D, x: number, y: number, img: HTMLImageElement) => {
  const scale = 0.25;
  const imgWidth = img.width * scale;
  const imgHeight = img.height * scale;
  ctx.drawImage(img, x, y, imgWidth, imgHeight);
};

type Diners = Record<number, Set<number>>;

const drawCashRegisterWithDiners = (
  ctx: CanvasRenderingContext2D,
  cashRegisterImg: HTMLImageElement,
  dinerImg: HTMLImageElement,
  cashRegisterDiners: Diners
) => {
  let { x, y } = FIRST_REGISTER_POSITION;
  ctx.font = '25px Arial';
  for (let i = 0; i < Object.keys(cashRegisterDiners).length; i++) {
    drawCashRegister(ctx, x, y, cashRegisterImg);
    const dinersNumber = cashRegisterDiners[i + 1]?.size ?? 0;
    ctx.drawImage(dinerImg, x + DINER_TO_REGISTER_SHIFT_X, y + DINER_TO_REGISTER_SHIFT_Y);
    ctx.fillText(dinersNumber.toString(), x + DINER_TO_REGISTER_SHIFT_X + 20, y + DINER_TO_REGISTER_SHIFT_Y + 20);
    x += NEXT_REGISTER_SHIFT_X;
    y += NEXT_REGISTER_SHIFT_Y;
  }
};

type OwnProps = {
  diners: Diners
};

let cashRegisterImg: HTMLImageElement, dinerImg: HTMLImageElement, fgImage: HTMLImageElement;

const loadImages = async () => {
  cashRegisterImg = await loadImage('/images/cash-register.png');
  dinerImg = await loadImage('/images/diner.png');
};

const getFgImage = async () => {
  if (!fgImage) {
    fgImage = await loadImage('/images/surface.png');
  }
  return fgImage;
};

const PizzeriaBackground = ({ diners }: OwnProps) => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cooksCanvasRef = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement>(null);
  const { cooks } = useCooks();

  const requestRef = useRef<number>();

  const drawBackground = async () => {
    const canvas = bgCanvasRef.current;
    if (canvas?.getContext) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const bgImage = await loadImage('/images/kitchen-cut.png');
        const imgWidth = bgImage.width * bgScale;
        const imgHeight = bgImage.height * bgScale;
        const offsetY = -150;
        const offsetX = -500;
        ctx.drawImage(bgImage, offsetX, offsetY, imgWidth, imgHeight);
      }
    }
  };

  useEffect(() => {
    const canvas = fgCanvasRef.current;
    if (!canvas?.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    getFgImage().then(img => {
      ctx.drawImage(img, SURFACE_POSITION.x, SURFACE_POSITION.y, img.width * bgScale, img.height * bgScale);
      drawCashRegisterWithDiners(ctx, cashRegisterImg, dinerImg, diners);
    });
  }, [diners]);

  const animate = useCallback(() => {
    const canvas = cooksCanvasRef.current;
    if (canvas?.getContext) {
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cooks.forEach(cook => {
        cook.updatePosition();
        cook.draw(ctx);
      });
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [cooks]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  const startVisualization = useCallback(() => {
    const canvas = bgCanvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    }
    const cooksCanvas = cooksCanvasRef.current;
    if (cooksCanvas) {
      cooksCanvas.width = window.innerWidth;
      cooksCanvas.height = window.innerHeight;
    }
    const fgCanvas = fgCanvasRef.current;
    if (fgCanvas) {
      fgCanvas.width = window.innerWidth;
      fgCanvas.height = window.innerHeight;
    }
    loadImages();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', startVisualization);
    startVisualization();

    // Clean up
    return () => {
      window.removeEventListener('resize', startVisualization);
    };
  }, [startVisualization]);

  return <>
    <canvas ref={bgCanvasRef} className={styles.root} />
    <canvas ref={cooksCanvasRef} className={styles.root} />
    <canvas ref={fgCanvasRef} className={styles.root} />
  </>;
};

export default PizzeriaBackground;
