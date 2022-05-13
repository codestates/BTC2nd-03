import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./scan/MainPage";
import TxnHashPage from "./scan/TxnHashPage";
import BlockPage from "./scan/BlockPage";
import Container from "./scan/Container";

function App() {
  return (
    <Router>
      <Container />
      <Routes>
        <Route path="/*">
          <Route index element={<MainPage />} />
          <Route path="txnhash" element={<TxnHashPage />} />
          <Route path="block" element={<BlockPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
