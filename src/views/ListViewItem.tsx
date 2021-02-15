import { Product } from '../products/Product';
import store from '../cart/store';

import i18n from '../i18n';
import { ReactComponent as BasketIcon } from '../icons/basket.svg';
import { ReactComponent as SugarIcon } from '../icons/sugar.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as GlutenIcon } from '../icons/gluten-free.svg';
import { ReactComponent as NutIcon } from '../icons/nut-free.svg';
import { ReactComponent as KosherIcon } from '../icons/kosher.svg';
import { ReactComponent as VegetarianIcon } from '../icons/vegetarian.svg';
import { ReactComponent as VeganIcon } from '../icons/vegan.svg';
import { ReactComponent as CaloriesIcon } from '../icons/kcal.svg';

import './ListViewItem.scss';
import { Component } from 'react';

interface IProps {
  product:Product
}

interface IState {
  count: number
}

const { strings } = i18n;

class ListViewItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      count: store.getState()[props.product.id]?.quantity || 0
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ count: store.getState()[this.props.product.id]?.quantity || 0 });
    });
  }

  addToCart() {
    const { product } = this.props;
    const quantity = this.state.count + 1;
    store.dispatch({ type: 'cart/set', item: { product, quantity  } });
  }

  render() {
    const { product } = this.props;
    const quantity = this.state.count;

    return (
      <div className="listView_product">
        <figure className="listView_product_image">
          <img
            src={ product.images[0].src}
            alt={ product.images[0].alt}
          />
        </figure>
        <div className="listView_product_actions">
          <button
            className="listView_product_action listView_product_addBasket"
            onClick={this.addToCart.bind(this)}
          >
            <BasketIcon />
            <span>Add to basket</span>
          </button>
          <div className="listView_product_qty">{quantity || '+'}</div>
        </div>
        <div className="listView_product_info">
          { product.dietaryOptions.glutenFree ? <span title={strings.glutenFree}><GlutenIcon /></span> : '' }
          { product.dietaryOptions.nutFree ? <span title={strings.nutFree}><NutIcon /></span> : ''}
          { product.dietaryOptions.kosher ? <span title={strings.kosherParve}><KosherIcon /></span> : ''}
          { product.dietaryOptions.vegetarian ? <span title={strings.vegetarian}><VegetarianIcon /></span> : ''}
          { product.dietaryOptions.vegan ? <span title={strings.vegan}><VeganIcon /></span> : ''}
          { product.nutrition.lowSugar ? <span title={strings.lowSugar}><SugarIcon /></span> : ''}
          { product.nutrition.lowFat ? <span title={strings.lowFat}><HeartIcon /></span> : ''}
          { product.nutrition.kCalPerServing < 500 ? <span title={strings.kCalPerServing}><CaloriesIcon /></span> : ''}
        </div >
        <div className="listView_product_summary">
          <div className="listView_product_name">{product.name}</div>
          {product.discount ? <div className="listView_price_beforeDiscount">{product.priceBeforeDiscount}</div> : '' }
          <div className="listView_product_cost">{product.price}</div>
          <div className="listView_product_serves"><span>Serves: </span><span>{product.servings}</span></div>
        </div>
      </div>
    );
  }
}

export default ListViewItem;