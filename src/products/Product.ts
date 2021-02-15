export type Kosher = 'parve' | 'dairy' | undefined;
export type Image = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  images: Image[];
  type: string;
  servings: number;
  stock: number;
  priceBeforeDiscount: number;
  discount: number;
  price: number;
  popularity: number;
  nutrition: {
    kCalPerServing: number;
    lowSugar: boolean;
    lowFat: boolean;
  };
  dietaryOptions: {
    glutenFree: boolean;
    nutFree: boolean;
    kosher?: Kosher;
    vegetarian: boolean;
    vegan: boolean;
  };
  deliveryOptions: {
    nextDayDelivery: boolean;
    homeFreezing: boolean;
  };
  customizations: {
    personalized: boolean;
    specialMessage: boolean;
  };
}