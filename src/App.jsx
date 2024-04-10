import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";

import algorithms from "./data/algorithms";

function App() {
  return (
    <Router>
      <Navbar algorithms={algorithms} />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/:algorithmId" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
