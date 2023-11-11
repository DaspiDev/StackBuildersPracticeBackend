import puppeteer from "puppeteer";

const getData = async () => {
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    await page.goto("https://news.ycombinator.com/")

    const result = await page.evaluate(() => {
        const articlesList = document.querySelectorAll("tr .athing");
        const articlesSubTextList = document.querySelectorAll("td .subtext");
        const fullList = [];
        Object.values(articlesList).forEach((e, idx) => {
            const subText = Object.values(articlesSubTextList)[idx];

            const title = e.querySelector(".title span a").innerText;
            const orderNumber = parseInt(e.querySelector("td .rank").innerText.split('.')[0]);
            const hasComments = Object.values(subText.querySelectorAll("span a")).find((f) => f.innerText.includes('comments'));
            const hasPoints = subText.querySelector("span .score");
            let commentsNumber = 0, points = 0;
            if (hasComments) {
                commentsNumber = parseInt(hasComments.innerText.split(' comments')[0]);
            }
            if (hasPoints) {
                points = parseInt(hasPoints.innerText.split(' points')[0]);
            }
            
            fullList.push({
                title,
                orderNumber,
                commentsNumber,
                points
            })
        })

        return fullList;
    });
    await browser.close();
    
    return result;
}

export default getData;