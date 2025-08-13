import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar'
import Homepage from './homepage/homepage'
import Booking from './booking/booking'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function AppContent() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route === "home") {
      navigate("/");
    } else if (route === "booking") {
      navigate("/booking");
    }
  };

  return (
    <div className="app">
      <Navbar onNavigate={handleNavigation} />
      <Routes>
        <Route path="/" element={<Homepage onNavigate={handleNavigation} />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
