import {assignSubjectsToStudents, generateTimeSlots} from './main.js'

// dataLoader.js
export async function loadJSON(filePath) {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`Nem sikerült betölteni a fájlt: ${filePath}`);
  }
  return await response.json();
}

export async function generateData() {
  const termek = await loadJSON('./rooms.json');
  const diakok = await loadJSON('./students.json');
  const tantargyak = await loadJSON('./subject.json');

  // Példa: Generált adatok feldolgozása
  const timeSlots = generateTimeSlots(termek, tantargyak);
  assignSubjectsToStudents(diakok, timeSlots, termek);

  return { termek, diakok, tantargyak: timeSlots };
}
