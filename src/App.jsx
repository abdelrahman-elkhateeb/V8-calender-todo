import Calender from "./features/AppLayout/Calender";
import Header from "./features/UI/Header";

function App() {
  return (
    <div className="h-dvh pt-5">
      <div className="container relative mx-auto h-dvh px-4">
        <Header />
        <Calender />
      </div>
    </div>
  );
}

export default App;
