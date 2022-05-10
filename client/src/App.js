import "./App.css";
import FirstPage from "./components/firstpage";
import SecondPage from "./components/secondpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;
