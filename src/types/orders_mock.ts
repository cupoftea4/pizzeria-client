import type { Cook, Order, PizzaRecipe } from './types';

export const cooksMock: Cook[] = [
  { id: 1, name: 'John', specialization: null, status: 'BUSY', orderId: 1, orderPizzaId: 1 }
];
export const orderMock: Order = {
  id: 1,
  cashRegisterId: 1,
  createdAt: '2023-11-19T02:40:10.000Z',
  orderPizzas: [
    { id: 1, orderId: 1, recipeId: 1, currentStage: 'Dough', currentTopping: '0' },
    { id: 2, orderId: 1, recipeId: 2, currentStage: 'Dough', currentTopping: '0' }
  ],
  diner: { id: 1, name: 'Dinner' }
};
export const ordersMock: Order[] = [
  {
    id: 1,
    cashRegisterId: 1,
    createdAt: '2023-11-19T02:40:10.000Z',
    orderPizzas: [
      { id: 1, orderId: 1, recipeId: 1, currentStage: 'Dough', currentTopping: '0' },
      { id: 2, orderId: 1, recipeId: 2, currentStage: 'Dough', currentTopping: '0' }
    ],
    diner: { id: 1, name: 'Kate' }
  },
  {
    id: 2,
    cashRegisterId: 1,
    createdAt: '2023-11-19T02:40:10.000Z',
    orderPizzas: [
      { id: 1, orderId: 2, recipeId: 1, currentStage: 'Dough', currentTopping: '0' },
      { id: 2, orderId: 2, recipeId: 2, currentStage: 'Dough', currentTopping: '0' },
      { id: 2, orderId: 2, recipeId: 2, currentStage: 'Dough', currentTopping: '0' }
    ],
    diner: { id: 2, name: 'William' }
  },
  {
    id: 3,
    cashRegisterId: 1,
    createdAt: '2023-11-19T02:40:10.000Z',
    orderPizzas: [
      { id: 1, orderId: 3, recipeId: 2, currentStage: 'Dough', currentTopping: '0' }
    ],
    diner: { id: 3, name: 'Alex' }
  },
  {
    id: 4,
    cashRegisterId: 1,
    createdAt: '2023-11-19T02:40:10.000Z',
    orderPizzas: [
      { id: 1, orderId: 4, recipeId: 1, currentStage: 'Dough', currentTopping: '0' },
      { id: 2, orderId: 4, recipeId: 2, currentStage: 'Dough', currentTopping: '0' },
      { id: 1, orderId: 4, recipeId: 1, currentStage: 'Dough', currentTopping: '0' }
    ],
    diner: { id: 4, name: 'Tom' }
  }
];
export const menuMock: PizzaRecipe[] = [
  {
    id: 1,
    name: 'Pepperoni',
    toppings: ['Tomato', 'Pepperoni', 'Mozzarella'],
    url: 'https://imgur.com/Ao3Mwi0.png'
  },
  {
    id: 2,
    name: 'Hawaiian',
    toppings: ['Neapolitan Sauce', 'Roasted Chicken', 'Pineapples', 'Mozzarella'],
    url: 'https://imgur.com/TZZKCxO.png'
  }
];
