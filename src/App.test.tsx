import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { chromium, Browser, Response, Page } from 'playwright';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Products for Delivery/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Home Page", () => {
  let response: Response | null;
  let browser: Browser;
  let page:Page;

  beforeAll(async () => {
    // Create a browser instance
    browser = await chromium.launch();
    page = await browser.newPage();
    response = await page.goto('http://localhost:3000/');
  });

  test("The page loads successfully", async () => {
    expect(response ? response.status(): 500).toBe(200);
    expect(await page.title()).toBe('React Shopping-cart demo')
  });

  test("Items are added to cart", async () => {
    expect(await page.$('.cartSummary_count')).toBeFalsy()
    await page.click('.listView_product_addBasket');
    expect(await page.textContent('.cartSummary_count')).toBe('1');
    await page.click('.listView_product_addBasket');
    expect(await page.textContent('.cartSummary_count')).toBe('2');
  });

  afterAll(async () => {
    await browser.close();
  });
});