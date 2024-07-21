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
  import { useCalenderContext } from "../../context/CalenderContext";

  function Calender() {
    const { setChoosenDay, events, addEvent } = useCalenderContext();
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const today = startOfToday();
    const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
    let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
    const displayMonth = format(firstDayOfMonth, "MMMM yyyy");

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

    // const handleDayClick = (day) => {
    //   setChoosenDay(day);
    //   const eventTitle = prompt("Enter event title:");
    //   if (eventTitle) {
    //     addEvent(format(day, "yyyy-MM-dd"), eventTitle);
    //   }
    // };

    const buttonClassName = `text-primary h-fit mt-2`;

    return (
      <div className="shadow-lineShadow after:content[*] relative mb-6 rounded-lg bg-background p-6 after:absolute after:left-0 after:top-4 after:-z-[1] after:h-full after:w-full after:rounded-lg after:bg-primary md:after:left-4">
        {/* Month Display */}
        <div className="mt-8 flex items-center justify-center text-2xl font-semibold">
        {displayMonth}
      </div>

       <div className="mt-8 flex items-center justify-end gap-2">
          <button onClick={getNextMonth} className={buttonClassName}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => setCurrMonth(format(today, "MMM-yyyy"))}
            className="rounded bg-primary p-1 text-background"
          >
            today
          </button>
          <button onClick={getPrevMonth} className={buttonClassName}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-7 place-items-center gap-6 sm:gap-12">
          {days.map((day, idx) => {
            return (
              <div
                key={idx}
                className="p-2 text-xl font-semibold capitalize italic"
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="sm:gap-21 mt-8 grid grid-cols-7 place-items-center gap-6">
          {daysInMonth.map((day, id) => {
            return (
              <div key={id} className="text-center">
                <p
                  className={`${isSameMonth(day, today) ? "bg-red-100" : "bg-red-400"} ${isToday(day) ? "bg-secondary" : ""} cursor-pointer rounded p-5 hover:bg-primary`}
                  onClick={() => {
                    setChoosenDay(day);
                  }}
                >
                  {format(day, "dd")}
                </p>
                <div>
                  {(events[format(day, "yyyy-MM-dd")] || []).map(
                    (event, index) => (
                      <div key={index} className="event">
                        {event}
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  export default Calender;
