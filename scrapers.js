const puppeteer = require('puppeteer');
const readline = require('readline')

const itemMap = new Map();

itemMap.set('Deathblade', "Sword Sword");
itemMap.set('Giant Slayer', "Sword Bow");
itemMap.set('Edge of Night', "Sword Vest");
itemMap.set('Hextech Gunblade', "Sword Rod");
itemMap.set('Bloodthirster', "Sword Cloak");
itemMap.set("Zeke's Herald", "Sword Belt");
itemMap.set('Infinity Edge', "Sword Glove");
itemMap.set('LaserCorps Emblem', "Spatula Sword");
itemMap.set('Rapid Firecannon', "Bow Bow");
itemMap.set("Titan's Resolve", "Bow Vest");
itemMap.set("Guinsoo's Rageblade", "Bow Rod");
itemMap.set("Runaan's Hurricane", "Bow Cloak");
itemMap.set('Statikk Shiv', "Bow Tear");
itemMap.set("Zz'Rot Portal", "Bow Belt");
itemMap.set('Last Whisper', "Bow Glove");
itemMap.set('Duelist Emblem', "Bow Spatula");
itemMap.set('Bramble Vest', "Vest Vest");
itemMap.set('Locket of the Iron Solari', "Vest Rod");
itemMap.set("Rabadon's Deathcap", "Rod Rod");
itemMap.set('Gargoyle Stoneplate', "Vest Cloak");
itemMap.set("Protector's Vow", "Vest Tear");
itemMap.set('Sunfire Cape', "Vest Belt");
itemMap.set('Shroud of Stillness', "Vest Glove");
itemMap.set('Ox Force Emblem', "Vest Spatula");
itemMap.set('Ionic Spark', "Rod Cloak");
itemMap.set("Dragon's Claw", "Cloak Cloak");
itemMap.set('Chalice of Power', "Cloak Tear");
itemMap.set('Zephyr', "Cloak Belt");
itemMap.set('Quicksilver', "Cloak Glove");
itemMap.set('A.D.M.I.N. Emblem', "Cloak Spatula");
itemMap.set('Spear of Shojin', "Sword Tear");
itemMap.set("Archangel's Staff", "Rod Tear");
itemMap.set('Redemption', "Tear Belt");
itemMap.set('Blue Buff', "Tear Tear");
itemMap.set('Hand of Justice', "Tear Glove");
itemMap.set('Heart Emblem', "Tear Spatula");
itemMap.set('Morellonomicon', "Rod Belt");
itemMap.set("Warmog's Armor", "Belt Belt");
itemMap.set('Guardbreaker', "Belt Glove");
itemMap.set('Mascot Emblem', "Belt Spatula");
itemMap.set('Jeweled Gauntlet', "Rod Glove");
itemMap.set("Theif's Gloves", "Glove Glove");
itemMap.set('Renegade Emblem', "Glove Spatula");
itemMap.set('Anima Squad Emblem', "Rod Spatula");

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

    let componentsOne = itemMap.get(itemOneTxt);
    let componentsTwo = itemMap.get(itemTwoTxt);
    let componentsThree = itemMap.get(itemThreeTxt);

    const arrayOne = componentsOne.split(" ");
    const arrayTwo = componentsTwo.split(" ");
    const arrayThree = componentsThree.split(" ");
    
    console.log(arrayOne[0], arrayOne[1]);
    console.log(arrayTwo[0], arrayTwo[1]);
    console.log(arrayThree[0], arrayThree[1]);

    

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





