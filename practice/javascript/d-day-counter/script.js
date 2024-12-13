const messageContainer = document.querySelector(".remaining-time");

let intervalIdArr = [];

const dateFormMaker = function () {
  const inputYear = document.querySelector('#target-year-input').value;
  const inputMonth = document.querySelector('#target-month-input').value;
  const inputDate = document.querySelector('#target-date-input').value;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
}

const counterMaker = function () {
  const targetDateInput = dateFormMaker();
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0); //오전 9시가 기준이기 때문에 .setHours함수로 자정을 기준으로 하기
  const remaining = Math.floor((targetDate - nowDate) / 1000);
  const remainingObj = {
    remainingDate: Math.floor(remaining / (60*60) / 24), // 한 시간 당 3600s 
    remainingHours : Math.floor(remaining / (60*60) % 24),
    remainingMin : Math.floor(remaining / 60 % 60),
    remainingSec : Math.floor(remaining % 60),
  }

  if (remaining <= 0) {
    messageContainer.innerHTML = "<h3>타이머가 종료 되었습니다.</h3>"
    return;
  } else if (isNaN(remaining)) {
    messageContainer.innerHTML = "<h3>날짜를 다시 입력해주세요</h3>"
    return;
  } else {
    messageContainer.innerHTML = `
        <div class="remaining-days">
          <span id="days">0</span>
          <span>일</span>
        </div>
        <div class="remaining-hours">
          <span id="hours">0</span>
          <span>시간</span>
        </div>
        <div class="remaining-min">
          <span id="min">0</span>
          <span>분</span>
        </div>
        <div class="remaining-sec">
          <span id="sec">0</span>
          <span>초</span>
        </div>
      `
    }

  const documentArr = ['days', 'hours', 'min', 'sec']
  const timeKeys = Object.keys(remainingObj);

  let i = 0;
  for (let tag of documentArr) {
    document.getElementById(tag).textContent = remainingObj[timeKeys[i]];
    i++;
  }
  document.querySelector('#target-year-input').disabled = true;
  document.querySelector('#target-month-input').disabled = true;
  document.querySelector('#target-date-input').disabled = true;
}

const starter = function () {
  counterMaker ();
  const intervalId = setInterval (counterMaker, 1000);
  intervalIdArr.push(intervalId);
}

const reset = function () {
  messageContainer.innerHTML = "<h3>D-day를 입력해주세요</h3>"
  document.querySelector('#target-year-input').value = null;
  document.querySelector('#target-month-input').value = null;
  document.querySelector('#target-date-input').value = null;
  //타이머 정지
  for(let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i])
  }
  intervalIdArr = [];
  document.querySelector('#target-year-input').disabled = false;
  document.querySelector('#target-month-input').disabled = false;
  document.querySelector('#target-date-input').disabled = false;
}