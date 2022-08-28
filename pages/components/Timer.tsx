import React, { useEffect, useState } from 'react';

interface props {
  timeArray: Array<number>;
}
const Timer: React.FC<props> = ({ timeArray }: props) => {
  return (
    <div className="text-4xl font-semibold mb-4">
      <p>
        {('0' + timeArray[0]).slice(-2)}:{('0' + timeArray[1]).slice(-2)}:
        {('00' + timeArray[2]).slice(-3)}
      </p>
    </div>
  );
};

export default Timer;
