import { createStore } from 'redux'

import { Product } from './Product';
import { SearchQuery } from '../filters/SearchQuery';
import { getProducts } from './products.data-provider';

function dataReducer(
  state = { items: [] as Product[], query: {} as SearchQuery },
  action: { type: string, query?: Partial<SearchQuery>, items?: Product[] }
) {
  switch (action.type) {
    case 'data/query':
      const query = { ...state.query, ...action.query };

      getProducts(query)
        .then(items => store.dispatch({ type: 'data/fetch', items }));

      return { ...state, query };
    case 'data/fetch':
      return { ...state, items: action.items || [] }
    default:
      return state
  }
}

const store = createStore(dataReducer);

export default store;
