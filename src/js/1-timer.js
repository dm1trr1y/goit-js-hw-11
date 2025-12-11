'use strict';


import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


let userDate;
let isActiveBtn = false;
const startBtn = document.querySelector('[data-start');
const days = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
const outTextTime = document.querySelector('.timer');
let countEndTime = 6;


const input = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    getUserDate();
  },
};
const date = flatpickr(input, options);


function getUserDate() {
  if (userDate.getTime() > Date.now() && isActiveBtn === false) {
    startBtn.removeAttribute('disabled');
    isActiveBtn = true;
    iziToast.success({
      theme: 'dark',
      title: 'Corect date',
      titleColor: '#fff',
      backgroundColor: 'green',
      position: 'topRight',
    });
  } else if (userDate.getTime() <= Date.now() && isActiveBtn === true) {
    startBtn.setAttribute('disabled', '');
    isActiveBtn = false;
    iziToast.warning({
      theme: 'dark',
      title: 'Error',
      titleColor: '#fff',
      message: 'Please choose a date in the future',
      messageColor: '#fff',
      backgroundColor: 'red',
      position: 'topRight',
    });
  } else {
    iziToast.warning({
      theme: 'dark',
      title: 'Error',
      titleColor: '#fff',
      message: 'Please choose a date in the future',
      messageColor: '#fff',
      backgroundColor: 'red',
      position: 'topRight',
    });
  }
}


startBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function startTimer() {
  startBtn.setAttribute('disabled', '');
  isActiveBtn = false;
  input.setAttribute('disabled', '');


  function convertDate(date) {
    if (date === 0) {
      return '00';
    } else if (date > 0 && date < 10) {
      return '0' + date;
    } else {
      return String(date);
    }
  }


  const timer = setInterval(() => {
    if (userDate.getTime() - Date.now() > 0) {
      const outTime = convertMs(userDate.getTime() - Date.now());
      days.textContent = convertDate(outTime.days);
      hour.textContent = convertDate(outTime.hours);
      minute.textContent = convertDate(outTime.minutes);
      second.textContent = convertDate(outTime.seconds);
    } else {
      clearInterval(timer);
      input.removeAttribute('disabled');
      const timeOut = setInterval(() => {
        if (countEndTime > 0) {
          outTextTime.classList.toggle('time-out');
          countEndTime--;
        } else {
          clearInterval(timeOut);
          countEndTime = 6;
        }
      }, 600);
    }
  }, 1000);
}
