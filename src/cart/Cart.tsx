import React, { Component } from "react";
import store from './store';
import i18n from '../i18n';
import CartRow from './CartRow';
import { ReactComponent as BasketIcon } from '../icons/basket.svg';
import './Cart.scss';

const { strings }= i18n;

interface IProps {}
interface IState { count: number, isVisible: boolean }

class Cart extends Component<IProps, IState>  {
  constructor(props:IProps) {
    super(props);
    this.state = { count: 0, isVisible: false };
  }

    componentDidMount() {
    store.subscribe(() => {
      const cart = store.getState();
      this.setState({ 
        ...this.state,
        count: Object.keys(cart).reduce((sum, id)=> sum + cart[id].quantity, 0)
      });
    });
  }

  toggle() {
    const state = this.state;
    this.setState({ ...state, isVisible: !!state.count && !state.isVisible });
  }

  removeAll() {
    store.dispatch({type: 'cart/clear'});
  }

  stopPropagation(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    evt.stopPropagation();
  }

  render() {
    const toggle = this.toggle.bind(this);
    const { count, isVisible }  = this.state;
    const cart = store.getState();
    const items = Object.keys(cart).map((id) => cart[id]);
    const totalCost = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    return (
    <aside className="cart">
      <label className="cartSummary" onClick={toggle}>
        { count ? <span className="cartSummary_action">{strings.viewMyCart}</span> : '' }
        <BasketIcon />
        { count ? <div className="cartSummary_count">{this.state.count}</div> : '' }
      </label>
      { count > 0 && isVisible ? <div className="cartWrapper" onClick={toggle} >
          <div className="cartContent" onClick={this.stopPropagation.bind(this)}>
        <div className="cart_header">
          <h2 className="cart_title">{strings.reviewYourCart}</h2>
          <label className="cart_close" onClick={toggle}><span>{strings.close}</span></label>
        </div >
        <table className="cart_table">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Price</th>
              <th>Qty.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            { items.map(item => (<CartRow
              key={item.product.id}
              item={item}
            />))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}></td>
              <td className="cart_total">{ totalCost.toFixed(2) }</td>
            </tr>
          </tfoot>
        </table>
        <div className="cart_actions">
          <button className="cart_removeAll" onClick={this.removeAll.bind(this)}>{ strings.removeAllItems }</button>
          <button className="cart_checkout" data-task="checkout">{strings.checkout}</button>
        </div>
      </div >
    </div > : '' }
  </aside>);
  }
}

export default Cart;
/*

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Product } from "../products/Product";
import CartRow from "./CartRow.vue";
import i18n from "../i18n";

export default {
  setup() {
    const isVisible = ref(false);
    const strings = i18n.strings;
    const store = useStore();
    const count = computed(() =>
      Object.keys(store.state.cart)
        .map((id) => store.state.cart[id].quantity)
        .reduce((sum, value) => sum + value, 0)
    );
    const totalCost = computed(() =>
      Object.keys(store.state.cart)
        .map((id) => store.state.cart[id])
        .reduce((sum, item) =>  sum + item.quantity * item.product.price, 0)
    );
    const toggle = () => (isVisible.value = !isVisible.value);

    function increase(product: Product) {
      store.state.dispatch("cart/increaseItem", product);
    }

    function decrease(product: Product) {
      store.state.dispatch("cart/decreaseItem", product);
    }

    function remove(product: Product) {
      store.state.dispatch("cart/removeItem", product);
    }

    return {
      CartRow,
      isVisible,
      toggle,
      strings,
      store,
      count,
      totalCost,
      increase,
      decrease,
      remove,
    };
  },
};
</script>

<style scoped lang="scss">

</style>*/