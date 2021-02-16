import { Component } from 'react';

import { SearchQuery, QueryFilter } from '../filters/SearchQuery';
import { getProductTypes } from '../products/products.data-provider';
import Checkbox from '../controls/checkbox';
import MultiSelect from '../controls/multi-select';
import store from '../products/store';
import i18n from '../i18n';

import { ReactComponent as SugarIcon } from '../icons/sugar.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as GlutenIcon } from '../icons/gluten-free.svg';
import { ReactComponent as NutIcon } from '../icons/nut-free.svg';
import { ReactComponent as KosherIcon } from '../icons/kosher.svg';
import { ReactComponent as VegetarianIcon } from '../icons/vegetarian.svg';
import { ReactComponent as VeganIcon } from '../icons/vegan.svg';
import { ReactComponent as CaloriesIcon } from '../icons/kcal.svg';
import { ReactComponent as CheckboxIcon } from '../icons/checkbox.svg';
import './filters.scss';

const { strings } = i18n;

interface IProps {
}
interface IState {
  query: Partial<SearchQuery>;
  allTypes: { key: string; value: string }[];
}

class Filters extends Component<IProps, IState> {
  constructor(props:{}) {
    super(props);
    const query: Partial<SearchQuery> = {
      minServing: 1,
      maxServing: 12,
      types: []
    };
    this.state = { query, allTypes:[] };
  }
  
  componentDidMount() {
    this.getTypes();
  }

  async getTypes() {
    const allTypes = (await getProductTypes()).map(type => ({ key: type, value: type }));
    this.setState({ ...this.state, allTypes });
  };

  updateQuery(query: Partial<SearchQuery>) {
    this.setState({ query });
    store.dispatch({ type: 'data/query', query });
  }
  updateTypes(types: string[]) {
    this.updateQuery({ ...this.state.query, types });
  }

  updateMinServing(event: React.ChangeEvent<HTMLInputElement>) {
    this.updateQuery({ ...this.state.query, minServing: +event.target.value });
  }

  updateMaxServing(event: React.ChangeEvent<HTMLInputElement>) {
    this.updateQuery({ ...this.state.query, maxServing: +event.target.value });
  }

  updateBooleanFilter(key: string, checked: boolean) {
    this.updateQuery({ ...this.state.query, [key as QueryFilter]: checked });
  }

  render() {
    const query = this.state.query;
    const updateBooleanFilter = this.updateBooleanFilter.bind(this);
    const updateMinServing = this.updateMinServing.bind(this);
    const updateMaxServing = this.updateMaxServing.bind(this);

    return (<form onSubmit={()=>false} className="filters">
      <h3 className="filters_title">Show only</h3>
      <div className="filters_copy">Select all that applies</div>

      <section>
        <h4>Category</h4>
        <MultiSelect className="filters_type"
          items={this.state.allTypes}
          value={query.types || []}
          placeholder="What are you craving for?"
          onUpdate={this.updateTypes.bind(this)}
        />
      </section>

      <section>
        <h4>Dietary requirement</h4>
        <Checkbox value="lowSugar" checked={!!query.lowSugar} onUpdate={updateBooleanFilter}>
          <SugarIcon /><span>{strings.lowSugar}</span></Checkbox>
        <Checkbox value="lowFat" checked={!!query.lowFat} onUpdate={updateBooleanFilter} >
          <HeartIcon /><span>{strings.lowFat}</span></Checkbox >
        <Checkbox value="glutenFree" checked={!!query.glutenFree} onUpdate={updateBooleanFilter} >
          <GlutenIcon /><span>{strings.glutenFree}</span></Checkbox >
        <Checkbox value="nutFree" checked={!!query.nutFree} onUpdate={updateBooleanFilter} >
          <NutIcon /><span>{strings.nutFree}</span></Checkbox >
        <Checkbox value="kosherParve" checked={!!query.kosherParve} onUpdate={updateBooleanFilter} >
          <KosherIcon /><span>{strings.kosherParve}</span></Checkbox >
        <Checkbox value="vegetarian" checked={!!query.vegetarian} onUpdate={updateBooleanFilter} >
          <VegetarianIcon /><span>{strings.vegetarian}</span></Checkbox >
        <Checkbox value="vegan" checked={!!query.vegan} onUpdate={updateBooleanFilter} >
          <VeganIcon /><span>{strings.vegan}</span></Checkbox >
        <Checkbox value="kCalPerServing" checked={!!query.kCalPerServing} onUpdate={updateBooleanFilter} >
          <CaloriesIcon /><span>{strings.kcal}</span></Checkbox >
      </section >

      <section className="filters_servings">
        <h4>{strings.servings}</h4>
        <fieldset>
          <input title={strings.minServing}
            type="number"
            className="numberField"
            max={query.maxServing}
            value={query.minServing}
            onChange={updateMinServing}
          />
          to
          <input title={strings.minServing}
            type="number"
            className="numberField"
            min={query.minServing}
            value={query.maxServing}
            onChange={updateMaxServing}
          />
          people
        </fieldset>
      </section>

      <section>
        <h4>{strings.delivery}</h4>
        <Checkbox value="nextDayDelivery" checked={!!query.nextDayDelivery} onUpdate={updateBooleanFilter} data-theme="mute">
          <CheckboxIcon /><span>{strings.nextDayDelivery}</span></Checkbox>
        <Checkbox value="homeFreezing" checked={!!query.homeFreezing} onUpdate={updateBooleanFilter} data-theme="mute" >
          <CheckboxIcon /><span>{strings.homeFreezing}</span></Checkbox >
        <Checkbox value="inStock" checked={!!query.inStock} onUpdate={updateBooleanFilter} data-theme="mute" >
          <CheckboxIcon /><span>{strings.inStock}</span></Checkbox >
      </section >

      <section>
        <h4>{strings.personalization}</h4>
        <Checkbox value="personalized" checked={!!query.personalized} onUpdate={this.updateBooleanFilter} data-theme="mute"><CheckboxIcon /><span>{strings.personalized}</span></Checkbox>
        <Checkbox value="specialMessage" checked={!!query.specialMessage} onUpdate={this.updateBooleanFilter} data-theme="mute" ><CheckboxIcon /><span>{strings.specialMessage}</span></Checkbox >
      </section >
    </form>);
  }
};

export default Filters;