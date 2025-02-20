let log = new Log(document.querySelector(".log"))

let char = new Sorcerer("Cavalier")

let monster = new LittleMonster()

const gamestage = new Stage(
   char,
   monster,
   document.querySelector("#player1"),
   document.querySelector("#player2"),
   log
)

gamestage.start();
