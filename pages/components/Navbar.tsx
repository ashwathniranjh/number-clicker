import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faCrown } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import Leaderboard from './Leaderboard';

const Navbar: React.FC = () => {
  const [showLeaderboardModal, setShowLeaderboardModal] =
    useState<boolean>(false);
  return (
    <>
      <nav className=" w-3/4 flex items-end justify-start m-8">
        <Link href="/">
          <a
            className={`${styles.heading} text-green-400 text-2xl cursor-pointer`}
          >
            Number Clicker
          </a>
        </Link>
        <ul className="ml-8">
          <li className="inline-block text-lg font-semibold mr-6 cursor-pointer text-gray-500 hover:text-gray-50">
            <Link href="/about">
              <a>
                <FontAwesomeIcon icon={faInfo} style={{ fontSize: 20 }} />
              </a>
            </Link>
          </li>
          <li
            className="inline-block text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-50"
            onClick={() => setShowLeaderboardModal(true)}
          >
            <FontAwesomeIcon icon={faCrown} style={{ fontSize: 20 }} />
          </li>
        </ul>
      </nav>
      {showLeaderboardModal ? (
        <Leaderboard modalToggler={setShowLeaderboardModal} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
