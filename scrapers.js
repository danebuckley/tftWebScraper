const puppeteer = require('puppeteer');
const readline = require('readline');
const { EventEmitter } = require('stream');

const itemMap = new Map();
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
var x = new Array(59);


for (var i = 0; i < 59; i++) {
    x[i] = new Array(4);
    x[i][0] = champList[i];
}

createItem("a", "a"); //for testing

//scrapeProduct("https://app.mobalytics.gg/tft/champions/");



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
    console.log(x[0][2]);
    console.log(x[10][2]);
    console.log(x[20][2]);
}



function createItem(itemOne, itemTwo) {
    let tear = 396;
    let bow = 296;
    let glove = 509;
    let vest = 418;
    let cloak = 490;
    let sword = 527;
    let rod = 293;
    let belt = 391;
    let spat = 730;
    let currIt = 0;
    let x = new Array(396,296,509,418,490,527,293,391,730);

    let y = new Array(45);

    for (let j = 0; j < 9; j++) {
        for (let r = j; r < 9; r++) {
            y[currIt] = x[j] + x[r];
            currIt++;
        }
    }
}












// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// let userInput = "";

// rl.question("What champion?\n", function (string) {
//     userInput = string;

//     rl.close();
// });