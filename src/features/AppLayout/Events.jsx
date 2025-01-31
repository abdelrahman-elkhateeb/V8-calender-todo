import { useEffect, useState } from "react";
import { useCalenderContext } from "../../context/CalenderContext";
import EventViewrs from "./EventViewrs";
function Events() {
  const [name, setName] = useState("");
  const [slot, setSlot] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const { choosenDay } = useCalenderContext();
  const [eventsFromLocal, setEventsFromLocal] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
const [dataLoaded, setDataLoaded] = useState(false);
const [plan, setPlan]= useState("");
  const inputClassName = `shadow-lineShadow p-4 rounded-md focus:outline-primary`;
  // useeffect to fetch data from backend
  useEffect(() => {
    if (dataLoaded) return;

    fetch("http://localhost:5005/bot")
      .then((res) => res.json())
      .then((data) => {
        console.log("data ");
        console.log(data);
        setEventsFromLocal(data);
        setDataLoaded(true);  // Move this line here
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDataLoaded(true);  // Ensure state is updated even on error
      });
  }, [dataLoaded]);
  // i need once dataloaded to be true to fetch form backend  some data 
  useEffect(() => {
    if (!dataLoaded) return;
console.log("fetching additional data");
    // Fetch additional data from the backend
    fetch("http://localhost:5005/bot/plan")
      .then((res) => res.json())
      .then((data) => {
        console.log("additional data");
        console.log(data);
        setPlan(data);
        // Process additional data as needed
      });
  }, [dataLoaded]);


  function formatDate(dateString) {
    if(!dateString)return;
    if(dateString.length < 8)return dateString;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}`;
  }
  // Function to load events from localStorage
  // const loadEvents = () => {
  //   const storedEvents = localStorage.getItem("events")|| [];
  //   const filteredEvents = [];
  //   const curDate = formatDate(choosenDay)
  //   // const choosenDay = choosenDay===undefined?choosenDay: new Date(); // set the choosen day to today
  // // set the choosen day to today
  // // const formattedDate = formatDate(choosenDay)
  //   console.log(curDate);
  //   for(let i = 0; i < storedEvents.length; i++){
  //     if(storedEvents[i].date === curDate){
  //       filteredEvents.push(storedEvents[i]);
  //     }
  //   }
  //   console.log(filteredEvents);
  //   setEventsFromLocal(filteredEvents);
  // };

  useEffect(() => {
    // loadEvents(); // Initial load
    if(!eventsFromLocal) return;
    const evns = []; 
    const fd = formatDate(choosenDay);
    for(let i = 0; i < eventsFromLocal.length; i++){
      if(eventsFromLocal[i].date === fd){
        evns.push(eventsFromLocal[i]);
      }
    }
    setDisplayEvents(evns);

    // // Custom event listener for localStorage changes
    // const handleStorageChange = (event) => {
    //   if (event.key === "events") {
    //     loadEvents();
    //   }
    // };

    // window.addEventListener("storage", handleStorageChange);

    // // Cleanup
    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, [choosenDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // make the date format to mm-dd
    const formattedDate = formatDate(choosenDay);
    console.log("formattedDate", formattedDate);
    console.log(date);
    const newEvent = {
      date: formattedDate,
      name,
      slot,
      subject,
      location,
      content,
    };
    let  storedEvents = (localStorage.getItem("events"))
    console.log("ssss" ,storedEvents);
    // push the event 
    storedEvents = [...storedEvents,newEvent]
    localStorage.setItem("events",storedEvents);

    // Call loadEvents right` after updating local storage to refresh the events list
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
      <EventViewrs myplan ={plan} events={displayEvents} chosenDay={choosenDay} />
    </>
  );
}

export default Events;
