import React, { useState, useEffect } from "react";

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return <p className="text-xl">{formattedTime}</p>;
};

export default LiveClock;
