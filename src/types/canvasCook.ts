import { loadImage } from '@/utils/canvas';
import type { Cook, CookingStage } from './types';

type CoordinateShiftCoefficient = number;

const COOK_POSITIONS: Record<CookingStage, [number, number, CoordinateShiftCoefficient, CoordinateShiftCoefficient]> = {
  Baking: [1060, 180, +1, +0.5],
  Dough: [790, 350, +1, +0.5],
  Packaging: [1170, 400, +1, 0],
  Topping: [800, 240, +1, -0.5],
  Completed: [0, 0, 0, 0],
  Waiting: [1000, 350, 0, 0]
};

const cooksImages: Partial<Record<CookingStage, HTMLImageElement>> = {};

const loadCookImages = async () => {
  const backCook = await loadImage('/images/cook.png');
  const cookWithPizza = await loadImage('/images/cook2.png');
  const sideCook = await loadImage('/images/cook3.png');
  cooksImages.Baking = sideCook;
  cooksImages.Dough = sideCook;
  cooksImages.Packaging = cookWithPizza;
  const restingCook = await loadImage('/images/cook4.png');
  cooksImages.Topping = backCook;

  cooksImages.Completed = restingCook;
  cooksImages.Waiting = restingCook;
};

loadCookImages();

export class CanvasCook {
  cookData: Pick<Cook, 'id' | 'name' | 'specialization'>;
  currentStage: CookingStage;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  moving: boolean;

  constructor(cookData: Cook, currentStage: CookingStage, stageCooksCount: number) {
    this.cookData = { name: cookData.name, id: cookData.id, specialization: cookData.specialization };
    this.currentStage = currentStage;

    const [x, y, dx, dy] = COOK_POSITIONS[currentStage];
    this.targetX = x + dx * stageCooksCount * 50;
    this.targetY = y + dy * stageCooksCount * 50;

    this.moving = false;

    this.x = this.targetX;
    this.y = this.targetY;
  }

  moveTo(stage: CookingStage, cooks: CanvasCook[]) {
    stage = stage === 'Completed' ? 'Waiting' : stage;
    const [x, y] = findFreePlace(cooks, stage);
    this.targetX = x;
    this.targetY = y;
    this.currentStage = stage;
    this.moving = true;
  }

  updatePosition() {
    if (!this.moving) return;

    const step = 1;
    if (Math.abs(this.targetX - this.x) > step || Math.abs(this.targetY - this.y) > step) {
      this.x += (this.targetX - this.x) > 0 ? step : -step;
      this.y += (this.targetY - this.y) > 0 ? step : -step;
    } else {
      this.x = this.targetX;
      this.y = this.targetY;
      this.moving = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const cookImage = cooksImages[this.currentStage];
    if (cookImage) {
      ctx.drawImage(cookImage, this.x - cookImage.width / 2, this.y - cookImage.height / 2);

      ctx.fillStyle = '#000000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = `${this.cookData.name} (${this.cookData.id})`;

      ctx.fillText(label, this.x, this.y - cookImage.height / 2 - 10);
      ctx.fillText(this.cookData.specialization ?? 'Not specialized', this.x, this.y - cookImage.height / 2 + 5);
    } else {
      console.warn(`Image for ${this.currentStage} not loaded yet.`);
    }
  }
}

function findFreePlace(cooks: CanvasCook[], stage: CookingStage): [number, number] {
  const [x, y, dx, dy] = COOK_POSITIONS[stage];
  for (let i = 0; i < 10; i++) {
    const freePlace = cooks
      .find((cook) => cook.currentStage === stage && cook.x === x + dx * i * 50 && cook.y === y + dy * i * 50);
    if (!freePlace) return [x + dx * i * 50, y + dy * i * 50];
  }
  return [x, y];
}
