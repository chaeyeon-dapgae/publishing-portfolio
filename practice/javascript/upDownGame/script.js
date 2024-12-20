// 숫자 맞추기 게임 만들기 순서
// 1. 랜덤한 숫자 컴퓨터가 정하기
// 2. 사용자가 숫자를 입력하고 Go버튼 누르기
// 3. 랜덤숫자와 사용자 숫자 비교
// 4. 비교 후 up / down / win
// 5. 비교 할 때마다 남은기회 -1
// 6. reset을 누르면 초기화(다시시작)

let randomNum = 0;
let userNum = document.getElementById("userNum");
let goBtn = document.querySelector("#go");
let gameResult = document.querySelector("#upDownResult");
let base = 3;
let chances = document.querySelector("#chances");
let resetBtn = document.querySelector("#resetBtn");
let userHistory = [];
let answer = document.getElementById("answer");

goBtn.addEventListener("click", upDown);
resetBtn.addEventListener("click", reset);
userNum.addEventListener("focus", function () {
  userNum.value = "";
});


function pickNum () {
  randomNum = Math.floor(Math.random() * 100) + 1;
  answer.textContent = "정답 : " + randomNum
}

pickNum ()

function upDown () {
  
  let userValue = userNum.value;
  
  if (userValue < 1 || userValue > 100) {
    gameResult.textContent = "1~100 사이의 숫자를 입력하세요";
    return;
  }
  
  if (userHistory.includes(userValue)) {
    gameResult.textContent = "이미 입력한 숫자입니다! 다른 숫자를 입력하세요!";
    return;
  }
  userHistory.push(userValue);
  
  base --

  // userValue 변수가 전역변수로 있으면 밑에 코딩 실행 안됨
  if (base < 1) {
    gameResult.textContent = "You Lose..";
    goBtn.disabled = true;
    resetBtn.style.color = "red";
  } else if(userValue < randomNum && userValue > 0) {
    gameResult.textContent = "Up!!";
  } else if (randomNum < userValue && userValue < 101) {
    gameResult.textContent = "Down!!";
  } 
  
  if (randomNum == userValue){
    gameResult.textContent = "You Win!!!";
    goBtn.disabled = true;
    return;
  }

  chances.textContent = "Life : " + base;

}

function reset () {
  //userValue = ""; /* input태그가 초기화 되지 않고 유저가 입력한 숫자가 그대로 있음 */ userValue는 전역변수가 아니어서 그런 듯?
  userNum.value = "";
  goBtn.disabled = false;
  base = 3;
  chances.textContent = "Life : " + base;
  gameResult.textContent = "Up? Down?";
  pickNum()
  userHistory = [];
  resetBtn.style.color = "gray";
}