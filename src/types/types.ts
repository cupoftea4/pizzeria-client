export type CooksMode = 'none' | 'specialized' | 'universal';
export type CookingStage = 'Baking' | 'Dough' | 'Packaging' | 'Topping' | 'Completed';
export type Frequency = 'Low' | 'Medium' | 'High';

export type PizzaRecipe = {
  id: number
  name: string
  toppings: string[]
  url: string
};

export type ConfigData = {
  cashRegisterQuantity: number
  cooksNumber: number
  cooksPerStage: Record<CookingStage, number>
  dinerArrivalConfig: {
    frequency: Frequency
    quantity: number
  }
  menu: PizzaRecipe[]
  minimumPizzaTime: number
  pizzaStagesTimeCoeffs: Record<CookingStage, number>
  specializedCooksMode: boolean
};

export type ConfigDataSaveDto = Omit<ConfigData, 'menu'> & { menu: number[] };

export type CookStatus = 'busy' | 'free' | 'paused';

export type Cook = {
  id: number
  name: string
  specialization: CookingStage | null
  status: CookStatus
  orderId?: number
  orderPizzaId?: number
};

export type Order = {
  id: number
  cashRegisterId: number
  createdAt: string
  completedAt?: string
  orderPizza: Array<{
    id: number
    orderId: number
    recipeId: number
    currentStage?: CookingStage
    currentToppingIndex?: string
  }>
  dinner: {
    id: number
    name: string
  }
};
