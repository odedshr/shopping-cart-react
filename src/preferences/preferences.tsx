import { NavLink } from 'react-router-dom';
import i18n from '../i18n';
import store from '../products/store';

import { OrderOptions } from '../filters/SearchQuery'; // SearchQuery
import { ReactComponent as ListIcon } from '../icons/list.svg';
import { ReactComponent as GridIcon } from '../icons/grid.svg';
import './preferences.scss';

const { strings } = i18n;

const Preferences = () => {
  function updateOrder(event: React.ChangeEvent<HTMLSelectElement>) {
    const order: OrderOptions = event.currentTarget.value as OrderOptions;
    store.dispatch({ type: 'data/query', query: { order }});
  }

  return (<form onSubmit={()=>false} className="preferences">
    <nav className="viewAs">
      <label>{ strings.viewAs }</label>
      <NavLink className="toggleBtn btn_list"
        activeClassName='is-active'
        exact={true}
        to="/"
      ><ListIcon /><span> { strings.viewList }</span></NavLink>
      <NavLink className="toggleBtn btn_table"
        activeClassName='is-active'
        to="/compare"
      ><GridIcon /><span> { strings.viewTable }</span></NavLink>
    </nav >
    <div className="sortBy">
    <label>{ strings.sortBy }</label>
      <select title={strings.sortBy} onChange={updateOrder} className="sortBy_field">
        <option value="popularity">{ strings.sortPopularity }</option>
        <option value="price-asc">{ strings.sortPriceAsec }</option>
        <option value="price-desc">{ strings.sortPriceDesc }</option>
        <option value="kcal-asc">{ strings.sortkCalAsec }</option>
        <option value="kcal-desc">{ strings.sortkCalDesc }</option>
        <option value="servings-asc">{ strings.sortServingsAsec }</option>
        <option value="servings-desc">{ strings.sortServingsDesc }</option>
      </select>
    </div >
  </form >);
};

export default Preferences;