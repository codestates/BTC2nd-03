// import React,{useEffect} from 'react';
import "./App.css";
import FirstPage from "./components/firstpage";
import SecondPage from "./components/secondpage";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import ImportWalletPage from "./pages/ImportWalletPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />
        <Route path="/import-with-seed-pharse" element={<ImportWalletPage />} />
      </Routes>
    </Router>
  );
}

export default App;
