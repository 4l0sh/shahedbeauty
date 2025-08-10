"use client"

import { useState } from "react"
import './navbar.css'

export default function Navbar({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button onClick={() => onNavigate("home")} className="navbar-logo">
          <div className="logo-icon">✨</div>
          <span className="logo-text">Luma Laser Clinic</span>
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
            📞 Call
          </a>
          <button
            onClick={() => onNavigate("booking")}
            className="book-btn"
          >
            Book Now
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
