// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  //#region  //*=========== VOICE SLIDER ===========
  const voiceInput = document.querySelector('#volume-controls input');
  /** @type {HTMLImageElement} */
  const voiceIcon = document.querySelector('#volume-controls img');

  /** @param {string} src */
  const setVoiceIcons = (src, level) => {
    // Check if src is not the same, then change the icon
    if (!voiceIcon.src.includes(src)) {
      voiceIcon.src = src;
      voiceIcon.width = 48;
      voiceIcon.alt = `Volume level ${level}`;
    }
  };

  let volume = Number(100);
  voiceInput.addEventListener('input', (e) => {
    volume = Number(e.target.value);
    audio.volume = volume / 100;

    if (volume >= 67) {
      setVoiceIcons('assets/icons/volume-level-3.svg', '3');
    } else if (volume >= 34) {
      setVoiceIcons('assets/icons/volume-level-2.svg', '2');
    } else if (volume >= 1) {
      setVoiceIcons('assets/icons/volume-level-1.svg', '1');
    } else {
      setVoiceIcons('assets/icons/volume-level-0.svg', '0');
    }
  });
  //#endregion  //*======== VOICE SLIDER ===========

  //#region  //*=========== SELECT IMAGE ===========
  /** @type {HTMLImageElement} */
  const image = document.querySelector('#expose > img');
  /** @type {HTMLSelectElement} */
  const select = document.querySelector('#horn-select');
  /** @type {HTMLAudioElement} */
  const audio = document.querySelector('audio.hidden');

  select.addEventListener('change', (e) => {
    const src = `assets/images/${e.target.value}.svg`;
    image.src = src;
    image.width = 512;

    audio.src = `assets/audio/${e.target.value}.mp3`;
  });
  //#endregion  //*======== SELECT IMAGE ===========

  //#region  //*=========== AUDIO PLAY ===========
  const audioButton = document.querySelector('button');
  const jsConfetti = new JSConfetti();

  audioButton.addEventListener('click', () => {
    audio.play();

    // If party horn, show confetti
    if (select.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
  //#endregion  //*======== AUDIO ===========
}
