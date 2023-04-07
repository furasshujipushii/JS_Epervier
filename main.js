//Global Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const start = document.getElementById("start-btn");
const difficulty = document.getElementById("difficulty");
let isPlaying = false;
//Game setup
const player = {
  width: 3,
  height: 20,
};
let game = {
  player: {
    x: canvas.width / 7 - player.width,
    y: canvas.height / 2 - player.height,
    speed: {
      x: 0,
      y: 0,
    },
  },
  computer: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: {
      x: 1,
      y: 1,
    },
  },
};
function draw() {
  //Carré du canva
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Lignes safes de l'epervier
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 7, 0);
  ctx.lineTo(canvas.width / 7, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 1.2, 0);
  ctx.lineTo(canvas.width / 1.2, canvas.height);
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.fillRect(game.player.x, game.player.y, player.width, player.height);

  ctx.fillStyle = "purple";
  ctx.fillRect(game.computer.x, game.computer.y, player.width, player.height);
}
function playerMove(key) {
  switch (key.key) {
    case "d":
      game.player.speed.x = +1;
      game.player.speed.y = 0;

      break;
    case "z":
      game.player.speed.y = -1;
      game.player.speed.x = 0;

      break;
    case "q":
      game.player.speed.x = -1;
      game.player.speed.y = 0;

      break;
    case "s":
      game.player.speed.y = 1;
      game.player.speed.x = 0;

      break;
  }
}
window.addEventListener("keydown", playerMove);
function playerCollision() {
  game.player.x += game.player.speed.x;
  game.player.y += game.player.speed.y;
  if (game.player.y <= 0 || game.player.y >= canvas.height - player.height) {
    game.player.speed.y = 0;
  } else if (
    game.player.x <= 0 ||
    game.player.x >= canvas.width - player.width
  ) {
    game.player.speed.x = 0;
  }
}
function computerMove() {
  // Rebounds on top and bottom
  if (game.computer.y > canvas.height - player.height || game.computer.y < 0) {
    game.computer.speed.y *= -1;
  }

  if (game.computer.x <= canvas.width / 7) {
    game.computer.speed.x *= -1.001;
  } else if (game.computer.x >= canvas.width / 1.2 - player.width) {
    game.computer.speed.x *= -1;
  }
  game.computer.x += game.computer.speed.x;
  game.computer.y += game.computer.speed.y;
}

let lastDifficulty = difficulty.value;
difficulty.addEventListener("change", () => {
  switch (difficulty.value) {
    case "1":
      game.computer.speed.x = 1;
      game.computer.speed.y = 1;
      game.computer.speed.x *= 1;
      game.computer.speed.y *= 1;
      break;
    case "2":
      game.computer.speed.x = 1.5;
      game.computer.speed.y = 1.5;
      game.computer.speed.x *= 1;
      game.computer.speed.y *= 1;
      break;
    case "3":
      game.computer.speed.x = 2;
      game.computer.speed.y = 2;
      game.computer.speed.x *= 1;
      game.computer.speed.y *= 1;
      break;
    case "4":
      game.computer.speed.x = 2.5;
      game.computer.speed.y = 2.5;
      game.computer.speed.x *= 1;
      game.computer.speed.y *= 1;
      break;
    case "5":
      game.computer.speed.x = 3;
      game.computer.speed.y = 3;
      game.computer.speed.x *= 1;
      game.computer.speed.y *= 1;
      break;
  }
});
function stopPlay() {
  canvas.style.display = "none";
  game.player.x = canvas.width / 7 - player.width;
  game.player.y = canvas.height / 2 - player.height;
  game.player.speed.x *= 0;
  game.player.speed.y *= 0;
  game.computer.x = canvas.width / 2;
  game.computer.y = canvas.height / 2;
  isPlaying = false;
  start.innerText = "Démarrer";
}
function handleCollision() {
  // handleCollision
  if (
    game.player.x < game.computer.x + player.width &&
    game.player.x + player.width > game.computer.x &&
    game.player.y < game.computer.y + player.height &&
    player.height + game.computer.y > game.computer.y
  ) {
    canvas.remove();
    document.getElementById("game-over").innerText = "GAME OVER";
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}
function play() {
  if (isPlaying) {
    draw();
    computerMove();
    playerCollision();
    handleCollision();
    requestAnimationFrame(play);
    start.innerText = "Arrêter";
    canvas.style.display = "block";
  }
}

start.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    play();
  } else if (isPlaying) {
    stopPlay();
  }
});
