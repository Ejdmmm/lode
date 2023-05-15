const arr = document.getElementsByClassName("pole");
const arr2 = document.getElementsByClassName("pole2");
const counter = document.getElementById("counter"); 
const img = "url(./res/img/lod02.png)"
const img2 = "url(./res/img/negros.png)"
const img3 = "url(./res/img/sunkedshipFinish.png)"
let ships = [];
let enemyShips = [];
let score = 0;
let numShips = 7;
let armed = false; 
let game = false;

for (let index = 0; index < arr2.length; index++) {
  arr2[index].addEventListener("click", () => {
    let pos = index; // pozice
    let check = false;
    if (!game) {
      enemyAttack();
      if (armed == true) {
        for (let i = 0; i < enemyShips.length; i++) {
          if (enemyShips[i] == pos) {
            check = true;
          }
        }
        if (check) {
          arr2[pos].style.backgroundImage = img3;
          score++;
          armed = false;
          if ( // lodicky enemaka
        score==7 
          ) {
            game = true;
            counter.innerHTML = `You win`;
          }
        } else {
          arr2[pos].style.backgroundImage = img2; // netrefi se
          armed = false;
          console.log("negr")
        }
      }
    }
  });
}
for (let index = 0; index < arr.length; index++) { // cyklus podle toho kolik je polí
  arr[index].addEventListener("click", () => { // fce pro umožnění klik do pole
    let pos = index;
    if (numShips > 0 && arr[pos].style.backgroundImage != img) {
      arr[pos].style.backgroundImage =img;
      numShips--;
      ships.push(pos);
      if (numShips == 0) {
        let time = 3;
        const timer = setInterval(() => {
          counter.innerHTML = time;
          time--;
          if (time < 0) {
            clearInterval(timer);
            counter.innerHTML = `Start`;
          }
        }, 1000);
      }
    }
  });
}

for (let index = 0; index < 7; index++) {
  let random = Math.floor(Math.random() * 48); // pocet poli random spawn
  let check = false;
  for (let i = 0; i < enemyShips.length; i++) {
    if (enemyShips[i] == random) {
      index--;
      check = true;
    }
  }
  if (!check) {
    enemyShips.push(random);
  }
  console.log(enemyShips);
}

counter.onclick = () => {
  if (counter.innerHTML == `Start`) {
    startGame();
  }
};
function startGame() {
  counter.innerHTML = `Play!!`;
  let check = true;
  armed = true;
}
function enemyAttack() {
  if (!game) {
    let ran = Math.floor(Math.random() * 48);
    console.log(ran)
    let check = false;
    let boat = 0;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i] == ran) {
        check = true;
        boat = ran;
      }
    }
    if (check) {
      arr[boat].style.backgroundImage = img3;
    } else {
      arr[ran].style.backgroundImage = img2;
    }
  }
  if ( // gg pokud vsechny lode trefene
    arr[ships[0]].style.backgroundImage == img2 &&
    arr[ships[1]].style.backgroundImage == img2 &&
    arr[ships[2]].style.backgroundImage == img2 &&
    arr[ships[3]].style.backgroundImage == img2 &&
    arr[ships[4]].style.backgroundImage == img2 &&
    arr[ships[5]].style.backgroundImage == img2 &&
    arr[ships[6]].style.backgroundImage == img2
    
  ) {
    game = true; // pokud je tru, ukončí se hra
    counter.innerHTML = `Enemy wins`;
  } else {
    armed = true;
  }
}
