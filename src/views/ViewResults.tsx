import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListView from './ListView';
import TableView from './TableView';
import { Product } from '../products/Product';
import store from '../products/store';

interface IProps {}
interface IState { items: Product[] }
class ViewResults extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { items:[] as Product[]};
    store.dispatch({type: 'data/query'});
  }
  
  componentDidMount() {
    store.subscribe(() => this.setState({ items: store.getState().items }));
  }

  render() {
    return (
      <section className="results">
        <Switch>
          <Route path="/compare">
            <TableView items={this.state.items} />
          </Route>
          <Route path="/">
            <ListView items={this.state.items}/>
          </Route>
        </Switch>
      </section>
    );
  }
};

export default ViewResults;