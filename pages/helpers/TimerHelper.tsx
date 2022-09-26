function calculateTimeArray(time: number): string {
  const minutes: number = Math.floor((time / 60000) % 60);
  const seconds: number = Math.floor((time / 1000) % 60);
  const mseconds: number = (time / 10) % 1000;
  const res =
    ('0' + minutes).slice(-2) +
    ':' +
    ('0' + seconds).slice(-2) +
    ':' +
    ('00' + mseconds).slice(-3);
  return res;
}

export default calculateTimeArray;
