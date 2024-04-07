import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const LiveClock = () => {
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
    return _jsx("p", { className: "text-xl", children: formattedTime });
};
export default LiveClock;
