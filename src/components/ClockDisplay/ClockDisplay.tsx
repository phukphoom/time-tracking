import { useState, useEffect } from "react";

const ClockDisplay = () => {
  const [clock, setClock] = useState<Date>(new Date());

  useEffect(() => {
    setTimeout(() => {
      setClock(new Date());
    }, 1000);
  }, [clock]);

  return (
    <div className="flex flex-col items-center bg-gray-200 w-full py-4 rounded-md">
      <div>
        ลงเวลาวันที่ : {clock.getDate()}/{clock.getMonth()}/
        {clock.getFullYear()}
      </div>
      <div className="font-bold text-6xl">
        {clock.getHours().toString().padStart(2, "0")} :{" "}
        {clock.getMinutes().toString().padStart(2, "0")} :{" "}
        {clock.getSeconds().toString().padStart(2, "0")}
      </div>
    </div>
  );
};
export default ClockDisplay;
