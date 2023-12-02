export type CooksMode = 'none' | 'specialized' | 'universal';
export type CookingStage = 'Baking' | 'Dough' | 'Packaging' | 'Topping' | 'Completed' | 'Waiting';
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

export type CookStatus = 'BUSY' | 'FREE' | 'PAUSED';

export type Cook = {
  id: number
  name: string
  specialization: CookingStage | null
  status: CookStatus
  orderId: number | null
  orderPizzaId: number | null
};

export type Order = {
  id: number
  cashRegisterId: number
  createdAt: string
  orderPizzas: Array<{
    id: number
    orderId: number
    recipeId: number
    currentStage?: CookingStage | null
    currentTopping?: string
    completedAt?: string | null
  }>
  diner: {
    id: number
    name: string
  }
};
