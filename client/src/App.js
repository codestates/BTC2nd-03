// import React,{useEffect} from 'react';
import "./App.css";
import FirstPage from "./components/firstpage";
import SecondPage from "./components/secondpage";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import ImportWalletPage from "./pages/ImportWalletPage";
import WalletPage from "./pages/WalletPage";
import ThirdPage from "./components/thirdpage";
import FourthPage from "./components/fourthpage";
import InfoContextProvider from "./store/InfoContext";

function App() {
  return (
    <InfoContextProvider>
      <Router>
        <Routes>
          <Route path="/*">
            <Route index element={<FirstPage />} />
            <Route path="secondpage" element={<SecondPage />} />
            <Route path="import-with-seed-pharse" element={<ImportWalletPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="thirdpage" element={<ThirdPage />} />
            <Route path="fourthpage" element={<FourthPage />} />
          </Route>
        </Routes>
      </Router>
    </InfoContextProvider>
  );
}

export default App;
