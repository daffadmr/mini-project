import "./App.css";
import SetupRouter from "./routes/SetupRouter";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <div className="overflow-x-hidden">
        <SetupRouter />
      </div>
    </HelmetProvider>
  );
}

export default App;
