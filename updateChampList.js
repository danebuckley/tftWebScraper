import { writeFile } from 'fs';
import { appendFile } from 'fs';
import { launch } from 'puppeteer';
let champArray = [];

async function scrapeChampList(url) {
    const champCount = 59;
    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(url);
    writeFile('champList.txt', "[", err=> {
        if (err) {
            console.err;
            return;
        }
    }
    )
    for (let i = 0; i < champCount; i++) {
        let curNum = i+1;
        let [curChamp] = await page.$x('//*[@id="root"]/div/section/div[5]/div[2]/div[4]/a[' + curNum + ']/p');
        let curProp = await curChamp.getProperty('textContent');
        let champText = await curProp.jsonValue();
        champText = champText.replace(' ', '_');
        champText = champText.toLowerCase();
        if (i != 58) {
            appendFile('champList.txt', "'" + champText+"',", err => {
                if (err) {
                    console.err;
                    return;
                }
            })
        } else {
            appendFile('champList.txt', "'" + champText + "'" + "];", err => {
                if (err) {
                    console.err;
                    return;
                }
            })
        }

    }

    //const jsonContent = JSON.stringify(champArray);


    browser.close();
}

scrapeChampList("https://tftactics.gg/champions");