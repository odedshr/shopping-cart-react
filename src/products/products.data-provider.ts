import { Product, Kosher } from './Product';
import { SearchQuery, servingsOptions } from '../filters/SearchQuery';

const random = (items: number[] | string[]) => (items[Math.floor(Math.random() * items.length)]);
const range = (min: number, max: number) => (min + (Math.random() * (max - min)));
const bool = () => (Math.random() > 0.5);

const suitableForMessage = ['cake', 'sponge cake', 'pie', 'coffee cake', 'carrot cake'];
const cakeTypes = [...suitableForMessage, 'cookie', 'brownie', 'pudding', 'bread', 'muffin', 'cupcake', 'tart'];
const mainIngredient = ['chocolate', 'mint', 'lemon', 'key lime', 'strawberry', 'meringue', 'fudge', 'vanilla', 'cherry-liqueur', 'cherry', 'black-forest', 'hazelnuts', 'cashews', 'butter', 'coconut', 'chocolate chips', 'rice puffs'];

function getCakeName(cakeType: string) {
  const secondIngredient = bool() ? `${random(mainIngredient)} ` : ''
  return `${random(mainIngredient)} ${secondIngredient}${cakeType}`;
}

function toTitleCase(sentence: string) {
  return sentence.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}
function randomProduct(id: string): Product {
  const type = `${random(cakeTypes)}`;
  const name = toTitleCase(getCakeName(type));
  const servings = +random(servingsOptions);
  const kCalPerServing = Math.round(range(300, 1000));
  const kosher: Kosher = Math.random() > 0.3 ? (bool() ? 'parve' : 'dairy') : undefined;
  const vegetarian = kosher !== undefined && bool();
  const priceBeforeDiscount = +(range(1, 3) * servings).toFixed(2);
  const discount = +random([0, 10, 25, 50]);

  return {
    id,
    name,
    images: [{ src: `img/products/product-${Math.round(range(1, 15))}.jpg`, alt: name }],
    type,
    servings,
    popularity: Math.round(range(1, 100)),
    priceBeforeDiscount,
    discount,
    price: +((priceBeforeDiscount * (100 - discount)) / 100).toFixed(2),
    stock: range(0, 30),
    nutrition: {
      kCalPerServing,
      lowSugar: (kCalPerServing + range(0, 200)) < 500 && bool(),
      lowFat: (kCalPerServing + range(0, 200)) < 600 && bool(),
    },
    dietaryOptions: {
      kosher,
      glutenFree: bool(),
      nutFree: bool(),
      vegetarian,
      vegan: vegetarian && bool()
    },
    deliveryOptions: {
      nextDayDelivery: bool(),
      homeFreezing: bool()
    },
    customizations: {
      personalized: bool(),
      specialMessage: (suitableForMessage.indexOf(type) > -1) && bool()
    }
  }
}

function getSorter(orderBy: string) {
  switch (orderBy) {
    case 'price-asc':
      return (a: Product, b: Product) => (a.price - b.price);
    case 'price-desc':
      return (a: Product, b: Product) => (b.price - a.price);
    case 'kcal-asc':
      return (a: Product, b: Product) => (a.nutrition.kCalPerServing - b.nutrition.kCalPerServing);
    case 'kcal-desc':
      return (a: Product, b: Product) => (b.nutrition.kCalPerServing - a.nutrition.kCalPerServing);
    case 'servings-asc':
      return (a: Product, b: Product) => (a.servings - b.servings);
    case 'servings-desc':
      return (a: Product, b: Product) => (b.servings - a.servings);
    default:
      return (a: Product, b: Product) => (a.popularity - b.popularity);
  }
}

const db = Array.from({ length: 50 }, (_, i) => randomProduct(`${i}`));

async function getProducts(filters: Partial<SearchQuery> = {}): Promise<Product[]> {
  const filtered = db.filter(product => (
    (!filters.types || !filters.types.length || filters.types.indexOf(product.type) > -1) &&
    (!filters.minServing || product.servings >= filters.minServing) &&
    (!filters.maxServing || product.servings <= filters.maxServing) &&
    (!filters.kCalPerServing || product.nutrition.kCalPerServing < 500) &&
    (!filters.lowSugar || product.nutrition.lowSugar) &&
    (!filters.lowFat || product.nutrition.lowFat) &&
    (!filters.glutenFree || product.dietaryOptions.glutenFree) &&
    (!filters.nutFree || product.dietaryOptions.nutFree) &&
    (!filters.kosherParve || product.dietaryOptions.kosher === 'parve') &&
    (!filters.vegetarian || product.dietaryOptions.vegetarian) &&
    (!filters.vegan || product.dietaryOptions.vegan) &&
    (!filters.nextDayDelivery || product.deliveryOptions.nextDayDelivery) &&
    (!filters.homeFreezing || product.deliveryOptions.homeFreezing) &&
    (!filters.specialMessage || product.customizations.specialMessage) &&
    (!filters.personalized || product.customizations.personalized) &&
    (!filters.inStock || product.stock > 0)
  ));

  filtered.sort(getSorter(filters.order || 'popularity'));
  return filtered;
}

async function getProductTypes(): Promise<string[]> {
  const types: { [key: string]: true } = {};
  db.forEach(product => { types[product.type] = true; });
  return Object.keys(types).sort();
}

export { getProducts, getProductTypes };