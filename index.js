import puppeteer from "puppeteer";

async function openWebPage() {
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    await page.goto("https://news.ycombinator.com/")

    await browser.close();
}

openWebPage();