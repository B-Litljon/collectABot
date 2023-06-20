const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch Puppeteer and create a new browser instance
    const browser = await puppeteer.launch();

    // Create a new page in the browser
    const page = await browser.newPage();

    // Set the viewport size (optional)
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to a website
    await page.goto('https://www.google.com');  // create url variable that captures user input and searches that page specifically

    // Perform actions on the page
    //await page.waitForSelector('h1');
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);

    // Take a screenshot (optional)
    await page.screenshot({ path: 'screenshot.png' });

    // Extract information from the page (optional)
    const textContent = await page.$eval('h1', (element) => element.textContent);
    console.log('Heading text:', textContent);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
