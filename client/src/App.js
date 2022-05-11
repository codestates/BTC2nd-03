// import React,{useEffect} from 'react';
import "./App.css";
import WelcomePage from "./components/WelcomePage";
import SelectPage from "./components/SelectPage";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import ImportWalletPage from "./pages/ImportWalletPage";
import WalletPage from "./pages/WalletPage";
import CreateWalletPage from "./components/CreateWalletPage";
import ViewMnemonicPage from "./components/ViewMnemonicPage";
import InfoContextProvider from "./store/InfoContext";

function App() {
  return (
    <InfoContextProvider>
      <Router>
        <Routes>
          <Route path="/*">
            <Route index element={<WelcomePage />} />
            <Route path="selectpage" element={<SelectPage />} />
            <Route
              path="import-with-seed-pharse"
              element={<ImportWalletPage />}
            />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="createwalletpage" element={<CreateWalletPage />} />
            <Route path="viewmnemonicpage" element={<ViewMnemonicPage />} />
          </Route>
        </Routes>
      </Router>
    </InfoContextProvider>
  );
}

export default App;
