const honapok = ['09', '10', '11', '12', '01', '02']; // hónapok kétjegyű formátumban


let allTimeSlots = []; // Ez tárolja az összes már meghirdetett időpontot

// Segédfüggvény: Véletlen dátum generálása adott hónapra és hétre
function generateRandomDate(year, month, week, dayOffset) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const randomDay = firstDayOfMonth.getDate() + (week - 1) * 7 + dayOffset;
  const date = new Date(year, month - 1, randomDay);
  const randomHour = Math.floor(Math.random() * 11) + 8; // 8:00-18:00 között
  date.setHours(randomHour, 0, 0, 0);
  return date;
}

// Segédfüggvény: Időpont ütközés ellenőrzése
function isSlotOverlapping(existingSlots, from, to) {
  return existingSlots.some(slot => {
    const isSameDay = slot.from.split(' ')[0] === from.split(' ')[0];
    const isOverlapping = new Date(slot.from) < new Date(to) && new Date(slot.to) > new Date(from);
    return isSameDay && isOverlapping;
  });
}

// Segédfüggvény: Terem hozzárendelés
function assignRoom(termek, tantargy, from, to) {
  const availableRooms = termek.filter(terem => terem.ferohely > 0);
  if (availableRooms.length === 0) return null;

  const chosenRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
  if (!chosenRoom.foglalt.some(slot => slot.from === from)) {
    chosenRoom.foglalt.push({
      tantargy: tantargy,
      from: from,
      to: to,
      remainingCapacity: chosenRoom.ferohely,
      diakok: []
    });
  }
  return chosenRoom.nev;
}

// Időpontok generálása tantárgyakhoz
export function generateTimeSlots(termek, tantargyak) {
  const result = [];
  tantargyak.forEach(tantargy => {
    const timeSlots = [];
    for (let i = 0; i < 3; i++) {
      let validSlotFound = false;
      while (!validSlotFound) {
        const month = honapok[i * 2];
        const week = Math.floor(Math.random() * 4) + 1;
        const dayOffset = Math.floor(Math.random() * 4);

        const date = generateRandomDate(2024, month, week, dayOffset);
        const fromDate = new Date(date);
        const toDate = new Date(date);
        toDate.setHours(toDate.getHours() + 1);

        const fromFormatted = fromDate.toISOString().split('T')[0] + ' ' + fromDate.toTimeString().slice(0, 5);
        const toFormatted = toDate.toISOString().split('T')[0] + ' ' + toDate.toTimeString().slice(0, 5);

        if (!isSlotOverlapping(allTimeSlots, fromFormatted, toFormatted)) {
          const roomName = assignRoom(termek, tantargy, fromFormatted, toFormatted);
          if (roomName) {
            timeSlots.push({ from: fromFormatted, to: toFormatted, terem: roomName });
            allTimeSlots.push({ from: fromFormatted, to: toFormatted });
            validSlotFound = true;
          }
        }
      }
    }
    result.push({ tárgynév: tantargy, meghírdetettIdopontok: timeSlots });
  });
  return result;
}

// Tantárgyak és időpontok hozzárendelése diákokhoz
export function assignSubjectsToStudents(students, timeSlots, termek) {
  students.forEach(diak => {
    diak.tantargyak = timeSlots;
    diak.tantargyak.forEach(tantargy => {
      tantargy.meghírdetettIdopontok.forEach(idopont => {
        const room = termek.find(terem => terem.nev === idopont.terem);
        const slot = room.foglalt.find(foglalas => foglalas.from === idopont.from);
        if (slot && slot.remainingCapacity > 0) {
          slot.diakok.push(diak);
          slot.remainingCapacity--;
        }
      });
    });
  });
}



