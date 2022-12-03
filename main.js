const limbReadout = document.getElementById('limb');
const colorReadout = document.getElementById('color');
const spinIntButton = document.getElementById('spinInt');
const stopButton = document.getElementById('stop');
const secondsInput = document.getElementById('seconds');

let interval;
let voice;

function rand() {
  return Math.floor(Math.random() * 4);
}

const limbs = ['Left Hand', 'Right Hand', 'Left Foot', 'Right Foot'];

const colors = ['Red', 'Yellow', 'Blue', 'Green'];

const backgroundColors = {
  Red: 'red',
  Yellow: 'yellow',
  Blue: 'blue',
  Green: 'green',
};

function chooseVoice() {
  const voices = speechSynthesis.getVoices();
  console.log({ voices });
  const fiona = voices.find(v => v.name === 'Fiona');
  if (fiona) {
    voice = fiona;
  } else {
    voice = voices[0];
  }
}

function spin() {
  const color = colors[rand()];
  const limb = limbs[rand()];
  colorReadout.textContent = color;
  colorReadout.style.backgroundColor = backgroundColors[color];
  limbReadout.textContent = limb;

  const utterance = new SpeechSynthesisUtterance(`${limb} ${color}`);
  utterance.voice = voice;
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
  colorReadout.style.backgroundColor = 'white';
  colorReadout.textContent = '';
  limbReadout.textContent = '';
}

speechSynthesis.addEventListener('voiceschanged', chooseVoice);
spinIntButton.addEventListener('click', spinInt);
stopButton.addEventListener('click', stop);
