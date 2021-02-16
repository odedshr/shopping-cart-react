import { createStore } from 'redux'
import { CartItem } from './CartItem';

type State = { [key: string]: CartItem };

function dataReducer(
  state = {} as State,
  action: { type: string, item?: CartItem }
) {
  switch (action.type) {
    case 'cart/set':
      if (action?.item) {
        if (action?.item?.quantity) {
          return { ...state, [action.item.product.id]: action.item };
        } else {
          const stateCopy = { ...state };
          delete stateCopy[action.item.product.id]
          return stateCopy;
        }
      }
      return state;
    case 'cart/clear':
      return {};
    default:
      return state
  }
}

const store = createStore(dataReducer);

export default store;