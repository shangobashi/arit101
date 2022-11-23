let xp = 0;
let health = 100;
let level = 1;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [{
  name: "stick",
  power: 5
},
{
  name: "dagger",
  power: 30
},
{
  name: "claw hammer",
  power: 50
},
{
  name: "sword",
  power: 100
},
];

const monsters = [{
  name: "slime",
  level: 2,
  health: 15
},
{
  name: "goblin",
  level: 8,
  health: 60
},
{
  name: "dragon",
  level: 20,
  health: 300
},
];

const locations = [{
  name: "town square",
  "button text": ["Get inside the store", "Go to the cave", "Fight the Dragon"],
  "button functions": [goStore, goCave, fightDragon],
  text: "You're in the town square.\n \nThere is a sign that says \"Store\".\n \nWhat would you like to do?"
},
{
  name: "store",
  "button text": ["Buy 10 health (x10 gold)", "Buy weapon (x30 gold)", "Leave store"],
  "button functions": [buyHealth, buyWeapon, goTown],
  text: "Welcome to the store!\n \nWhat would you like to buy?"
},
{
  name: "cave",
  "button text": ["Destroy the slime", "Slash the Goblin", "Run back to town square"],
  "button functions": [fightSlime, fightGoblin, goTown],
  text: "You enter the cave. It is dark and it is cold.\n \nBut you're not afraid.\n \nYou hear some sounds.\n \nAs you squint your eyes, shady enemies appear in front of you..."
},
{
  name: "fight",
  "button text": ["Attack", "Dodge", "Run away"],
  "button functions": [attack, dodge, goTown],
  text: "You are fighting a monster.\n \nBe strong."
},
{
  name: "dead monster",
  "button text": ["Get Back", "To The", "Town"],
  "button functions": [goTown, goTown, goTown],
  text: "The monster is dead.\n \nYou are victorious.\n \nYou gain new XP points and find some gold."
},
{
  name: "lose",
  "button text": ["Resurrect", "Your", "Ass"],
  "button functions": [restart, restart, restart],
  text: "The monster hits you a fatal blow...\n \nYou are dead.\n \nOr are you?"
},
{
  name: "win",
  "button text": ["BACK", "TO THE", "BEGINNING"],
  "button functions": [restart, restart, bonus],
  text: "As you watch the last monster hit the ground before disappearing into a smoke of dust, it slowly hits you that this was your last enemy...\n \nYou've done it. For real this time.\n \nYou've WON.\n \nCongratulations are in order, since no one could have believed that you would actually achieve such an extraordinary feat.\n \nThey were, obviously, unaware of your incredible hidden talents.\n \nAs you now turn your head to the Future, the Past still sings faintly into your victorious ears...\n \nWill you hear its Chants and follow it Back To The Beginning?"
},
{
  name: "bonus",
  "button text": ["3", "6", "Go to Town"],
  "button functions": [pickThree, pickSix, goTown],
  text: "Bravo! You've found a hidden chamber! \n \n Select a number above. Ten numbers will then be randomly chosen between 0 and 10. \n \n If the number you chose matches one of these random numbers, you've won a bonus prize! \n \n Good luck!"
},

];

// intialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You're too poor!\n \nCome back when you get some money, lazy ass...";
  }

}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++; /* currentWeapon = currentWeapon + 1 */
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You bought a " + weapons[currentWeapon].name + "!";
      inventory.push(newWeapon);
      text.innerText += "\n \nYou now have a " + inventory.join(", and a ") + " in your inventory!";
    } else {
      text.innerText = "You're too poor!\n \nCome back when you get some money, lazy friggin ass...";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold your " + currentWeapon + " for 15 gold!";
    text.innerText += "\n \nHere's what you've now got inside your bag: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon, stupid!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightGoblin() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += "\n \nYou attack it with your " + weapons[currentWeapon].name + ".";

  if (isMonsterHit) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "\n \nYou missed!";
  }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += "\n \n You receive a tremendous hit. Your " + inventory.pop() /* this returns the last item in inventory while removing it from the array at the same time */ + " breaks from the shock!";
    currentWeapon--;
  }

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    /*if (fighting == 2) {
        winGame();
    } else {
        defeatMonster();*/
    fighting === 2 ? winGame() : defeatMonster();
  } else {
    text.innerText += "\n \nThe " + monsters[fighting].name + " has " + monsterHealth + " HP left.";
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}
/* This "returns" True (= a Hit) every time Math.random is above 0,2, which is 80% of the time; giving us an 80% Hit Rate; OR every time the Health of the player drops below 20 */

function dodge() {
  text.innerText = "You dodged the " + monsters[fighting].name + "'s attack.\n \nGood job!";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  level = 1;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function bonus() {
  update(locations[7]);
}

function pickThree() {
  pick(3);
}

function pickSix() {
  pick(6);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". Here are the random numbers: \n";

  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.indexOf(guess) !== 1) {
    text.innerText += "Bravo! You picked the correct number!\n \nYou won 42 extra gold!";
    gold += 42;
    goldText.innerText = gold;
  } else {
    text.innerText += "You didn't pick the correct number.\n \nYou're a loser!\n \nBetter leave this secret chambers for someone with better luck!\n \n And look at your health! You've just lost a bunch of HP!";
    health -= 24;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }

}
