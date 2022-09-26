import React from 'react';

interface props {
  timeArray: string;
}
const Timer: React.FC<props> = ({ timeArray }: props) => {
  return (
    <div className="text-4xl font-semibold mb-4">
      <p>{timeArray}</p>
    </div>
  );
};

export default Timer;
