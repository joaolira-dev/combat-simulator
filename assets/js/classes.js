// Knight ou Sorcerer
// LittleMonster ou BigMonster

class Character {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 15;
    this.defense = 3;
    this.maxLife = this.life;
  }
}

class LittleMonster extends Character {
  constructor() {
    super("Little Monster");
    this.life = 40;
    this.maxLife = this.life;
    this.attack = 4;
    this.defense = 4;
  }
}

class BigMonster extends Character {
  constructor() {
    super("Big Monster");
    this.life = 120;
    this.maxLife = this.life;
    this.attack = 16;
    this.defense = 6;
  }
}

class Stage {
  constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.log = logObject;

    const newBattle = document.querySelector(".newBattle");
    newBattle.addEventListener("click", () => {
      this.reset();
      this.start();
    });
  }

  start() {
    this.update();

    document.querySelector(".startBattle").addEventListener("click", () => {
      setInterval(() => {
        if (Math.random() < 0.5) {
          if (this.fighter1.life > 0 && this.fighter2.life > 0) {
            this.doAttack(this.fighter1, this.fighter2);
          }
        } else {
          if (this.fighter2.life > 0 && this.fighter1.life > 0) {
            this.doAttack(this.fighter2, this.fighter1);
          }
        }
      }, 1000);
    });
  }

  reset() {
    // Restaura a vida dos lutadores
    this.fighter1.life = this.fighter1.maxLife;
    this.fighter2.life = this.fighter2.maxLife;
    this.update();
  
    // Limpa o log
    this.log.list = [];
    this.log.render();
  }


  update() {
    // Fighter 1
    this.fighter1El.querySelector(".name").innerHTML = `${this.fighter1.name} `;
    this.fighter1El.querySelector(
      ".life"
    ).innerHTML = `${this.fighter1.life.toFixed(2)} HP`;
    let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
    this.fighter1El.querySelector(".lifebar .bar").style.width = `${f1Pct}%`;

    // Fighter 2
    this.fighter2El.querySelector(".name").innerHTML = `${this.fighter2.name} `;
    this.fighter2El.querySelector(
      ".life"
    ).innerHTML = `${this.fighter2.life.toFixed(2)} HP`;
    let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
    this.fighter2El.querySelector(".lifebar .bar").style.width = `${f2Pct}%`;
  }

  doAttack(attacker, defender) {
    if (attacker.life <= 0) {
      this.log.addMessage("Voce morreu");
      return;
    } else if (defender.life <= 0) {
      this.log.addMessage("Monstro já está morto");
      return;
    }

    let attackFactor = (Math.random() * 2).toFixed(2);

    let actualAttack = attacker.attack * attackFactor;

    let defenseFactor = (Math.random() * 2).toFixed(2);
    let actualDefense = defender.defense * defenseFactor;

    if (actualAttack > actualDefense) {
      defender.life -= actualAttack;
      this.log.addMessage(
        `${attacker.name} causou ${actualAttack} de dano em ${defender.name}`
      );
    } else {
      this.log.addMessage(`${defender.name} defendeu o ataque`);
    }

    this.update();
  }
}

class Log {
  list = [];

  constructor(listEl) {
    this.listEl = listEl;
  }

  addMessage(msg) {
    this.list.push(msg);
    this.render();
  }

  render() {
    this.listEl.innerHTML = "";

    for (let i in this.list)
      [(this.listEl.innerHTML += `<li>${this.list[i]}</li>`)];
  }
}
