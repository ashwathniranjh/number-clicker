import React, { useEffect, useState } from 'react';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BestTimes } from '..';
import calculateTimeArray from '../helpers/TimerHelper';

interface props {
  numbers: number[];
  handlePlay: () => void;
  handleStop: () => void;
  handleReset: () => void;
  bestTimes: BestTimes;
}
const NumberGrid: React.FC<props> = (props: props) => {
  const { numbers, handlePlay, handleStop, handleReset, bestTimes } = props;
  const [index, setIndex] = useState<number>(-1);
  const [finishedBool, setFinishedBool] = useState<boolean>(false);

  const gameStartHandler = () => {
    setFinishedBool(false);
    handlePlay();
  };
  const gameEndHandler = () => {
    handleStop();
    setFinishedBool(true);
  };
  const restartHandler = () => {
    handleReset();
    for (let i = 26; i <= 41; i++) {
      document.getElementById(i.toString())!.style.opacity = '1';
      document.getElementById(i.toString())!.innerHTML = (i - 25).toString();
      if (i == 26) {
        document.getElementById(i.toString())!.style.cursor = 'pointer';
        document.getElementById(i.toString())!.style.pointerEvents = 'auto';
      } else {
        document.getElementById(i.toString())!.style.cursor = 'none';
        document.getElementById(i.toString())!.style.pointerEvents = 'none';
      }
      document.getElementById(i.toString())!.id = (i - 25).toString();
    }
    setFinishedBool(false);
  };
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const divEl: HTMLDivElement = e.currentTarget;
    if (divEl && parseInt(divEl.innerHTML) === 1) {
      gameStartHandler();
    }
    if (divEl && parseInt(divEl.innerHTML) === 25) {
      gameEndHandler();
    }
    if (divEl && parseInt(divEl.innerHTML) > 9) {
      divEl.style.opacity = '0';
    }
    divEl.style.pointerEvents = 'none';
    divEl.style.cursor = 'none';
    setIndex(parseInt(divEl.innerHTML));
  };

  useEffect(() => {
    console.log(index);
    if (document.getElementById(index.toString()) !== null) {
      document.getElementById(index.toString())!.innerHTML = (
        16 + index
      ).toString();
      document.getElementById((index + 1).toString())!.style.pointerEvents =
        'auto';
      document.getElementById((index + 1).toString())!.style.cursor = 'pointer';
      document.getElementById(index.toString())!.id = (16 + index).toString();
    }
  }, [index]);

  return (
    <>
      <div className="grid gap-2 grid-cols-4 grid-rows-4 border-2 border-dashed p-1 border-zinc-400">
        {numbers.slice(0, 16).map((number) =>
          number == 1 ? (
            <div
              className="border-2 border-gray-500 h-16 w-16 rounded-lg flex items-center justify-center bg-zinc-800 font-bold"
              key={number}
              onClick={clickHandler}
              id={number.toString()}
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              {number}
            </div>
          ) : (
            <div
              className="border-2 border-gray-500 h-16 w-16 rounded-lg flex items-center justify-center bg-zinc-800 font-bold"
              key={number}
              onClick={clickHandler}
              id={number.toString()}
              style={{ pointerEvents: 'none', cursor: 'none' }}
            >
              {number}
            </div>
          )
        )}
      </div>
      {finishedBool ? (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-screen"
          id="my-modal"
        >
          <div className="relative top-1/2 -translate-y-1/2 mx-auto my-auto p-5 border w-3/5 h-4/5 shadow-lg rounded-md bg-zinc-900 text-gray-50">
            <div className="mt-3 text-center">
              {/* <h3 className="text-lg leading-6 font-medium text-gray-50">
                Successful!
              </h3> */}
              <div className="mt-2 px-7 py-3">
                <p className="text-4xl text-red-400 heading text-semibold">
                  Game Completed!
                </p>
              </div>
              <div className="mt-16 flex-col flex items-center justify-center">
                <div className="text-2xl text-gray-50">
                  <div className="text-xl font-bold mb-4">Leaderboard</div>
                  <ul>
                    {bestTimes.bestTimes.times.map((time, index) => {
                      const t = calculateTimeArray(time);
                      return (
                        <li key={index.toString()}>
                          {('0' + t[0]).slice(-2)}:{('0' + t[1]).slice(-2)}:
                          {('00' + t[2]).slice(-3)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="items-center px-4 py-3 mt-4">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={restartHandler}
                  >
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      style={{ fontSize: 20 }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NumberGrid;
