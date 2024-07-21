import { CalenderProvider } from "../../context/CalenderContext";
import Header from "../UI/Header";
import Calender from "./Calender";
import Events from "./Events";
import EventViewrs from "./EventViewrs";

function AppContent() {
  return (
    <>
      <CalenderProvider>
        <Header />
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-32">
          <Calender />
          <Events />
        </div>
      </CalenderProvider>
    </>
  );
}

export default AppContent;
