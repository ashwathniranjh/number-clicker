import React from 'react';
import styles from './LoginModal.module.css';

interface props {
  modalToggler: (a: boolean) => void;
  loading: boolean;
  login: () => Promise<any>;
}

export const LoginModal: React.FC<props> = (props: props) => {
  const { modalToggler, loading, login } = props;
  return (
    <div
      id="leaderboardModal"
      className="fixed inset-0 bg-zinc-600 bg-opacity-50 overflow-y-auto h-screen w-screen"
    >
      <div className="relative p-4 top-1/2 -translate-y-1/2 h-3/5 mx-auto w-2/5">
        <div className="relative h-full rounded-lg shadow bg-zinc-900 text-gray-50 flex flex-col">
          <div className="flex mt-4 justify-between items-start p-4 pb-8 rounded-t">
            <h3
              className={`${styles.heading} text-3xl text-orange-400 font-semibold`}
            >
              Login
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

          <div className="h-1/2 flex flex-row justify-center align-center shadow-2xl text-slate-50 ">
            {/* Sign in with Google */}
            <div className="w-4/5 flex flex-col justify-center p-2 rounded-lg">
              <button
                disabled={loading}
                onClick={() => {
                  modalToggler(false);
                  login();
                }}
                className="bg-slate-600 rounded-lg p-2 text-gray-50 hover:scale-105 hover:shadow-gray-600 transition ease-out duration-100"
              >
                Log In With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
