import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useState } from "react";

function Calender() {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth),
  });

  function getPrevMonth(e) {
    e.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  }

  function getNextMonth(e) {
    e.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  }

  const buttonClassName = ``;

  return (
    <>
      <div className="mt-8 flex justify-end">
        <button onClick={getNextMonth} className={buttonClassName}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button onClick={getPrevMonth} className={buttonClassName}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-7 place-items-center gap-6 sm:gap-12">
        {days.map((day, idx) => {
          return (
            <div key={idx} className="font-semibold capitalize">
              {day}
            </div>
          );
        })}
      </div>
      <div className="sm:gap-21 mt-8 grid grid-cols-7 place-items-center gap-6">
        {daysInMonth.map((day, id) => {
          console.log(isToday(day));
          return (
            <div key={id} className="text-center">
              <p
                className={`${isToday(day) ? `bg-secondary` : ""} cursor-pointer border-b-2 border-accent p-5`}
              >
                {format(day, "dd")}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Calender;
