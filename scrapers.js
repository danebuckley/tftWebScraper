const puppeteer = require('puppeteer');
const readline = require('readline');
const { start } = require('repl');
const { EventEmitter } = require('stream');

const itemMap = new Map();
const compMap = new Map();
const champList = new Array("Alistar", "Annie", "Aphelios", "Ashe", "aurelionsol", "Belveth", "Blitzcrank", "Camille", "Chogath", "Draven", "Ekko", "Ezreal", "Fiddlesticks", "Fiora", "Galio", "Gangplank", "Janna", "Jax", "Jinx", "Kaisa", "Kayle", "Leblanc", "Leesin", "Leona", "lulu", "lux", "malphite", "missfortune", "mordekaiser", "nasus", "nilah", "nunu", "poppy", "rammus", "rell", "renekton", "riven", "samira", "sejuani", "senna", "sett", "sivir", "sona", "soraka", "sylas", "syndra", "taliyah", "talon", "urgot", "vayne", "velkoz", "vi", "viego", "wukong", "yasuo", "yuumi", "zac", "zed", "zoe");
itemMap.set(1054, 'Deathblade');
itemMap.set(823, 'Giant Slayer');
itemMap.set(945, 'Edge of Night');
itemMap.set(820, 'Hextech Gunblade');
itemMap.set(1017, 'Bloodthirster');
itemMap.set(918, "Zeke's Herald");
itemMap.set(1036, 'Infinity Edge');
itemMap.set(1257, 'LaserCorps Emblem');
itemMap.set(592, 'Rapid Firecannon');
itemMap.set(714, "Titan's Resolve");
itemMap.set(589, "Guinsoo's Rageblade");
itemMap.set(786, "Runaan's Hurricane");
itemMap.set(692, 'Statikk Shiv');
itemMap.set(687, "Zz'Rot Portal");
itemMap.set(805, 'Last Whisper');
itemMap.set(1026, 'Duelist Emblem');
itemMap.set(836, 'Bramble Vest');
itemMap.set(711, 'Locket of the Iron Solari');
itemMap.set(586, "Rabadon's Deathcap");
itemMap.set(908, 'Gargoyle Stoneplate');
itemMap.set(814, "Protector's Vow");
itemMap.set(809, 'Sunfire Cape');
itemMap.set(927, 'Shroud of Stillness');
itemMap.set(1148, 'Ox Force Emblem');
itemMap.set(783, 'Ionic Spark');
itemMap.set(980, "Dragon's Claw");
itemMap.set(886, 'Chalice of Power');
itemMap.set(881, 'Zephyr');
itemMap.set(999, 'Quicksilver');
itemMap.set(1220, 'A.D.M.I.N. Emblem');
itemMap.set(923, 'Spear of Shojin');
itemMap.set(689, "Archangel's Staff");
itemMap.set(787, 'Redemption');
itemMap.set(792, 'Blue Buff');
itemMap.set(905, 'Hand of Justice');
itemMap.set(1126, 'Heart Emblem');
itemMap.set(684, 'Morellonomicon');
itemMap.set(782, "Warmog's Armor");
itemMap.set(900, 'Guardbreaker');
itemMap.set(1121, 'Mascot Emblem');
itemMap.set(802, 'Jeweled Gauntlet');
itemMap.set(1018, "Theif's Gloves");
itemMap.set(1239, 'Renegade Emblem');
itemMap.set(1023, 'Anima Squad Emblem');

compMap.set("Tear", 396);
compMap.set("Bow", 296);
compMap.set("Glove", 509);
compMap.set("Vest", 418);
compMap.set("Cloak", 490);
compMap.set("Sword", 527);
compMap.set("Rod", 293);
compMap.set("Belt", 391);
compMap.set("Spatula", 730);


var x = new Array(59);
let userInput = []; //global, probably shouldn't be....


for (var i = 0; i < 59; i++) {
    x[i] = new Array(4);
    x[i][0] = champList[i];
}
scrapeProduct("https://app.mobalytics.gg/tft/champions/");
//startProgram();




async function scrapeProduct(url) { //rewrite this with multithreading, its really slow right now. maybe that will help.
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 0; i < 58; i++) {
        await page.goto(url + champList[i]);
        const [iOne] = await page.$x('//*[@id="container"]/div/main/div/div/div[2]/div[1]/div[4]/div/div/div[1]/div[2]/p');
        const itemOne = await iOne.getProperty('textContent');
        const itemOneTxt = await itemOne.jsonValue();

        const [iTwo] = await page.$x('//*[@id="container"]/div/main/div/div/div[2]/div[1]/div[4]/div/div/div[2]/div[2]/p');
        const itemTwo = await iTwo.getProperty('textContent');
        const itemTwoTxt = await itemTwo.jsonValue();

        const [iThree] = await page.$x('//*[@id="container"]/div/main/div/div/div[2]/div[1]/div[4]/div/div/div[3]/div[2]/p');
        const itemThree = await iThree.getProperty('textContent');
        const itemThreeTxt = await itemThree.jsonValue();

        
        x[i][1] = itemOneTxt;
        x[i][2] = itemTwoTxt;
        x[i][3] = itemThreeTxt;
    }

    // let componentsOne = itemMap.get(itemOneTxt);     THIS IS WHERE WE SEPERATE COMPONENTS
    // let componentsTwo = itemMap.get(itemTwoTxt);
    // let componentsThree = itemMap.get(itemThreeTxt);

    // const arrayOne = componentsOne.split(" ");
    // const arrayTwo = componentsTwo.split(" ");
    // const arrayThree = componentsThree.split(" ");
    
    // console.log(arrayOne[0], arrayOne[1]);
    // console.log(arrayTwo[0], arrayTwo[1]);
    // console.log(arrayThree[0], arrayThree[1]);


    browser.close();
    startProgram();
}


function startProgram() { //this is where the fun begins
    userInput = ["Tear", "Glove", "Sword"];
    finalArray = [];
    for (let x = 0; x < userInput.length; x++) {
        for (let y = x; y < userInput.length; y++) {
            finalArray.push(createItem(userInput[x], userInput[y]));
        }
    }

    let champCounter = 0;


    for (let curItem = 0; curItem < finalArray.length; curItem++) {
        for (let r = 0; r < 59; r++) {
            if (finalArray[curItem] == x[r][1]) {
                console.log(x[r][0] + " " + finalArray[curItem]);
            } else if (finalArray[curItem] == x[r][2]) {
                console.log(x[r][0] + " " + finalArray[curItem]);
            } else if (finalArray[curItem] == x[r][3]) {
                console.log(x[r][0] + " " + finalArray[curItem]);
            }
        }
    }

}



function createItem(itemOne, itemTwo) {
    return itemMap.get(compMap.get(itemOne) + compMap.get(itemTwo));
}


function getCompenent(userInput) {

}

// function addToList() { 
//     let list = []; 
//     let input = ''; 
//     while (input !== 'quit') { 
//         input = prompt('Enter an item (or type "quit" to exit):'); 
//         if (input !== 'quit') { 
//             list.push(input); 
//         } 
//     } return list; 
// }












