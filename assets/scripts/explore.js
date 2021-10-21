// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  //#region  //*=========== VOICE SELECT ===========
  /** @type {HTMLSelectElement} */
  const voiceSelect = document.querySelector('#voice-select');
  /** @type {HTMLButtonElement} */
  const readButton = document.querySelector('button');

  /** @type {SpeechSynthesisVoice[]} */
  let voices;
  function populateVoiceList() {
    if (typeof speechSynthesis === 'undefined') {
      return;
    }

    voices = speechSynthesis.getVoices();

    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = voice.name + ' (' + voice.lang + ')';

      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  }

  populateVoiceList();
  if (
    typeof speechSynthesis !== 'undefined' &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const textArea = document.getElementById('text-to-speak');
  let utterThis = new SpeechSynthesisUtterance();

  readButton.addEventListener('click', () => {
    const textToRead = textArea.value;
    utterThis.text = textToRead;

    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute('data-name');

    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        utterThis.voice = voice;
      }
    });

    speechSynthesis.speak(utterThis);
  });

  /** @type {HTMLImageElement} */
  const img = document.querySelector('#explore img');

  utterThis.onstart = () => {
    img.src = 'assets/images/smiling-open.png';
    img.alt = 'Smiling face open';
  };

  utterThis.onend = () => {
    img.src = 'assets/images/smiling.png';
    img.alt = 'Smiling face';
  };
  //#endregion  //*======== VOICE SELECT ===========
}
