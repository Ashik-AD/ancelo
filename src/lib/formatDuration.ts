export function formatDuration(duration: number) {
  if (!duration || duration <= 0) return `No duration`;
  const hour = Math.floor(duration / 60);
  const minute = duration % 60;
  return `${hour > 0 ? `${addZeroLessThanTen(hour)}:` : ''}${addZeroLessThanTen(minute)
    }:00`;
}

export function addZeroLessThanTen(num: number) {
  return num < 10 ? `0${num}` : num;
}
