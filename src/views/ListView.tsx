import ListViewItem from './ListViewItem';
import { Product} from '../products/Product';
import './ListView.scss';

interface IProps {
  items: Product[];
}
const ListView = (props: IProps) => (
  <ul className="listView">{
    props.items.map(product => (<li key={product.id}><ListViewItem product={product} /></li>))
  }</ul>
);

export default ListView;