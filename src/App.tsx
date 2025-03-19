import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup"
import Home from "./pages/Home";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        
      </Routes>
    </Router>
    
  )
}

export default App
