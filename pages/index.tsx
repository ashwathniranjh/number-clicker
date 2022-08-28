import type { NextPage } from 'next';
import _ from 'lodash';
import Navbar from './components/Navbar';
import NumberGrid from './components/NumberGrid';
import { useEffect, useState } from 'react';
import Timer from './components/Timer';
import calculateTimeArray from './helpers/TimerHelper';

export interface BestTimes {
  currentTime: string;
  bestTimes: {
    times: number[];
    dates: string[];
  };
}

const Home: NextPage = () => {
  const [numbers, setNumbers] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [time, setTime] = useState(0);
  const [timeArray, setTimeArray] = useState<Array<number>>([]);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [bestTimes, setBestTimes] = useState<BestTimes>({
    currentTime: '',
    bestTimes: {
      times: [0, 0, 0, 0, 0],
      dates: ['-', '-', '-', '-', '-'],
    },
  });

  // const [log, setLog] = useState<number[]>([]);
  useEffect(() => {
    const shuffled = _.shuffle([...numbers]);
    // const a = [];
    // for (let i = 0; i < shuffled.length; i++) {
    //   a[shuffled[i] - 1] = i;
    // }
    // setLog([...a]);
    setNumbers([...shuffled]);
    localStorage.setItem('best times', JSON.stringify(bestTimes));
  }, []);

  useEffect(() => {
    setTimeArray(calculateTimeArray(time));
  }, [time]);

  const handlePlay = () => {
    const interval: any = setInterval(() => {
      setTime((previousState: number) => previousState + 10);
    }, 10);
    setIntervalId(interval);
  };

  const handleStop = () => {
    clearInterval(intervalId);
    const temp: BestTimes = bestTimes;
    if (time != 0) {
      const today = new Date();
      for (let i = 0; i < 5; i++) {
        if (temp.bestTimes.times[i] == 0) {
          temp.bestTimes.times[i] = time;
          temp.bestTimes.dates[i] =
            today.getDate() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getFullYear();
          break;
        } else if (time < temp.bestTimes.times[i]) {
          for (let j = 4; j > i; j--) {
            temp.bestTimes.times[j] = temp.bestTimes.times[j - 1];
          }
          temp.bestTimes.times[i] = time;
          temp.bestTimes.dates[i] =
            today.getDate() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getFullYear();
          break;
        }
      }
    }
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setTime(0);
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-900 text-gray-50 ">
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <Timer timeArray={timeArray} />
        <NumberGrid
          numbers={numbers}
          handlePlay={handlePlay}
          handleStop={handleStop}
          handleReset={handleReset}
          bestTimes={bestTimes}
        />
      </div>
    </div>
  );
};

export default Home;
