import type { NextPage } from 'next';
import _ from 'lodash';
import Navbar from './components/Navbar';
import NumberGrid from './components/NumberGrid';
import { useEffect, useState } from 'react';
import Timer from './components/Timer';
import calculateTimeArray from './helpers/TimerHelper';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
export interface BestTimes {
  currentTime: string;
  bestTimes: {
    time: number;
    date: string;
  }[];
}

const Home: NextPage = () => {
  const { currentUser } = useAuth();
  const [numbers, setNumbers] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [time, setTime] = useState(0);
  const [timeArray, setTimeArray] = useState<string>('');
  const [intervalId, setIntervalId] = useState<number>(0);

  const [bestTimes, setBestTimes] = useState<BestTimes>({
    currentTime: '',
    bestTimes: [
      { time: 0, date: '-' },
      { time: 0, date: '-' },
      { time: 0, date: '-' },
      { time: 0, date: '-' },
      { time: 0, date: '-' },
    ],
  });

  useEffect(() => {
    const shuffled = _.shuffle([...numbers]);
    setNumbers([...shuffled]);
    localStorage.setItem('best times', JSON.stringify(bestTimes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // const { loadingTimes, error, bestTimes, setBestTimes } = useFetchTimes();
    if (currentUser != null) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBestTimes(docSnap.data().bestTimes);
          }
        } catch (err) {
          // setError('Failed to load best times');
          console.log(err);
        }
        // finally {
        //   setLoadingTimes(false);
        // }
      };
      fetchData();
    } else {
      setBestTimes({
        currentTime: '',
        bestTimes: [
          { time: 0, date: '-' },
          { time: 0, date: '-' },
          { time: 0, date: '-' },
          { time: 0, date: '-' },
          { time: 0, date: '-' },
        ],
      });
    }
  }, [currentUser]);

  useEffect(() => {
    setTimeArray(calculateTimeArray(time));
  }, [time]);

  const handlePlay = () => {
    const interval: any = setInterval(() => {
      setTime((previousState: number) => previousState + 10);
    }, 10);
    setIntervalId(interval);
  };

  const handleStop = async () => {
    clearInterval(intervalId);
    const temp: BestTimes = bestTimes;
    if (time != 0) {
      const today = new Date();
      console.log(temp.bestTimes);
      for (let i = 0; i < 5; i++) {
        if (temp.bestTimes[i].time == 0) {
          temp.bestTimes[i].time = time;
          temp.bestTimes[i].date =
            today.getDate() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getFullYear();
          break;
        } else {
          if (time < temp.bestTimes[i].time) {
            console.log(time);
            const j = {
              time: time,
              date:
                today.getDate() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getFullYear(),
            };
            temp.bestTimes.splice(i, 0, j);
            temp.bestTimes.pop();
            break;
          }
        }
      }
    }
    setBestTimes(temp);
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, bestTimes);
    }
    localStorage.setItem('best times', JSON.stringify(bestTimes));
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
