import Header from "../UI/Header";
import Calender from "./Calender";
import Events from "./Events";

function AppContent() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
        <Calender />
        <Events />
      </div>
    </>
  );
}

export default AppContent;
