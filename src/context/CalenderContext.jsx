import { createContext, useContext, useState } from "react";

const CalenderContext = createContext();

function CalenderProvider({ children }) {
  const [choosenDay, setChoosenDay] = useState();
  const [events, setEvents] = useState({});

  const addEvent = (date, event) => {
    setEvents((prevEvents) => ({
      ...(prevEvents[date] || []),
      event,
    }));
  };

  return (
    <CalenderContext.Provider
      value={{ choosenDay, setChoosenDay, addEvent, events }}
    >
      {children}
    </CalenderContext.Provider>
  );
}

function useCalenderContext() {
  const context = useContext(CalenderContext);
  if (context === undefined) {
    throw new Error("useCalenderContext must be used within a CalenderContext");
  }
  return context;
}
export { CalenderProvider, useCalenderContext };
