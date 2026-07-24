import { test, expect } from '@playwright/test';

test('inspect dom and styles', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for the page to be fully loaded
  await page.waitForTimeout(3000);

  // Get HTML attributes and classes
  const htmlDetails = await page.evaluate(() => {
    const html = document.documentElement;
    return {
      className: html.className,
      dataTheme: html.getAttribute('data-theme'),
    };
  });
  console.log('HTML details:', htmlDetails);

  // Get computed styles of body
  const bodyStyles = await page.evaluate(() => {
    const body = document.body;
    const style = window.getComputedStyle(body);
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
    };
  });
  console.log('Body styles:', bodyStyles);

  // Get all buttons and their classes/styles
  const buttons = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a.inline-flex, a.bg-primary'));
    return btns.map((btn, index) => {
      const style = window.getComputedStyle(btn);
      return {
        index,
        tagName: btn.tagName,
        text: btn.textContent?.trim(),
        className: btn.className,
        backgroundColor: style.backgroundColor,
        color: style.color,
      };
    });
  });
  console.log('Buttons:', buttons);
});
