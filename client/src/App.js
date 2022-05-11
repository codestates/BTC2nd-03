import "./App.css";
import FirstPage from "./components/firstpage";
import SecondPage from "./components/secondpage";
import ThirdPage from "./components/thirdpage";
import FourthPage from "./components/fourthpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />
        <Route path="/thirdpage" element={<ThirdPage />} />
        <Route path="/fourthpage" element={<FourthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
