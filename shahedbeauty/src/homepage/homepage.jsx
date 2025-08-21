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
    icon: "🔍",
    title: "Hair & Skin Analyzer",
    text: "Geavanceerde analyse voor veilige en op maat gemaakte behandelingen.",
  },
    {
    icon: "⚡",
    title: "Extreme Kracht",
    text: "Met maar liefst 5000W vermogen voor razendsnelle en effectieve behandelingen.",
  },
   {
    icon: "🔇",
    title: "SuperSilent Technologie",
    text: "Krachtige prestaties met een fluisterstille motor voor meer comfort.",
  },
    {
    icon: "🎯",
    title: "Maximale Precisie",
    text: "Extra detailopzetstuk voor nauwkeurige behandelingen en perfecte resultaten.",
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
      id: "oks-bik-ben",
      name: "Oksel, bikini en onder benen",
      price: "€100",
      description: "Oksel, bikini en onderbenen behandeling",
      features: [
        "Oksel, bikini en onderbenen",
        "Pijnloos bij -24°C",
        "Snelle resultaten"
      ],
      icon: "🦵",
      isSpecial: false,
    },
    {
      id: "hele-lichaam",
      name: "Hele lichaam",
      price: "€199",
      description: "Volledig lichaam behandeling",
      features: [
        "Alle lichaamsdelen inbegrepen",
        "Pijnloos bij -24°C",
        "Gratis nabehandeling",
        "Speciale aanbieding!"
      ],
      icon: "💎",
      isSpecial: true,
    },
    {
      id: "oks-bik",
      name: "Oksel en bikini",
      price: "€75",
      description: "Oksel en bikini behandeling",
      features: [
        "Oksel en bikini",
        "Pijnloos bij -24°C",
        "Snelle resultaten"
      ],
      icon: "�",
      isSpecial: false,
    },
  ]

  return (
    <section id="packages" className="packages-section">
      <div className="packages-header">
        <h2 className="packages-title">Speciale Aanbieding</h2>
        <p className="packages-subtitle">
          Profiteer nu van onze exclusieve korting op onze volledig lichaam behandeling met de nieuwste Diamond Diode Laser technologie.
        </p>
      </div>

      <div className="packages-grid single-package">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`package-card ${pkg.isSpecial ? 'package-special' : ''}`}>
            <div className="package-badge">
              <span className="package-badge-icon">{pkg.icon}</span>
              <span className="package-badge-text">{pkg.name}</span>
            </div>
            <div className="package-pricing">
              <div className="package-price">{pkg.price}</div>
              {pkg.originalPrice && (
                <div className="package-original-price">{pkg.originalPrice}</div>
              )}
            </div>
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
                Boek Nu - {pkg.price}
              </button>
              <a
                href="#contact"
                className="package-btn-secondary"
              >
                Meer Informatie
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
        <h2 className="testimonials-title">Resultaten</h2>
        <p className="testimonials-subtitle">Echte klanten. Echte resultaten. Sleep om voor en na te vergelijken.</p>
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
    
    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending contact form:', error)
      alert('Er is een fout opgetreden. Probeer het opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <h2 className="contact-title">Contact & Locatie</h2>
        <p className="contact-subtitle">Vragen? We zijn hier om te helpen.</p>
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
            {loading ? "Verzenden..." : "Verzend Bericht"}
          </button>
          {sent && <div className="contact-form-success">
            Bedankt! We nemen snel contact met u op.<br/>
            <small>Controleer ook uw spam/ongewenste mail folder voor onze bevestiging.</small>
          </div>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>© {new Date().getFullYear()} Shahed Beauty</div>
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
