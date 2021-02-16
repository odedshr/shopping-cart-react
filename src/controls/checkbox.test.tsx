import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './checkbox';

test('renders checkbox', async () => {
  let flag=false;
  let valueTest='';
  const value = 'label';
  const placeholder = 'placeholder';
  const func = (value: string, checked: boolean) => { flag = checked; valueTest = value; };
  render(<Checkbox value={value} checked={false} onUpdate={func}>{placeholder}</Checkbox>);
  const linkElement = screen.getByText(placeholder);
  expect(linkElement).toBeInTheDocument();
  userEvent.click(await screen.findByText(placeholder));
  expect(flag).toBeTruthy();
  expect(valueTest).toBe(value);
}); 
