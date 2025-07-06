import { useEffect, useState } from "react";

export default function WorkHourTracker({ clockInTime, initialWorkHours }) {
  const [decimalHours, setDecimalHours] = useState(initialWorkHours || 0);

  useEffect(() => {
    if (!clockInTime) return;

    const clockIn = new Date(clockInTime);

    const interval = setInterval(() => {
      const now = new Date();
      const elapsedMs = now - clockIn;
      const elapsedHours = elapsedMs / (1000 * 60 * 60); // milliseconds → hours
      const total = parseFloat((initialWorkHours + elapsedHours).toFixed(2));
      setDecimalHours(total);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [clockInTime, initialWorkHours]);

  return (
    <div className="text-lg font-semibold text-green-700">
      Working Time: {decimalHours} hrs
    </div>
  );
}
