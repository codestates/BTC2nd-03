import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
              <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/*" element={<NotFound />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/picture"
            element={<PicturePage data="전달된 props" />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
