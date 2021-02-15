import { ReactNode } from 'react';
import './checkbox.scss';

type Props = { 
  children: ReactNode;
  value: string;
  checked: boolean;
  onUpdate: (value:string, checked:boolean) => void;
};

const Checkbox = (props: Props) => {
  let isChecked = props.checked;
  const id = 'id-' + props.value

    function update() {
      isChecked = !isChecked;
      props.onUpdate(props.value, isChecked);
    }

  return (<fieldset className="checkbox field">
    <input type="checkbox"
      id={id}
      value={props.value}
      checked={isChecked}
      onChange={update}
      hidden
    /><label htmlFor={id} className="tag toggleBtn">{props.children}</label>
  </fieldset>);
};

export default Checkbox;