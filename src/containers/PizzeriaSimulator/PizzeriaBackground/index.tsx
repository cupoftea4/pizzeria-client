import { useCallback, useEffect, useRef } from 'react';
import styles from './style.module.css';
import { useKitchenVisualization } from '@/context/CooksContext';
import {
  type Diners,
  bgScale,
  getPackageImage,
  drawPizzaPackages,
  getFgImage,
  drawCashRegisterWithDiners,
  drawSurface,
  loadImages,
  loadImage
} from '@/utils/canvas';

type OwnProps = {
  diners: Diners
  showModal: (orderId: number, pizzaOrderId: number | null) => void
};

const PizzeriaBackground = ({ diners, showModal }: OwnProps) => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cooksCanvasRef = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement>(null);
  const completedCanvasRef = useRef<HTMLCanvasElement>(null);
  const { cooks, completedOrdersNumber } = useKitchenVisualization();

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
    const canvas = completedCanvasRef.current;
    if (!canvas?.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    getPackageImage().then(img => {
      drawPizzaPackages(ctx, completedOrdersNumber, img);
    });
  }, [completedOrdersNumber]);

  useEffect(() => {
    const canvas = fgCanvasRef.current;
    if (!canvas?.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    getFgImage().then(() => {
      drawSurface(ctx);
      drawCashRegisterWithDiners(ctx, diners);
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

  const checkClickOnImage = useCallback((x: number, y: number) => {
    for (const cook of cooks.toReversed()) {
      if (cook.isClicked(x, y)) {
        if (cook.cookData.orderId !== null) {
          showModal(cook.cookData.orderId, cook.cookData.orderPizzaId);
        }
        return;
      }
    }
  }, [cooks, showModal]);

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
    const completedCanvas = completedCanvasRef.current;
    if (completedCanvas) {
      completedCanvas.width = window.innerWidth;
      completedCanvas.height = window.innerHeight;
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

  useEffect(() => {
    const canvas = completedCanvasRef.current;
    if (!canvas?.getContext) return;

    const onClick = function(event: MouseEvent) {
      console.log('click');
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      checkClickOnImage(x, y);
    };

    console.log('adding listener');
    canvas.addEventListener('click', onClick);

    return () => {
      console.log('removing listener');
      canvas.removeEventListener('click', onClick);
    };
  }, [checkClickOnImage]);

  return <>
    <canvas ref={bgCanvasRef} className={styles.root} />
    <canvas ref={cooksCanvasRef} className={styles.root} />
    <canvas ref={fgCanvasRef} className={styles.root} />
    <canvas ref={completedCanvasRef} className={styles.root} />
  </>;
};

export default PizzeriaBackground;
