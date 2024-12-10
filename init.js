import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';
import { generateData } from './dataLoader.js';
import { updateButtonText, renderDataToHTML } from './ui.js';
import {generateButton} from './variable.js'

async function init() {
  const diakok = loadFromLocalStorage('diakok');
  const termek = loadFromLocalStorage('termek');
  const tantargyak = loadFromLocalStorage('tantargyak');

  if (diakok && termek && tantargyak) {
    console.log('Adatok a localStorage-ből betöltve.');
    updateButtonText(generateButton, 'Újragenerálás');
    renderDataToHTML(diakok, termek, tantargyak);
  } else {
    updateButtonText(generateButton, 'Generálás');
  }
}

generateButton.addEventListener('click', async () => {
  const { diakok, termek, tantargyak } = await generateData();
  saveToLocalStorage('diakok', diakok);
  saveToLocalStorage('termek', termek);
  saveToLocalStorage('tantargyak', tantargyak);
  renderDataToHTML(diakok, termek, tantargyak);
});

document.addEventListener('DOMContentLoaded', () => {
  init();
});
