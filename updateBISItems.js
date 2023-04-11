import { writeFile } from 'fs';
import { readFile } from 'fs';
import { appendFile } from 'fs';
import { launch } from 'puppeteer';

async function scrapeBIS(url) {
    const champCount = 59;
    let champList = "";

    const browser = await launch();
    const page = await browser.newPage();



    let champDict = {}

    readFile('champList.txt', 'utf-8', async (err, data) => {
        if (err) throw err;
        champList = data;
        let champArray = champList.split("\n");
        for (const element of champArray) {
            await page.goto(url + element);
            let itemOneTxt = await page.$eval("#root > div > section > div.row > div.col-12.col-lg-3.sidebar > div.character-items > div.items-list > a:nth-child(1) > div > img", element => element.getAttribute("alt"));
            let itemTwoTxt = await page.$eval("#root > div > section > div.row > div.col-12.col-lg-3.sidebar > div.character-items > div.items-list > a:nth-child(2) > div > img", element => element.getAttribute("alt"));
            let itemThreeTxt = await page.$eval("#root > div > section > div.row > div.col-12.col-lg-3.sidebar > div.character-items > div.items-list > a:nth-child(3) > div > img", element => element.getAttribute("alt"));
            champDict[element] = [itemOneTxt, itemTwoTxt, itemThreeTxt];
        }
        console.log(champDict);
    })
    

}

scrapeBIS("https://tftactics.gg/champions/");