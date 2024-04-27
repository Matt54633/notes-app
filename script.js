const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://notes.matt54633.com/');
  await page.waitForSelector('#login-button'); 
  await page.click('#login-button');
  await browser.close();
})();