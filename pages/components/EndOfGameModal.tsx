import React from 'react';
import { BestTimes } from '..';
import calculateTimeArray from '../helpers/TimerHelper';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EndOfGameModal.module.css';
interface props {
  bestTimes: BestTimes;
  restartHandler: () => void;
}
const EndOfGameModal: React.FC<props> = (props: props) => {
  const { bestTimes, restartHandler } = props;
  return (
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
            <p
              className={`${styles.heading} text-4xl text-green-400 heading text-semibold`}
            >
              Game Completed!
            </p>
          </div>
          <div className="mt-16 flex-col flex items-center justify-center">
            <div className="text-2xl text-gray-50">
              <div className="text-xl font-bold mb-4">Leaderboard</div>
              <ul>
                {bestTimes.bestTimes.map((data, index) => {
                  const timeString = calculateTimeArray(data.time);
                  return <li key={index.toString()}>{timeString}</li>;
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
  );
};

export default EndOfGameModal;
