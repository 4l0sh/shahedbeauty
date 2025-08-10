import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'
import Homepage from './homepage/homepage'
import Booking from './booking/booking'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {

  return (
    
       <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
 
  )
}

export default App
