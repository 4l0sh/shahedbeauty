"use client"

import { useState } from "react"
import './homepage.css'
import Device from './../Photos/device.png'
import HederDevice from '../Photos/headerDevice.png'
import Before1 from '../Photos/before-1.png'
import After1 from '../Photos/after-1.png'

export default function Homepage({ onNavigate }) {
  return (
    <main>
      <HeroSection onNavigate={onNavigate} />
      <TechnologySection />
      <PackagesSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

function HeroSection({ onNavigate }) {
  return (
    <section className="hero-section">
      <img
        src={HederDevice}
        alt="Advanced laser hair removal machine"
        className="hero-bg-image"
      />

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          Neem zo snel mogelijk contact met ons op en ervaar de uitlime kracht van onze ICONIC Diamond Diode Laser 2024 en bereik buitengewone resultaten.
        </h1>
        <p className="hero-subtitle">
          We werken met alle zorgverzekeraars.
        </p>

        <div className="hero-buttons">
          <a href="#packages" className="hero-btn-white">
            Bekijk onze pakketten
          </a>
            <button
            onClick={() => onNavigate("booking")}
            className="hero-btn-emerald"
          >
            <p className="btnText">Boek Nu</p>
             <i className="appoinmentButton fa-solid fa-calendar-days"></i>
          </button>
        </div>

        <div className="hero-features">
          <div className="hero-feature">Pijnloos -24°!</div>
          <div className="hero-feature">6 tot 8 behandeling !</div>
          <div className="hero-feature">Snelle resultaten !</div>
          <div className="hero-feature"> U-pas Betaling Mogelijk</div>
        </div>
      </div>
    </section>
  )
}

function TechnologySection() {
  const features = [
    {
      icon: "🪶",
      title: "Comfort-First",
      text: "Advanced contact cooling maintains a comfortable skin surface throughout treatment.",
    },
    {
      icon: "⏱️",
      title: "Faster Sessions",
      text: "High repetition rates and large spot size reduce total session time.",
    },
    {
      icon: "☀️",
      title: "All Skin Tones",
      text: "Dual-wavelength technology tuned for safe, effective results across Fitzpatrick I–VI.",
    },
    {
      icon: "🛡️",
      title: "Precision + Safety",
      text: "Smart energy delivery with integrated skin contact sensors for consistent outcomes.",
    },
  ]

  return (
    <section id="technology" className="tech-section">
      <div className="tech-header">
        <h1 className="tech-title">
          Diamond Diode Laser 2024
        </h1>
        <h2 className="tech-title">
          De krachtigste Diode laser nu op de markt voor een perfect glad lichaam.
          
        </h2>
        <p className="tech-subtitle">
          Onze diode laser is hier in Nederland ontwerpt bij Beauty Business Holland.
        </p>
      </div>

      <div className="tech-content">
        <div className="tech-image">
          <img
            src={Device}
            alt="Close-up of the AstraPulse Pro 9000"
            className="tech-img"
          />
        </div>

        <div className="tech-features">
          {features.map((feature, index) => (
            <div key={index} className="tech-feature">
              <div className="tech-feature-content">
                <div className="tech-feature-icon">{feature.icon}</div>
                <div>
                  <h3 className="tech-feature-title">{feature.title}</h3>
                  <p className="tech-feature-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PackagesSection({ onNavigate }) {
  const packages = [
    {
      id: "single",
      name: "Single Session",
      price: "$89",
      description: "Ideal for touch-ups or small areas.",
      features: ["Quick 15–30 min visit", "Any one area", "Pay-as-you-go"],
      icon: "✨",
    },
    {
      id: "full-body",
      name: "Full-Body Bundle",
      price: "$299",
      description: "Head-to-toe smooth in one efficient visit.",
      features: ["Multiple areas in one session", "Priority booking", "Best value"],
      icon: "📦",
    },
    {
      id: "subscription",
      name: "6-Month Plan",
      price: "$79/mo",
      description: "Monthly visits for consistent long-term results.",
      features: ["1 session per month", "Flexible areas", "Cancel anytime"],
      icon: "✅",
    },
  ]

  return (
    <section id="packages" className="packages-section">
      <div className="packages-header">
        <h2 className="packages-title">Packages</h2>
        <p className="packages-subtitle">
          Choose the plan that fits your goals. All treatments are performed with our newest-generation device.
        </p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <div className="package-badge">
              <span className="package-badge-icon">{pkg.icon}</span>
              <span className="package-badge-text">{pkg.name}</span>
            </div>
            <div className="package-price">{pkg.price}</div>
            <p className="package-description">{pkg.description}</p>

            <ul className="package-features">
              {pkg.features.map((feature, index) => (
                <li key={index} className="package-feature">
                  <span className="package-feature-dot"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="package-buttons">
              <button
                onClick={() => onNavigate("booking")}
                className="package-btn-primary"
              >
                Book {pkg.name}
              </button>
              <a
                href="#contact"
                className="package-btn-secondary"
              >
                Ask Question
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [sliderPos, setSliderPos] = useState(50)

  const reviews = [
    {
      name: "Naeema Saeed",
      rating: 5,
      text: "Geïntegreerde en geweldige diensten en het personeel is erg geweldig",
    },
    {
      name: "Jaspreet K.",
      rating: 5,
      text: "Safe on my skin tone and super efficient. The cooling makes a big difference!",
    },
    { name: "Daniel R.", rating: 4, text: "I tried full-body bundle — saved time and money. Highly recommend." },
  ]

  return (
    <section id="results" className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">Testimonials & Results</h2>
        <p className="testimonials-subtitle">Real clients. Real outcomes. Slide to compare before and after.</p>
      </div>

      <div className="before-after-grid">
        <BeforeAfterCard area="Legs" />
        <BeforeAfterCard area="Arms" />
      </div>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? "text-amber-400" : "text-gray-300"}>
                  ⭐
                </span>
              ))}
            </div>
            <p className="review-text">"{review.text}"</p>
            <div className="review-author">{review.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BeforeAfterCard({ area }) {
  const [pos, setPos] = useState(50)

  return (
    <div className="before-after-card">
      <div className="before-after-header">
        <div className="before-after-area">{area}</div>
        <div className="before-after-instruction">Drag the slider to compare</div>
      </div>
      <div className="before-after-container">
        <img
          src={Before1}
          alt={`Before ${area}`}
          className="before-after-image"
        />
        <div className="before-after-overlay" style={{ width: `${pos}%` }}>
          <img
            src={After1}
            alt={`After ${area}`}
            className="before-after-image"
          />
        </div>
        <div className="before-after-slider-line" style={{ left: `${pos}%` }}>
          <div className="before-after-slider-handle">
            <div className="before-after-slider-dot"></div>
          </div>
        </div>
      </div>
      <input
        className="before-after-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSent(true)
      setLoading(false)
      setFormData({ name: "", email: "", message: "" })
    }, 1000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <h2 className="contact-title">Contact & Location</h2>
        <p className="contact-subtitle">Questions? We're here to help.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-map-container">
          <iframe
            className="contact-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.458118562067!2d5.108766957440494!3d52.11571405743694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66fe2ff6abb07%3A0xe61167635102f9dd!2sShahed%20Beauty!5e0!3m2!1sen!2snl!4v1755037367359!5m2!1sen!2snl"
            title="Clinic location"
          />
          <div className="contact-info">
            <div className="contact-clinic-name">Shahed Beauty</div>
            <div>Zamenhofdreef 4, 3562 JW</div>
            <div>Utrecht, Nederland</div>
            <div className="contact-actions">
              <a href="tel:+31 6 85235657" className="contact-action-btn">
                📞 Call
              </a>
              <a href="https://wa.me/31686116982" className="contact-action-btn">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <label className="contact-form-label">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="contact-form-input"
              required
            />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="contact-form-input"
              required
            />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="contact-form-textarea"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="contact-form-submit"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {sent && <div className="contact-form-success">Thanks! We'll reply shortly.</div>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>© {new Date().getFullYear()} Luma Laser Clinic</div>
        <nav className="footer-nav">
          <a href="#packages" className="footer-link">
            Packages
          </a>
          <a href="#contact" className="footer-link">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
