import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfo,
  faCrown,
  faUserAlt,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import Leaderboard from './Leaderboard';
import { useAuth } from '../../context/AuthContext';
import { LoginModal } from './LoginModal';

const Navbar: React.FC = () => {
  const [showLeaderboardModal, setShowLeaderboardModal] =
    useState<boolean>(false);
  const [showloginModal, setShowLoginModal] = useState<boolean>(false);
  const { currentUser, loading, login, logout } = useAuth();
  console.log(currentUser);
  return (
    <>
      <nav className=" w-3/4 flex items-center justify-start mx-8 my-10">
        <Link href="/">
          <a
            className={`${styles.heading} text-green-400 text-2xl cursor-pointer w-1/3`}
          >
            Number Clicker
          </a>
        </Link>
        <ul className="ml-auto">
          <li className="inline-block text-lg font-semibold mr-6 cursor-pointer text-gray-500 hover:text-gray-50">
            {currentUser ? currentUser.displayName : null}
          </li>
          <li className="inline-block text-lg font-semibold mr-6 cursor-pointer text-gray-500 hover:text-gray-50">
            <Link href="/about">
              <a>
                <FontAwesomeIcon icon={faInfo} style={{ fontSize: 20 }} />
              </a>
            </Link>
          </li>
          <li
            className="mr-6 inline-block text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-50"
            onClick={() => setShowLeaderboardModal(true)}
          >
            <FontAwesomeIcon icon={faCrown} style={{ fontSize: 20 }} />
          </li>
          {currentUser ? (
            <li
              className="inline-block text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-50"
              onClick={() => logout()}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ fontSize: 20 }}
              />
            </li>
          ) : (
            <li
              className="inline-block text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-50"
              onClick={() => setShowLoginModal(true)}
            >
              <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: 20 }} />
            </li>
          )}
        </ul>
      </nav>
      {showLeaderboardModal ? (
        <Leaderboard modalToggler={setShowLeaderboardModal} />
      ) : (
        <></>
      )}
      {showloginModal ? (
        <LoginModal
          login={login}
          loading={loading}
          modalToggler={setShowLoginModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
