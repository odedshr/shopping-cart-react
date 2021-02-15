import { Component, RefObject } from 'react';
import { KeyValue } from './key-value';
import './multi-select.scss';

interface IProps {
  className: string;
  items: KeyValue[];
  value: string[];
  placeholder: string;
  expanded?: boolean;
  onUpdate: (selected: string[]) => void;
}

interface IState {
  selected: string[];
  expanded: boolean;
  oldValue: string;
}

type SelectableItem = KeyValue & { checked: boolean };

class MultiSelect extends Component<IProps, IState> {
  fieldset!:RefObject<HTMLFieldSetElement>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selected: [...props.value] || [] as string[],
      expanded: props.expanded || false,
      oldValue: (props.value as string[] || []).join()
    };
  }

  toggle() {
    const state = this.state;
    const newSelected = (state.selected as string[]).join();
    this.setState({ ...state, expanded: !this.state.expanded, oldValue: newSelected });
    if (!this.state.expanded && state.oldValue !== newSelected) {
      this.props.onUpdate(state.selected);
    }
  }

    remove(value: string) {
      const state= this.state;
      this.setState({ ...state, selected: state.selected.filter(key => key !== value) });
    }

    update(event: React.ChangeEvent<HTMLInputElement>) {
      const { value, checked } = event.target;
        
      if (!checked) {
        return this.remove(value);
      }
      
      const state = this.state;
      this.setState({ ...state, selected: this.addUniqueItem(state.selected, value) });
    }

    private addUniqueItem(array:string[], item:string) {
      const set = new Set(array);
      set.add(item);
      return Array.from(set);
    }

    render() {
      const toggle = this.toggle.bind(this);
      const selected = this.state.selected;
      const items: SelectableItem[] = this.props.items.map((item: KeyValue) => ({ ...item, checked: (selected.indexOf(item.key) > -1) }));
      const filteredData = items.filter((i: SelectableItem) => i.checked);

      return (
      <fieldset
        data-expanded={this.state.expanded}
        tabIndex={0}
        ref={this.fieldset}
        onBlur={toggle}
        className={`field multiSelect ${this.props.className}`}
      >
        <ul className="output" onClick={toggle} >
          {filteredData.map(({ key, value }: { key: string, value: string }, index) => (
            <li key={index} className="multiSelect_item tag" data-pressed="true" onClick={this.remove.bind(this, key)}
            >{value}</li >))}

            {!selected.length ? <li className="placeholder">{this.props.placeholder}</li> : ''}
        </ul >
          <ul className="input">{
            items.map(({ key, value, checked }, index) => {
              const id = `type-${key.replace(/\s/g,'-')}`;

              return (
                <li key={index} className="multiSelect_item">
                  <input type="checkbox"
                    value={key}
                    id={id}
                    onChange={this.update.bind(this)}
                    checked={checked}
                    hidden
                  />
                  <label htmlFor={id} className="tag toggleBtn">{ value }</label>
                </li>
              );
            })
          }</ul>
      </fieldset>);
    }
}

export default MultiSelect;