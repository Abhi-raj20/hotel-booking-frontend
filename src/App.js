import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Hotels from "./pages/Hotels";
import WebCheckIn from "./pages/WebCheckIn";


function App() {
  
  return (
    
    <Router>
      <Routes>
      
        <Route path="/" element={<Auth isRegister={false} />} />
        <Route path="/register" element={<Auth isRegister={true} />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/checkin" element={<WebCheckIn />} />
    
      </Routes>
    </Router>
    
  );
}

export default App;
