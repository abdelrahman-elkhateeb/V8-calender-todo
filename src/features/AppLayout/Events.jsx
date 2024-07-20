import { useEffect, useState } from 'react';
import { useCalenderContext } from '../../context/CalenderContext';

function Events() {
  const [name, setName] = useState("");
  const [slot, setSlot] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const { choosenDay } = useCalenderContext();
  const [eventsFromLocal, setEventsFromLocal] = useState([]);
  const inputClassName = `shadow-lineShadow p-4 rounded-md focus:outline-primary`;

  // Function to load events from localStorage
  const loadEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    if (storedEvents[choosenDay]) {
      setEventsFromLocal(storedEvents[choosenDay]);
    } else {
      setEventsFromLocal([]);
    }
  };

  useEffect(() => {
    loadEvents(); // Initial load

    // Custom event listener for localStorage changes
    const handleStorageChange = (event) => {
      if (event.key === "events") {
        loadEvents();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [choosenDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { name, slot, subject, location, content };
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    const dayEvents = storedEvents[choosenDay]
      ? [...storedEvents[choosenDay], newEvent]
      : [newEvent];
    storedEvents[choosenDay] = dayEvents;
    localStorage.setItem("events", JSON.stringify(storedEvents));
    
    // Call loadEvents right after updating local storage to refresh the events list
    loadEvents();
  
    // Reset form fields after submission
    setName("");
    setSlot("");
    setSubject("");
    setLocation("");
    setContent("");
  };

  return (
    <>
      {choosenDay ? (
        <div className="mb-9 flex flex-col gap-7 md:mb-0">
          <h1 className="mt-5 text-5xl font-bold italic text-primary">
            Enter new Event
          </h1>
          <form
            className="flex h-full flex-col justify-evenly gap-7"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Event Name / ex:quiz"
              className={inputClassName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              name="slot"
              placeholder="Slot / ex:5th"
              className={inputClassName}
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject ex:mobile / dev"
              className={inputClassName}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="text"
              name="location"
              placeholder="Location / ex:s2"
              className={inputClassName}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="text"
              name="content"
              placeholder="Content Lecture / ex:1,2,3"
              className={inputClassName}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-md bg-primary p-3 text-background"
            >
              Add Event
            </button>
          </form>
        </div>
      ) : (
        <p className="flex h-full w-full items-center justify-center text-3xl font-semibold capitalize text-primary">
          Select a day
        </p>
      )}
    </>
  );
}

export default Events;
