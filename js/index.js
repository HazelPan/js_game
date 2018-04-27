   
class BaseCharacter{
  constructor(name, hp, ap){
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }

  attack(character, damage){

    if(this.alive == false){
      return;
    }
    character.getHurt(damage);
  }

  getHurt(damage){
    this.hp -= damage;
    if (this.hp <= 0){
       this.die();
    }
   }

  die() {
    this.alive = false;
  }

  updateHtml(hpElement, hurtElement) {
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }

}


class Hero extends BaseCharacter{
  constructor(name, hp, ap){
    super(name, hp, ap);
    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;


    console.log(this.name + "英雄誕生啦！The Hero is created!")
  }

  attack(character){
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }

  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }

  

}


class Monster extends BaseCharacter{
  constructor(name, hp, ap){
    super(name, hp, ap);

    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log(this.name + "怪獸來啦！The Monster is coming!")
  }

  attack(character, damage){
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }

  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
  
}

var rounds = 10;
var hero = new Hero("Alana",130 ,30)
var monster = new Monster("LALA",130 ,10)


function endTurn(){
  rounds --;
  document.getElementById("round-num").textContent = rounds ;
  if (rounds < 1){
    /* write down the funtion of the ending the game*/
  }
 }


function heroAttack() {
    document.getElementsByClassName("skill-block")[0].style.display = "none";

    setTimeout(function() {
      hero.element.classList.add("attacking");
      setTimeout(function() {
        hero.attack(monster);
        hero.element.classList.remove("attacking");
      }, 500);
    }, 100);

    setTimeout(function() {
      if (monster.alive) {
        monster.element.classList.add("attacking");
        setTimeout(function() {
          monster.attack(hero);
          monster.element.classList.remove("attacking");
          endTurn();
          if (hero.alive == false) {} else {
            document.getElementsByClassName("skill-block")[0].style.display = "block";
          }
        }, 500);
        } else {
        // 「遊戲結束」空白區
        }
      }, 1100);
    
}

 
function addSkillEvent(){
  var skill = getElementById("skill");
  skill.onclick = function(){
    heroAttack();
  }
}


addSkillEvent();


 

                



