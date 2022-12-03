const limbReadout = document.getElementById('limb');
const colorReadout = document.getElementById('color');
const spinIntButton = document.getElementById('spinInt');
const stopButton = document.getElementById('stop');
const secondsInput = document.getElementById('seconds');

let interval;

function rand() {
  return Math.floor(Math.random() * 4);
}

const limbs = ['Left Hand', 'Right Hand', 'Left Foot', 'Right Foot'];

const colors = ['Red', 'Yellow', 'Blue', 'Green'];

function spin() {
  const color = colors[rand()];
  const limb = limbs[rand()];
  colorReadout.textContent = color;
  limbReadout.textContent = limb;

  const utterance = new SpeechSynthesisUtterance(`${limb} ${color}`);
  speechSynthesis.speak(utterance);
}

function spinInt() {
  spin();
  const seconds = secondsInput.value || '5';
  const timeout = parseInt(seconds, 10) * 1000;
  interval = window.setInterval(spin, timeout);
}

function stop() {
  window.clearInterval(interval);
}

spinIntButton.addEventListener('click', spinInt);
stopButton.addEventListener('click', stop);
