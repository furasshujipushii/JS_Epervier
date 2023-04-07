//Global Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const start = document.getElementById("start-btn");
let isPlaying = false;

//Game setup
const player = {
  width: 3,
  height: 20,
};
const game = {
  player: {
    x: canvas.width / 7 - player.width,
    y: canvas.height / 2 - player.height,
    speed: {
      x: 0,
      y: 0,
    },
  },
  computer: {
    x: canvas.width / 2 - player.width,
    y: canvas.height / 2 - player.height,
    speed: {
      x: 1.5,
      y: 1.5,
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
  if (game.computer.y > canvas.height - player.height || game.computer.y < 0) {
    game.computer.speed.y *= -1;
  }
  game.computer.y += game.computer.speed.y;
}
function play() {
  if (isPlaying) {
    draw();
    computerMove();
    playerCollision();
    requestAnimationFrame(play);
  }
}
start.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    start.innerText = "Arrêter";
    play();
  } else if (isPlaying) {
    isPlaying = false;
    start.innerText = "Démarrer";
  }
});
