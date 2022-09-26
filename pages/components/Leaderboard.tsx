import React, { useEffect, useState } from 'react';
import { BestTimes } from '..';
import calculateTimeArray from '../helpers/TimerHelper';
import styles from './Leaderboard.module.css';
interface props {
  modalToggler: (a: boolean) => void;
}

const Leaderboard: React.FC<props> = (props: props) => {
  const { modalToggler } = props;
  const [topTimesData, setData] = useState<{ time: string; date: string }[]>(
    []
  );
  useEffect(() => {
    const bestTimes: BestTimes = JSON.parse(
      localStorage.getItem('best times') || '{}'
    );
    const temp: { time: string; date: string }[] = [];
    if (bestTimes) {
      for (let i = 0; i < bestTimes.bestTimes.length; i++) {
        const a = { time: '', date: '' };
        a.time = calculateTimeArray(bestTimes.bestTimes[i].time);
        a.date = bestTimes.bestTimes[i].date;
        temp.push(a);
      }
    }
    setData(temp);
  }, []);
  return (
    <div
      id="leaderboardModal"
      className="fixed inset-0 bg-zinc-600 bg-opacity-50 overflow-y-auto h-screen w-screen"
    >
      <div className="relative p-4 top-1/2 -translate-y-1/2 h-full mx-auto w-4/5">
        <div className="relative h-full rounded-lg shadow bg-zinc-900 text-gray-50 flex flex-col">
          <div className="flex mt-4 justify-between items-start p-4 pb-8 rounded-t border-b border-gray-500">
            <h3
              className={`${styles.heading} text-3xl text-green-400 font-semibold`}
            >
              Leaderboard
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-zinc-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:hover:text-white"
              onClick={() => modalToggler(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 m-auto">
            <table className="table-fixed w-full text-left text-gray-400">
              <thead className="text-l uppercase bg-zinc-700 text-gray-400">
                <tr>
                  <th className="py-3 px-6">Time</th>
                  <th className="py-3 px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {topTimesData.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b bg-zinc-800 border-gray-700"
                    >
                      <td className="py-4 px-6">{data.time}</td>
                      <td className="py-4 px-6">{data.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
