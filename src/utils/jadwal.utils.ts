/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDays, subDays } from 'date-fns';

export function getNextDateForDay(dayOfWeek: string): Date {
  const daysMap = {
    senin: 1,
    selasa: 2,
    rabu: 3,
    kamis: 4,
    jumat: 5,
    sabtu: 6,
    minggu: 0,
  };

  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const targetDayIndex = daysMap[dayOfWeek.toLowerCase()];

  // Calculate how many days to add/subtract to get to the closest occurrence of the target day
  let daysToAdd;
  if (targetDayIndex === currentDayIndex) {
    // Jika hari yang diinput sama dengan hari ini, gunakan hari ini
    daysToAdd = 0;
  } else if (targetDayIndex < currentDayIndex) {
    // Jika target hari sebelum hari ini, pilih hari di minggu berjalan (mundur)
    daysToAdd = targetDayIndex - currentDayIndex;
  } else {
    // Jika target hari sesudah hari ini, pilih hari di minggu berjalan (maju)
    daysToAdd = (targetDayIndex - currentDayIndex) % 7;
  }

  // Dapatkan tanggal terdekat
  const nextDate = addDays(currentDate, daysToAdd);
  return nextDate;
}
