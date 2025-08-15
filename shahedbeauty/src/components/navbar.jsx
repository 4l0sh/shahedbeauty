"use client"

import { useState } from "react"
import Logo from '../assets/shlogo.png'
import './navbar.css'

export default function Navbar({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button onClick={() => onNavigate("home")} className="navbar-logo">
          <img className="logo-icon" src={Logo} alt="" />
          <span className="logo-text">Shahed Beauty</span>
        </button>

        <nav className="navbar-nav desktop-nav">
          <a href="#technology" className="nav-link">
            Technology
          </a>
          <a href="#packages" className="nav-link">
            Packages
          </a>
          <a href="#results" className="nav-link">
            Results
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>

        <div className="navbar-actions desktop-actions">
          <a
            href="tel:+1234567890"
            className="call-link"
          >
            📞 Bel
          </a>
          <button
            onClick={() => onNavigate("booking")}
            className="book-btn"
          >
            Boek Nu
          </button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <a href="#technology" className="mobile-nav-link">
              Technology
            </a>
            <a href="#packages" className="mobile-nav-link">
              Packages
            </a>
            <a href="#results" className="mobile-nav-link">
              Results
            </a>
            <a href="#contact" className="mobile-nav-link">
              Contact
            </a>
            <button
              onClick={() => onNavigate("booking")}
              className="mobile-book-btn"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
