const displayTime = document.querySelector('.js-display-time');
const startButtonElement = document.querySelector('.js-start-button');
const stopButtonElement = document.querySelector('.js-stop-button')
let isPlaying = false;
let intervalId = '';

let time = JSON.parse(localStorage.getItem('time')) || {
  first: 0,
  second: 0,
  third: 0,
  fourth: 0
}

updateTime();

function updateTime() {
  displayTime.innerHTML = `${time.first}${time.second}:${time.third}${time.fourth}`;
}

function rulesTimer() {
  time.fourth++;
  if (time.first === 5 && time.second === 9 & time.third === 5 && time.fourth === 10) {
    time.first = 0;
    time.second = 0;
    time.third = 0;
    time.fourth = 0;
  } else if (time.second === 9 & time.third === 5 && time.fourth === 10) {
    time.first++;
    time.second = 0;
    time.third = 0;
    time.fourth = 0;
  } else if (time.third === 5 && time.fourth === 10) {
    time.second++;
    time.third = 0;
    time.fourth = 0;
  } 
  else if (time.fourth === 10) {
    time.fourth = 0;
    time.third++;
    return;
  }
  localStorage.setItem('time', JSON.stringify(time));
}

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    document.querySelector('.js-confirmation-container')
      .innerHTML = `
    <div class="confirmation-display">
      <p class="confirmation-text">Are you sure?</p>
      <button class="js-yes-button yes-button">Yes</button>
      <button class="js-no-button no-button">No</button>
    </div>
    `;
    document.querySelector('.js-yes-button')
      .addEventListener('click', () => {
        document.querySelector('.js-confirmation-container')
          .innerHTML = '';
        time.first = 0;
        time.second = 0;
        time.third = 0;
        time.fourth = 0;
        localStorage.removeItem('time');
        updateTime();
      })
    document.querySelector('.js-no-button')
      .addEventListener('click', () => {
        document.querySelector('.js-confirmation-container')
          .innerHTML = '';
      })
  })


stopButtonElement.addEventListener('click', () => {
  isPlaying = true;
  clearInterval(intervalId);
})

startButtonElement.addEventListener('click', () => {  
  isPlaying = false;
  clearInterval(intervalId);
  if (!isPlaying) {
    intervalId = setInterval(function() {
      rulesTimer();
      updateTime();
    }, 1000)
  }
})


