import { Product } from '../products/Product';
import store from '../cart/store';

import i18n from '../i18n';
import { ReactComponent as BasketIcon } from '../icons/basket.svg';
import { ReactComponent as SugarIcon } from '../icons/sugar.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as GlutenIcon } from '../icons/gluten-free.svg';
import { ReactComponent as NutIcon } from '../icons/nut-free.svg';
import { ReactComponent as VegetarianIcon } from '../icons/vegetarian.svg';
import { ReactComponent as VeganIcon } from '../icons/vegan.svg';

import './TableViewItem.scss';
import { Component } from 'react';

interface IProps {
  product: Product
}

interface IState {
  count: number
}

const { strings } = i18n;

class TableViewItem extends Component<IProps, IState> {
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
    store.dispatch({ type: 'cart/set', item: { product, quantity } });
  }

  render() {
    const { product } = this.props;
    const quantity = this.state.count;

    return (<tr className="product">
    <td className="product_image_col">
      <figure className="product_image">
        <img
          src={product.images[0].src}
          alt={product.images[0].alt}
        />
      </figure>
      <div className="product_actions">
        <button
          className="product_action product_addBasket"
            onClick={this.addToCart.bind(this)}
        >
          <BasketIcon/>
            <span>{strings.addToBasket}</span>
        </button>
          <div className="product_qty">{quantity}</div>
      </div>
    </td>
      <td className="product_name">{product.name}</td>
      <td className="product_cost">{product.price}</td>
      <td className="product_servings">{product.servings}</td>
      <td className="product_kCalPerServing">{product.nutrition.kCalPerServing}</td>
      <td className="product_lowSugar">{product.nutrition.lowSugar ? <SugarIcon /> : ' '}</td>
      <td className="product_lowFat">{product.nutrition.lowFat ? <HeartIcon /> : ' '}</td>
      <td className="product_glutenFree">{product.dietaryOptions.glutenFree ? <GlutenIcon /> : ' '}</td>
      <td className="product_nutFree">{product.dietaryOptions.nutFree ? <NutIcon /> : ' '}</td>
    <td className="product_kosher">{ product.dietaryOptions.kosher }</td>
      <td className="product_vegetarian">{product.dietaryOptions.vegetarian ? <VegetarianIcon /> : ' '}</td>
      <td className="product_vegan">{product.dietaryOptions.vegan ? <VeganIcon /> : ' '}</td>
  </tr >);
  }
}

export default TableViewItem;