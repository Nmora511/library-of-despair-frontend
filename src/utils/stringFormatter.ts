export function capitalizeFirstLetter(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

export function timeStringFormatter(time: number): string {
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":");
}
