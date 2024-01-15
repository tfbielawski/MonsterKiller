const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

//Call the health bar func
adjustHealthBars(chosenMaxLife);

//Attack the monster, pass in attack val
function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
    alert("You Won!");
  } 
  else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
    alert("You Lose!");
  }
  else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You're both dead.")
  }
}

function strongAttackHandler(){
    const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert("You Won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert("You Lose!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("You're both dead.");
    }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);