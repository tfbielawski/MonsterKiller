const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Enter Max life for you and monster", "100");

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  alert("You entered an invalid number. Starting values have been set to 100");
  chosenMaxLife = 100;
} 
else {
  alert(`You chose ${enteredValue} as your starting values`);
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
  let logEntry ={
    event: ev,
    value: val,
    inalMonsterHealh: monsterHealth,
    finalPlayerHealth: playerHealth
  };

  switch(ev){
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break; 
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: "MONSTER",
        finalMonsterHealh: monsterHealth,
        finalPlayerHealth: playerHealth
      }
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: "PLAYER",
        finalMonsterHealh: monsterHealth,
        finalPlayerHealth: playerHealth
      }
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: ev,
        value: val,
        target: "PLAYER",
        finalMonsterHealh: monsterHealth,
        finalPlayerHealth: playerHealth
      }
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        finalMonsterHealh: monsterHealth,
        finalPlayerHealth: playerHealth
      }
      break;
    default:
      logEntry = {};
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const intialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK, 
    playerDamage, 
    currentMonsterHealth, 
    currentPlayerHealth
    );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = intialPlayerHealth;
    setPlayerHealth(intialPlayerHealth);
    alert("Bonus life saved you!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You Won!");
    writeToLog(
      LOG_EVENT_GAME_OVER, 
      "PLAYER WON", 
      currentMonsterHealth, 
      currentPlayerHealth
      );
  } 
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You Lose!");
    writeToLog(
      LOG_EVENT_GAME_OVER, 
      "MONSTER WON", 
      currentMonsterHealth, 
      currentPlayerHealth
      );
  } 
  else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You're both dead.");
    writeToLog(
      LOG_EVENT_GAME_OVER, 
      "THE MATCH WAS A DRAW", 
      currentMonsterHealth, 
      currentPlayerHealth
      );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;


  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent, 
    damage, 
    currentMonsterHealth, 
    currentPlayerHealth
    );
  endRound();
}

//Attack the monster, pass in attack val
function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than max health!");
    //Find out how much it will take to heal, assign that to healValue
    healValue = chosenMaxLife - currentPlayerHealth;
  } 
  else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL, 
    "healValue", 
    currentMonsterHealth, 
    currentPlayerHealth
    );
  endRound();
}

function printLogHandler(){
  //for
  for (let i = 0; i < battleLog.length; i++){
    console.log("--------")
  }

  let j = 0;
  while (j < 3){
    console.log("j" + " whieeeellle");
    j++;
  }
  //for of: used in arrays
  // for (const i of battleLog){
  //   console.log("Shhhh")
  // }
  let i = 0;
  // for in: used in objects
  for (const i of battleLog){
    console.log(`#${i}`);
    for (const key in i){
      console.log(key);
      //use [] to access the value on the obj's key
      console.log(i[key]);
    }
    i++;
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
