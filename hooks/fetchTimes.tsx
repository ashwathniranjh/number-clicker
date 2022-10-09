import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';

export interface BestTimes {
  currentTime: string;
  bestTimes: {
    time: number;
    date: string;
  }[];
}

export default function useFetchTimes() {
  const [loadingTimes, setLoadingTimes] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBestTimes(docSnap.data().todos);
        }
      } catch (err) {
        setError('Failed to load best times');
        console.log(err);
      } finally {
        setLoadingTimes(false);
      }
    }
    fetchData();
  }, []);

  return { loadingTimes, error, bestTimes, setBestTimes };
}
