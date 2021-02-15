import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { chromium, Browser, Response } from 'playwright';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Home Page", () => {
  let response: Response | null;
  let browser: Browser;
  let page;

  beforeAll(async () => {
    // Create a browser instance
    browser = await chromium.launch();
    page = await browser.newPage();
    response = await page.goto('http://localhost:3000/');
  });

  test("The page loads successfully", async () => {
    // Get the HTTP status code of the response. A 200 means it loaded successfully!
    expect(response ? response.status(): 500).toBe(200)
  });

  afterAll(async () => {
    await browser.close();
  });
});