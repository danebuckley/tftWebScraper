let totalTears = 0; //Count of how many tears user has recorded
let totalRods = 0;
let totalVests = 0;
let totalSwords = 0;
let totalSpats = 0;
let totalBelts = 0;
let totalCloaks = 0;
let totalGloves = 0;
let totalBows = 0;



const itemMap = new Map();
const compMap = new Map();
itemMap.set(1054, 'Deathblade');
itemMap.set(823, 'Giant Slayer');
itemMap.set(945, 'Edge of Night');
itemMap.set(820, 'Hextech Gunblade');
itemMap.set(1017, 'Bloodthirster');
itemMap.set(918, "Zeke's Herald");
itemMap.set(1036, 'Infinity Edge');
itemMap.set(1257, 'InfiniTeam Emblem');
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

const champList = ['aatrox','alistar','annie','ashe','aurelion_sol','belveth','blitzcrank','camille','draven','ekko','ezreal','fiddlesticks','fiora','gangplank','garen','gnar','janna','jax','jhin','jinx','kaisa','kayle','leblanc','lee_sin','leona','lucian','lulu','lux','malphite','miss_fortune','mordekaiser','morgana','nasus','neeko','nilah','nunu','pantheon','poppy','pyke','rammus','rell','renekton','riven','samira','shen','sivir','sona','sylas','syndra','twisted_fate','ultimate_ezreal','urgot','vayne','vex','vi','viego','warwick','wukong','yasuo'];


function startProgram() {
    let userInput = [];
    for (var i = 0; i < totalTears; i++) {
        userInput.push("Tear");
    }
    for (var i = 0; i < totalSwords; i++) {
        userInput.push("Sword");
    }
    for (var i = 0; i < totalBelts; i++) {
        userInput.push("Belt");
    }
    for (var i = 0; i < totalCloaks; i++) {
        userInput.push("Cloak");
    }
    for (var i = 0; i < totalRods; i++) {
        userInput.push("Rod");
    }
    for (var i = 0; i < totalVests; i++) {
        userInput.push("Vest");
    }
    for (var i = 0; i < totalGloves; i++) {
        userInput.push("Glove");
    }
    for (var i = 0; i < totalBows; i++) {
        userInput.push("Bow");
    }
    for (var i = 0; i < totalSpats; i++) {
        userInput.push("Spat");
    }

    let chosenChamps = [];
    let usedChampArray = [];

    fetch("bisList.json")
    .then(response => response.json())
    .then(json => {
        let potentialItems = [];
        let numItems = userInput.length;
        for (let i = 0; i < numItems-1; i++) {
            for (let j = i+1; j < numItems; j++) {
                potentialItems.push(createItem(userInput[i], userInput[j]));
            }
        }

        for(let j = 0; j < champList.length; j++) {
            for (let i = 0; i < potentialItems.length; i++) {
                for (let k = 0; k < 3; k++) {
                    let curItemString = "json." + champList[j] + "[" + k + "]";
                    let curItem = eval(curItemString);
                    if (potentialItems[i] == curItem) {
                        let pushStringTxt = "json." + champList[j];
                        let pushString = eval(pushStringTxt);
                        if (!usedChampArray.includes(champList[j])) {
                            chosenChamps.push([champList[j], pushString]);
                        }
                        usedChampArray.push(champList[j]);
                    }
                }
            }
        }
        //to access a specific champions items, it goes chosenChamps[champNum][1][0/1/2]
        //                                                            itemArray^
        document.getElementById("displayedText").textContent="";
        for (let i = 0; i < chosenChamps.length; i++) {
            let curString = chosenChamps[i][0] + " uses " + chosenChamps[i][1][0] + ", " + chosenChamps[i][1][1] + " and " + chosenChamps[i][1][2] + ".\n";
            document.getElementById("displayedText").textContent+=curString;
        }
    });

}


function createItem(itemOne, itemTwo) {
    return itemMap.get(compMap.get(itemOne) + compMap.get(itemTwo));
}



let startButton = document.getElementById('startButton');

startButton.addEventListener('click', function(){
    startProgram();
})








let tearButton = document.getElementById('tearButton');
let tearButtonMinus = document.getElementById('tearButtonMinus');
let tearElement = document.getElementById('tearNum');

let rodButton = document.getElementById('rodButton');
let rodButtonMinus = document.getElementById('rodButtonMinus');
let rodElement = document.getElementById('rodNum');

let vestButton = document.getElementById('vestButton');
let vestButtonMinus = document.getElementById('vestButtonMinus');
let vestElement = document.getElementById('vestNum');

let swordButton = document.getElementById('swordButton');
let swordButtonMinus = document.getElementById('swordButtonMinus');
let swordElement = document.getElementById('swordNum');

let spatButton = document.getElementById('spatButton');
let spatButtonMinus = document.getElementById('spatButtonMinus');
let spatElement = document.getElementById('spatNum');

let beltButton = document.getElementById('beltButton');
let beltButtonMinus = document.getElementById('beltButtonMinus');
let beltElement = document.getElementById('beltNum');

let cloakButton = document.getElementById('cloakButton');
let cloakButtonMinus = document.getElementById('cloakButtonMinus');
let cloakElement = document.getElementById('cloakNum');

let gloveButton = document.getElementById('gloveButton');
let gloveButtonMinus = document.getElementById('gloveButtonMinus');
let gloveElement = document.getElementById('gloveNum');

let bowButton = document.getElementById('bowButton');
let bowButtonMinus = document.getElementById('bowButtonMinus');
let bowElement = document.getElementById('bowNum');


//This is all the button and counter handling

//Tear
tearButton.addEventListener('click', function(){
    totalTears+=1;
    tearElement.innerHTML = totalTears;
})

tearButtonMinus.addEventListener('click', function(){
    if (totalTears != 0) {
        totalTears-=1;
    }
    tearElement.innerHTML = totalTears;
})

//Rod
rodButton.addEventListener('click', function(){
    totalRods+=1;
    rodElement.innerHTML = totalRods;
})

rodButtonMinus.addEventListener('click', function(){
    if (totalRods != 0) {
        totalRods-=1;
    }
    rodElement.innerHTML = totalRods;
})

//Vest
vestButton.addEventListener('click', function(){
    totalVests+=1;
    vestElement.innerHTML = totalVests;
})

vestButtonMinus.addEventListener('click', function(){
    if (totalVests != 0) {
        totalVests-=1;
    }
    vestElement.innerHTML = totalVests;
})

//Sword
swordButton.addEventListener('click', function(){
    totalSwords+=1;
    swordElement.innerHTML = totalSwords;
})

swordButtonMinus.addEventListener('click', function(){
    if (totalSwords != 0) {
        totalSwords-=1;
    }
    swordElement.innerHTML = totalSwords;
})

//Spat
spatButton.addEventListener('click', function(){
    totalSpats+=1;
    spatElement.innerHTML = totalSpats;
})

spatButtonMinus.addEventListener('click', function(){
    if (totalSpats != 0) {
        totalSpats-=1;
    }
    spatElement.innerHTML = totalSpats;
})

//Belt
beltButton.addEventListener('click', function(){
    totalBelts+=1;
    beltElement.innerHTML = totalBelts;
})

beltButtonMinus.addEventListener('click', function(){
    if (totalBelts != 0) {
        totalBelts-=1;
    }
    beltElement.innerHTML = totalBelts;
})

//Cloak
cloakButton.addEventListener('click', function(){
    totalCloaks+=1;
    cloakElement.innerHTML = totalCloaks;
})

cloakButtonMinus.addEventListener('click', function(){
    if (totalCloaks != 0) {
        totalCloaks-=1;
    }
    cloakElement.innerHTML = totalCloaks;
})

//Glove
gloveButton.addEventListener('click', function(){
    totalGloves+=1;
    gloveElement.innerHTML = totalGloves;
})

gloveButtonMinus.addEventListener('click', function(){
    if (totalGloves != 0) {
        totalGloves-=1;
    }
    gloveElement.innerHTML = totalGloves;
})

//Bow
bowButton.addEventListener('click', function(){
    totalBows+=1;
    bowElement.innerHTML = totalBows;
})

bowButtonMinus.addEventListener('click', function(){
    if (totalBows != 0) {
        totalBows-=1;
    }
    bowElement.innerHTML = totalBows;
})