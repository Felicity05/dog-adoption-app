import './App.css'
import { LoginPage } from './Pages/LoginPage.tsx'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import {LandingPage} from "./Pages/LandingPage.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dinger" element={<LandingPage />} />
          </Routes>
      </Router>
  )
}

export default App
