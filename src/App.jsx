import "./App.css";
import SetupRouter from "./routes/SetupRouter";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="font-inter">
      <SetupRouter>
        <Helmet>
          <title>Nested Title</title>
          <meta name="description" content="Nested component" />
        </Helmet>
      </SetupRouter>
    </div>
  );
}

export default App;
