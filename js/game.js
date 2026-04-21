const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let player = new Player(canvas.width / 2, canvas.height - 100);
let platforms = [];
let monsters = [];
let score = 0;

const scoreEl = document.getElementById("score");
const leaderboardEl = document.getElementById("leaderboard");

for (let i = 0; i < 6; i++) {
  platforms.push(new Platform(Math.random() * canvas.width, i * 100));
}

function spawnMonster() {
  monsters.push(new Monster(Math.random() * canvas.width, -50));
}

function update() {
  player.update();

  if (keys["ArrowLeft"]) player.vx = -CONFIG.speed;
  else if (keys["ArrowRight"]) player.vx = CONFIG.speed;
  else player.vx = 0;

  platforms.forEach(p => {
    if (player.vy > 0 && collide(player, p)) {
      player.jump();
    }
  });

  monsters.forEach(m => {
    m.update();
    if (collide(player, m)) {
      playSound("assets/sounds/hit.wav");
      saveScore(score);
      alert("Game Over");
      location.reload();
    }
  });

  if (player.y < canvas.height / 2) {
    let diff = canvas.height / 2 - player.y;
    player.y += diff;
    platforms.forEach(p => p.y += diff);
    monsters.forEach(m => m.y += diff);
    score += Math.floor(diff);
    scoreEl.textContent = score;
    if (score % 500 === 0) playSound("assets/sounds/score.wav");
  }

  if (Math.random() < CONFIG.spawnRate) spawnMonster();
  platforms = platforms.filter(p => p.y < canvas.height);
}

function draw() {
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  platforms.forEach(p => p.draw());
  monsters.forEach(m => m.draw());
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

let keys = {};
addEventListener("keydown", e => keys[e.key] = true);
addEventListener("keyup", e => keys[e.key] = false);

loop();

// Firebase Leaderboard
function saveScore(score) {
  db.collection("scores").add({
    name: "Player",
    score: score,
    timestamp: Date.now()
  });
  loadLeaderboard();
}

function loadLeaderboard() {
  db.collection("scores").orderBy("score", "desc").limit(5).get()
    .then(snapshot => {
      leaderboardEl.innerHTML = "<b>Leaderboard</b><br>";
      snapshot.forEach(doc => {
        const data = doc.data();
        leaderboardEl.innerHTML += `${data.name}: ${data.score}<br>`;
      });
    });
}
