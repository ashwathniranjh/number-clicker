function calculateTimeArray(time: number): number[] {
  const minutes: number = Math.floor((time / 60000) % 60);
  const seconds: number = Math.floor((time / 1000) % 60);
  const mseconds: number = (time / 10) % 1000;

  return [minutes, seconds, mseconds];
}

export default calculateTimeArray;
