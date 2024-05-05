const puppeteer = require("puppeteer");
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://notes.matt54633.com/");
  
  await page.waitForSelector("#email-input");
  await page.type("#email-input", process.env.USERNAME);

  await page.waitForSelector("#password-input");
  await page.type("#password-input", process.env.PASSWORD);

  await page.waitForSelector("#login-button");
  await page.click("#login-button");

  await page.waitForSelector("#settings-icon");
  await page.click("#settings-icon");

  await page.waitForSelector("#logout-button");
  await page.click("#logout-button");

  await browser.close();
})();