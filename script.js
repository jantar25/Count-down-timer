const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const timerButtons = document.querySelectorAll(".timer__button");
const customForm = document.querySelector("#custom");
let countInterval;

const counterDispaly = (remainingseconds) => {
  const minute = Math.floor(remainingseconds / 60);
  const second = remainingseconds % 60;

  timeLeft.textContent = `${minute}:${second < 10 ? "0" : ""}${second}`;
};

const remainingTime = (time) => {
  clearInterval(countInterval); // stop existing timer
  const currentDate = Date.now(); // in millisecond
  const selectedTime = time * 1000; //selected time in milisecond
  const futureTime = currentDate + selectedTime;
  backTime(futureTime);
  counterDispaly(time);

  countInterval = setInterval(() => {
    const remainingseconds = Math.round((futureTime - Date.now()) / 1000);
    if (remainingseconds < 0) {
      clearInterval(countInterval);
      return;
    }
    counterDispaly(Math.abs(remainingseconds));
  }, 1000);
};

const backTime = (futureTime) => {
  const formattedTime = new Date(futureTime);
  const futureHour = formattedTime.getHours();
  const futureMinute = formattedTime.getMinutes();

  endTime.textContent = `Be Back At ${
    futureHour > 12 ? futureHour % 12 : futureHour
  }:${futureMinute < 10 ? "0" : ""}${futureMinute}`;
};

timerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { time } = button.dataset;
    remainingTime(parseInt(time));
  });
});

customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const seconds = customForm.minutes.value * 60;
  remainingTime(seconds);
  customForm.minutes.value = "";
});
