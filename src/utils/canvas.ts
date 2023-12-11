export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};

const SURFACE_POSITION = { x: 564, y: 192 };

const PACKAGES_POSITION = { x: 1350, y: 290 };
const MAX_STACKED_PACKAGES = 40;

const FIRST_REGISTER_POSITION = { x: 460, y: 310 };
const NEXT_REGISTER_SHIFT_X = 60;
const NEXT_REGISTER_SHIFT_Y = 35;

const DINER_TO_DINER_SHIFT_X = -30;
const DINER_TO_DINER_SHIFT_Y = 30;

const DINER_TO_REGISTER_SHIFT_X = DINER_TO_DINER_SHIFT_X * 2;
const DINER_TO_REGISTER_SHIFT_Y = DINER_TO_DINER_SHIFT_Y * 2;

let cashRegisterImg: HTMLImageElement,
  dinerImg: HTMLImageElement,
  fgImage: HTMLImageElement,
  packageImg: HTMLImageElement;

export const bgScale = 1.1;

export type Diners = Record<number, Set<number>>;

export const drawPizzaPackages = (ctx: CanvasRenderingContext2D, count: number, img: HTMLImageElement) => {
  const clampedCount = Math.min(280, count);
  let x = PACKAGES_POSITION.x, y = PACKAGES_POSITION.y;
  for (let i = 0; i < clampedCount; i++) {
    y = y - 5;
    if (i % MAX_STACKED_PACKAGES === 0) {
      x -= 40;
      y = PACKAGES_POSITION.y + 20 * (i / MAX_STACKED_PACKAGES);

      if (i / MAX_STACKED_PACKAGES === 4) { // empty space between tables
        x -= 60;
      }

      if (i / MAX_STACKED_PACKAGES >= 4) { // shift for the second table
        y += 40;
      }
    }
    ctx.drawImage(img, x, y, img.width, img.height);
  }

  ctx.fillStyle = '#000000';
  ctx.font = '25px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const packagesWidth = (img.width / 1.5) * (clampedCount / MAX_STACKED_PACKAGES);
  ctx.fillText(count.toString(), x + packagesWidth / 2, y + 170);
};

const drawCashRegister = (ctx: CanvasRenderingContext2D, x: number, y: number, img: HTMLImageElement) => {
  const scale = 0.25;
  const imgWidth = img.width * scale;
  const imgHeight = img.height * scale;
  ctx.drawImage(img, x, y, imgWidth, imgHeight);
};

export const loadImages = async () => {
  cashRegisterImg = await loadImage('/images/cash-register.png');
  dinerImg = await loadImage('/images/diner.png');
};

export const getFgImage = async () => {
  if (!fgImage) {
    fgImage = await loadImage('/images/surface.png');
  }
  return fgImage;
};

export const getPackageImage = async () => {
  if (!packageImg) {
    packageImg = await loadImage('/images/package.png');
  }
  return packageImg;
};

export const drawSurface = (ctx: CanvasRenderingContext2D) => {
  ctx.drawImage(fgImage, SURFACE_POSITION.x, SURFACE_POSITION.y, fgImage.width * bgScale, fgImage.height * bgScale);
};

export const drawCashRegisterWithDiners = (
  ctx: CanvasRenderingContext2D,
  cashRegisterDiners: Diners
) => {
  let { x, y } = FIRST_REGISTER_POSITION;
  ctx.font = '25px Arial';
  const minCashRegister = Math.min(...Object.keys(cashRegisterDiners).map(Number));
  const maxCashRegister = Math.max(...Object.keys(cashRegisterDiners).map(Number));
  for (let i = minCashRegister; i < maxCashRegister; i++) {
    drawCashRegister(ctx, x, y, cashRegisterImg);
    const dinersNumber = cashRegisterDiners[i + 1]?.size ?? 0;
    ctx.drawImage(dinerImg, x + DINER_TO_REGISTER_SHIFT_X, y + DINER_TO_REGISTER_SHIFT_Y);
    ctx.fillText(dinersNumber.toString(), x + DINER_TO_REGISTER_SHIFT_X + 20, y + DINER_TO_REGISTER_SHIFT_Y + 20);
    x += NEXT_REGISTER_SHIFT_X;
    y += NEXT_REGISTER_SHIFT_Y;
  }
};
