import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useState, useEffect } from "react";
import { useCalenderContext } from "../../context/CalenderContext";

function Calendar() {
  const { choosenDay, setChoosenDay, events } = useCalenderContext();
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  const displayMonth = format(firstDayOfMonth, "MMMM yyyy");

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth),
  });

  function formatDate(dateString) {
    if(dateString.length < 8)return dateString;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}`;
  }
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

  const [isTodayActive, setIsTodayActive] = useState(false);

  useEffect(() => {
    setIsTodayActive(isSameDay(choosenDay, today));
  }, [choosenDay]);

  const buttonClassName = `text-primary h-fit mt-2`;

  return (
    <div className="shadow-lineShadow after:content[*] relative mb-6 rounded-lg bg-background p-6 after:absolute after:left-0 after:top-4 after:-z-[1] after:h-full after:w-full after:rounded-lg after:bg-primary md:after:left-4">
      <div className="mt-8 flex items-center justify-center text-2xl font-semibold">
        {displayMonth}
      </div>

      <div className="mt-8 flex items-center justify-end gap-2">
        <button onClick={getPrevMonth} className={buttonClassName}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button
          onClick={() => {
            setCurrMonth(format(today, "MMM-yyyy"));
            setChoosenDay(formatDate(today)); // Set chosen day to today
          }}
          className={`rounded p-1 text-background ${isTodayActive ? "bg-secondary" : "bg-primary"}`}
        >
          today
        </button>
        <button onClick={getNextMonth} className={buttonClassName}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-7 place-items-center gap-6 sm:gap-12">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="p-2 text-xl font-semibold capitalize italic"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="sm:gap-21 mt-8 grid grid-cols-7 place-items-center gap-6">
        {daysInMonth.map((day, id) => (
          <div key={id} className="text-center">
            <p
              className={`
                ${isSameMonth(day, today) ? "bg-red-100" : "bg-red-400"} 
                ${isSameDay(day, choosenDay) ? "bg-blue-500 text-white" : ""}
                cursor-pointer rounded p-5 hover:bg-primary
              `}
              onClick={() => setChoosenDay(formatDate(day))}
            >
              {format(day, "dd")}
            </p>
            <div>
              {(events[format(day, "yyyy-MM-dd")] || []).map((event, index) => (
                <div key={index} className="event">
                  {event}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
