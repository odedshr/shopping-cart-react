export type QueryFilter =
  'lowSugar' |
  'lowFat' |
  'glutenFree' |
  'nutFree' |
  'kosherParve' |
  'vegetarian' |
  'vegan' |
  'nextDayDelivery' |
  'homeFreezing' |
  'specialMessage' |
  'inStock';

export type OrderOptions = 'popularity' | 'price-asc' | 'price-desc';

export type SearchQuery = {
  types: string[];
  minServing: number;
  maxServing: number;
  kCalPerServing: boolean;
  lowSugar: boolean;
  lowFat: boolean;
  glutenFree: boolean;
  nutFree: boolean;
  kosherParve: boolean;
  vegetarian: boolean;
  vegan: boolean;
  nextDayDelivery: boolean;
  homeFreezing: boolean;
  specialMessage: boolean;
  personalized: boolean;
  person: boolean;
  inStock: boolean;
  order: OrderOptions;
}

export const orderOptions = [
  {
    name: 'Popularity',
    value: 'popularity'
  },
  {
    name: 'price Asc',
    value: 'price-asc'
  },
  {
    name: 'price Desc',
    value: 'price-desc'
  },
]

export const servingsOptions = [1, 2, 4, 6, 8, 10, 12];