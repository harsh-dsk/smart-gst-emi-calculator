import React from 'react';
import GSTCalculator from './components/GSTCalculator';
import EMICalculator from './components/EMICalculator';
import './index.css';

/* ── Inline SVG icons ─────────────────────────────────────── */
const ShieldCheckIcon = () => (
  <svg className="trust-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>
);

/* ── App ──────────────────────────────────────────────────── */
function App() {
  return (
    <div className="app">

      {/* ── Sticky Header ──────────────────────────────────── */}
      <header className="site-header">
        <div className="container site-header__inner">
          {/* Brand */}
          <div className="site-header__brand">
            <div className="brand-logo" aria-hidden="true">₹</div>
            <div className="brand-text">
              <span className="brand-name">Smart GST &amp; EMI</span>
              <span className="brand-tagline">Calculator Suite</span>
            </div>
          </div>

          {/* CTA — assignment requirement */}
          <a
            id="digital-heroes-btn"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn--heroes"
            aria-label="Built for Digital Heroes — visit digitalheroesco.com"
          >
            Built for Digital Heroes
          </a>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          {/* Badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Free · No Registration Required
          </div>

          {/* Heading */}
          <h1 className="hero__title" id="hero-heading">
            Calculate GST &amp; EMI<br />
            <span className="hero__title-accent">Instantly &amp; Accurately</span>
          </h1>

          {/* Subtitle */}
          <p className="hero__subtitle">
            Professional-grade financial calculators for Indian businesses,
            freelancers, and borrowers. GST-compliant and RBI-standard EMI formula.
          </p>

          {/* Trust indicators */}
          <div className="hero__trust" role="list" aria-label="Key features">
            <div className="trust-item" role="listitem">
              <ShieldCheckIcon />
              4 GST Tax Slabs
            </div>
            <div className="trust-sep" aria-hidden="true" />
            <div className="trust-item" role="listitem">
              <ShieldCheckIcon />
              ₹ Indian Rupee (INR)
            </div>
            <div className="trust-sep" aria-hidden="true" />
            <div className="trust-item" role="listitem">
              <ShieldCheckIcon />
              Standard EMI Formula
            </div>
            <div className="trust-sep" aria-hidden="true" />
            <div className="trust-item" role="listitem">
              <ShieldCheckIcon />
              Input Validation
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculators ────────────────────────────────────── */}
      <main className="main" id="calculators">
        <div className="container">
          <div className="calc-grid">
            <GSTCalculator />
            <EMICalculator />
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="container site-footer__inner">
          {/* Assignment requirement: name + email */}
          <div className="footer__attribution">
            <p className="footer__name">Harshdeep Singh Khanuja</p>
            <a
              href="mailto:harshdeepsingh.khanuja0102@gmail.com"
              className="footer__email"
            >
              harshdeepsingh.khanuja0102@gmail.com
            </a>
          </div>

          <div className="footer__right">
            <p className="footer__copy">
              © {new Date().getFullYear()} Smart GST &amp; EMI Calculator
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
