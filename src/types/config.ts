export type CooksMode = 'none' | 'specialized' | 'universal';
export type CookingStage = 'Baking' | 'Dough' | 'Packaging' | 'Topping';
export type Frequency = 'Low' | 'Medium' | 'High';

export type ConfigData = {
  cashRegisterQuantity: number
  cooksNumber: number
  cooksPerStage: Record<CookingStage, number>
  dinerArrivalConfig: {
    frequency: Frequency
    quantity: number
  }
  menu: number[]
  minimumPizzaTime: number
  pizzaStagesTimeCoeffs: Record<CookingStage, number>
  specializedCooksMode: boolean
};

export type Pizza = {
  id: number
  name: string
  topping: string[]
  url: string
};
