import React, { useEffect, useState } from 'react';
import { BestTimes } from '..';
import EndOfGameModal from './EndOfGameModal';

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
    for (let index = 26; index <= 41; index++) {
      if (
        document != null &&
        document.getElementById(index.toString()) != null
      ) {
        document.getElementById(index.toString())!.style.opacity = '1';
        document.getElementById(index.toString())!.innerHTML = (
          index - 25
        ).toString();
        if (index == 26) {
          document.getElementById(index.toString())!.style.cursor = 'pointer';
          document.getElementById(index.toString())!.style.pointerEvents =
            'auto';
        } else {
          document.getElementById(index.toString())!.style.cursor = 'none';
          document.getElementById(index.toString())!.style.pointerEvents =
            'none';
        }
        document.getElementById(index.toString())!.id = (index - 25).toString();
      }
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
              className="border-2 border-gray-500 h-14 w-14 rounded-lg flex items-center justify-center bg-zinc-800 font-bold"
              key={number}
              onClick={clickHandler}
              id={number.toString()}
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              {number}
            </div>
          ) : (
            <div
              className="border-2 border-gray-500 h-14 w-14 rounded-lg flex items-center justify-center bg-zinc-800 font-bold"
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
        <EndOfGameModal bestTimes={bestTimes} restartHandler={restartHandler} />
      ) : (
        <></>
      )}
    </>
  );
};

export default NumberGrid;
