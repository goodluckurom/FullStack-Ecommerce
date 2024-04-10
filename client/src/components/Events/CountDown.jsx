import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  function calculateTimeLeft() {
    const differnce = +new Date("2024-04-8") - +new Date();
    let timeLeft = {};

    if (differnce > 0) {
      timeLeft = {
        days: Math.floor(differnce / (1000 * 60 * 60 * 24)),
        hours: Math.floor((differnce / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((differnce / 1000 / 60) % 60),
        seconds: Math.floor((differnce / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {(interval === "hours" || interval === "minutes") && " "}
        {timeLeft[interval]} {interval}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
