// script.js
let startTime = null;
let elapsedTime = 0;
let timerInterval = null;

const stopwatchDisplay = document.getElementById('stopwatch');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  stopwatchDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (timerInterval) return; // Prevent multiple intervals
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 100);
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay();
  lapsContainer.innerHTML = ''; // Clear laps
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement('div');
  lapElement.className = 'lap';
  lapElement.textContent = `Lap: ${lapTime}`;
  lapsContainer.appendChild(lapElement);
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Initialize display
updateDisplay();
