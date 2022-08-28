import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faCrown } from '@fortawesome/free-solid-svg-icons';
const Navbar: React.FC = () => {
  return (
    <nav className=" w-3/4 flex items-end justify-start m-8">
      <Link href="/">
        <a className="heading text-red-400 font-semibold text-3xl cursor-pointer">
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
        <li className="inline-block text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-50">
          <Link href="#">
            <a>
              <FontAwesomeIcon icon={faCrown} style={{ fontSize: 20 }} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
