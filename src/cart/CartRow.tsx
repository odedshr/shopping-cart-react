import { ChangeEvent, Component } from 'react';
import { CartItem } from './CartItem';
import store from "./store";
import i18n from "../i18n";

import { ReactComponent as TrashIcon } from '../icons/trash.svg';
import './CartRow.scss';

interface IProps {
  item: CartItem;
}
interface IState { item: CartItem }
const { strings } = i18n;

class CartRow extends Component<IProps, IState>  {
  constructor(props: IProps) {
    super(props);
    this.state = { item: props.item } ;
  }

  updateStore(quantity:number) {
    const item = { ...this.state.item, quantity }
    store.dispatch({ type: 'cart/set', item })
    this.setState({ item});
  }
  increase() {
    this.updateStore(this.state.item.quantity + 1);
  }
  
  decrease() {
    this.updateStore(this.state.item.quantity - 1);
  }

  updateQuantity(evt:ChangeEvent<HTMLInputElement>) {
    this.updateStore(+evt.target.value);
  }

  remove() {
    this.updateStore(0);
  }

  render () {
  const { item } = this.state;
    const qtyId = `${item.product.id}-qty`;
  return (<tr className="cartItem">
    <td className="cartItem_imageTd">
      <img className="cartItem_image" src={item.product.images[0].src} alt={item.product.images[0].alt} />
    </td>
    <td className="cartItem_name">{ item.product.name }</td>
    <td className="cartItem_cost">{ item.product.price }</td>
    <td className="cartItem_qty">
      <button className="cartItem_qty_dec" onClick={this.decrease.bind(this)}>-</button>
      <label htmlFor={qtyId} hidden>Qty</label>
      <input className="cartItem_qty_field"
        id={qtyId}
        type="number"
        value={item.quantity}
        onChange={this.updateQuantity.bind(this)}
      />
      <button className="cartItem_qty_inc" onClick={this.increase.bind(this)}>+</button>

      <button className="cartItem_remove_btn" onClick={this.remove.bind(this)} >
        <TrashIcon /><span>{strings.remove}</span>
      </button >
    </td >
  <td className="cartItem_totalCost">{(item.quantity * item.product.price).toFixed(2)}</td>
  </tr >)
};
}


export default CartRow;