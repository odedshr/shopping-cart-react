import TableViewItem from './TableViewItem';
import { Product} from '../products/Product';
import { ReactComponent as KosherIcon } from '../icons/kosher.svg';
import { ReactComponent as CaloriesIcon } from '../icons/kcal.svg';
import { ReactComponent as SugarIcon } from '../icons/sugar.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as GlutenIcon } from '../icons/gluten-free.svg';
import { ReactComponent as NutIcon } from '../icons/nut-free.svg';
import { ReactComponent as VegetarianIcon } from '../icons/vegetarian.svg';
import { ReactComponent as VeganIcon } from '../icons/vegan.svg';
import i18n from '../i18n';

const { strings } = i18n;

interface IProps {
  items: Product[];
}

const TableView = (props:IProps) => (
<table className="tableView" cellSpacing={0}>
    <thead>
      <tr>
        <th colSpan={2}>{strings.name}</th>
        <th>{strings.price}</th>
        <th>{strings.servings}</th>
        <th title={strings.kCal}><CaloriesIcon /></th>
        <th className="boolCol" title={strings.lowSugar}><SugarIcon /></th>
        <th className="boolCol" title={strings.lowFat}><HeartIcon /></th>
        <th className="boolCol" title={strings.glutenFree}><GlutenIcon /></th>
        <th className="boolCol" title={strings.nutFree}><NutIcon /></th>
        <th  title={strings.kosherParve}><KosherIcon /></th>
        <th className="boolCol" title={strings.vegetarian}><VegetarianIcon /></th>
        <th className="boolCol" title={strings.vegan}><VeganIcon /></th>
      </tr>
    </thead>
    <tbody>
      {props.items.map(product => (<TableViewItem key={product.id} product={product} />)) }
    </tbody>
  </table>
);

export default TableView;