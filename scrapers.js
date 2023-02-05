const puppeteer = require('puppeteer');
const readline = require('readline')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [iOne] = await page.$x('//*[@id="container"]/div/main/div/div/div[2]/div[1]/div[4]/div/div/div[1]/div[2]/p');
    const itemOne = await iOne.getProperty('textContent');
    const itemOneTxt = await itemOne.jsonValue();

    const [iTwo] = await page.$x('//*[@id="container"]/div/main/div/div/div[2]/div[1]/div[4]/div/div/div[2]/div[2]/p');
    const itemTwo = await iTwo.getProperty('textContent');
    const itemTwoTxt = await itemTwo.jsonValue();

    const [iThree] = await page.$x('//*[@id="container"]/div/main/div/div/div[2]/div[1]/div[4]/div/div/div[3]/div[2]/p');
    const itemThree = await iThree.getProperty('textContent');
    const itemThreeTxt = await itemThree.jsonValue();

    console.log({itemOneTxt, itemTwoTxt, itemThreeTxt});
    browser.close();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let userInput = "";

rl.question("What champion?\n", function (string) {
    userInput = string;
    scrapeProduct("https://app.mobalytics.gg/tft/champions/" + userInput);
    rl.close();
});




