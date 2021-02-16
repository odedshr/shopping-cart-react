import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiSelect from './multi-select';

test('renders multi-select with placeholder', async () => {
  const placeholder = 'placeholder';
  const func = (value: string[]) => { expect(value[0]).toBe('bar'); };

  const { container } = render(<MultiSelect className="filters_type"
    items={[{ key: 'foo', value: 'Foo' }, { key: 'bar', value: 'Bar'}]}
    value={[]}
    placeholder={placeholder}
    onUpdate={func}
  />);

  expect(screen.getByText(placeholder)).toBeInTheDocument();
  expect(container.firstChild?.firstChild?.textContent).toBe(placeholder);
  userEvent.click(await screen.findByText(placeholder));
  const firstTag = await screen.findByText('Foo');
  userEvent.click(firstTag);
  expect(container.firstChild?.firstChild?.textContent).toBe('Foo');
  userEvent.click(await screen.findByText('Bar'));
  expect(container.firstChild?.firstChild?.textContent).toBe('FooBar');
  userEvent.click(firstTag);
  expect(container.firstChild?.firstChild?.textContent).toBe('Bar');
}); 

test('renders multi-select with default value', async () => {
  const placeholder = 'placeholder';
  const func = (value: string[]) => { expect(value[0]).toBe('bar'); };

  const items = [{ key: 'foo', value: 'Foo' }, { key: 'bar', value: 'Bar' }];
  const result = render(<MultiSelect className="filters_type"
    items={items}
    value={['bar']}
    placeholder={placeholder}
    onUpdate={func}
  />);

  expect(result.container.firstChild?.firstChild?.textContent).toBe('Bar');
}); 