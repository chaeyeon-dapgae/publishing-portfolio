let canvas;
let ctx;
canvas = document.createElement("canvas"); // document에 canvas태그 넣기
ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 500;
document.body.appendChild(canvas); //body태그에 canvas변수를 붙여주세요.

let bgImage, spaceShipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false;
let score = 0;

// 우주선 좌표 - 계속 바뀌기 때문에 따로 변수 선언
let spaceShipX = canvas.width / 2 - 24; //이미지 너비 높이 값이 48px
let spaceShipY = canvas.height - 48 - 12;

let bulletList = []; //총알들을 저장하는 리스트
let enemyList = [];

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceShipX;
    this.y = spaceShipY;

    this.alive = true; //true면 살아있는 총알

    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };

  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 18) {
        // 총알과, 적군 사라짐
        this.alive = false; //죽은 총알
        enemyList.splice(i, 1);
        score ++;
      }
    }
  };
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 45);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 1; //enemy 속도 조절

    if (this.y >= canvas.height - 45) {
      gameOver = true;
    }
  };
}

function loadImage() {
  bgImage = new Image();
  bgImage.src = "img/background.jpg";

  spaceShipImage = new Image();
  spaceShipImage.src = "img/space-ship.png";

  bulletImage = new Image();
  bulletImage.src = "img/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "img/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "img/game-over.png";
}

let keysDown = [];
function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysDown[e.key] = true;
  });
  document.addEventListener("keyup", function (e) {
    delete keysDown[e.key];

    if (e.key == " ") {
      createBullet();
    }
  });
}

function createBullet() {
  let b = new Bullet(); //Bullet이라는 함수를 새로 생성
  b.init();
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 3000);
}

function update() {
  if ("ArrowRight" in keysDown) {
    spaceShipX += 2; //우주선의 속도
  } else if ("ArrowLeft" in keysDown) {
    spaceShipX -= 2;
  }
  //우주선이 경계선 밖으로 나가지 않게 하려면?
  if (spaceShipX <= 0) {
    spaceShipX = 0;
  }
  if (spaceShipX >= canvas.width - 48) {
    spaceShipX = canvas.width - 48;
  }

  //총알의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if(bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit()
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceShipImage, spaceShipX, spaceShipY);

  ctx.fillText(`Score: ${score}`, 20, 30);
  ctx.fillStyle = "white";
  ctx.font = "14px Arial"
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x + 16, bulletList[i].y);
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y, 45, 45);
  }
}

function main() {
  if (!gameOver) {
    update(); //좌표값을 업데이트하고
    render(); //그려주기
    requestAnimationFrame(main); // main 함수를 계속 실행
  } else {
    ctx.drawImage(gameOverImage, canvas.width - 225, 150, 150, 150);
  }
}
loadImage();
setupKeyboardListener();
createEnemy();
main();

//총알만들기
//1. 스페이스바를 누르면 총알 ㅂ라사
//2. 총알이 발사 = 총알의 y값이 감소(--), 총알의 x값은..?
//2 - 1. 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장
//4. 모든 총알들은 x,y좌표값이 있어야 한다
//5. 총알 배열을 가지고 render

//적군만들기
//적군은 위치가 랜덤하다
//적군은 밑으로 내려온다
//1초마다 하나씩 내려온다
//적군이 바닥에 닿으면 게임 오버
//적군과 총알이 만나면 우주선이 사라진다, score +1
