import React, { useState } from 'react';
import GSTCalculator from './components/GSTCalculator';
import EMICalculator from './components/EMICalculator';
import './index.css';

const TABS = {
  BOTH: 'both',
  GST: 'gst',
  EMI: 'emi',
};

function App() {
  const [activeTab, setActiveTab] = useState(TABS.BOTH);

  const showGST = activeTab === TABS.BOTH || activeTab === TABS.GST;
  const showEMI = activeTab === TABS.BOTH || activeTab === TABS.EMI;

  return (
    <div className="app-wrapper">
      {/* Animated background orbs */}
      <div className="app-bg" aria-hidden="true">
        <div className="app-bg__orb app-bg__orb--1" />
        <div className="app-bg__orb app-bg__orb--2" />
        <div className="app-bg__orb app-bg__orb--3" />
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="app-header__badge">
          <span className="app-header__badge-dot" />
          Financial Calculator Suite
        </div>
        <h1 className="app-header__title">Smart GST &amp; EMI Calculator</h1>
        <p className="app-header__subtitle">
          Instantly calculate Goods &amp; Services Tax and Equated Monthly Instalments — all in Indian Rupees.
        </p>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav" role="tablist" aria-label="Calculator selection">
        <button
          id="tab-both"
          role="tab"
          type="button"
          className={`tab-nav__btn tab-nav__btn--gst${activeTab === TABS.BOTH ? ' tab-nav__btn--active' : ''}`}
          aria-selected={activeTab === TABS.BOTH}
          onClick={() => setActiveTab(TABS.BOTH)}
        >
          <span className="tab-nav__icon">⚡</span>
          Both
        </button>
        <button
          id="tab-gst"
          role="tab"
          type="button"
          className={`tab-nav__btn tab-nav__btn--gst${activeTab === TABS.GST ? ' tab-nav__btn--active' : ''}`}
          aria-selected={activeTab === TABS.GST}
          onClick={() => setActiveTab(TABS.GST)}
        >
          <span className="tab-nav__icon">🧾</span>
          GST Only
        </button>
        <button
          id="tab-emi"
          role="tab"
          type="button"
          className={`tab-nav__btn tab-nav__btn--emi${activeTab === TABS.EMI ? ' tab-nav__btn--active' : ''}`}
          aria-selected={activeTab === TABS.EMI}
          onClick={() => setActiveTab(TABS.EMI)}
        >
          <span className="tab-nav__icon">🏦</span>
          EMI Only
        </button>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        <div
          className="calculator-grid"
          style={
            activeTab !== TABS.BOTH
              ? { gridTemplateColumns: '1fr', maxWidth: '560px', margin: '0 auto' }
              : undefined
          }
        >
          {showGST && <GSTCalculator />}
          {showEMI && <EMICalculator />}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-attribution">
          <p className="footer-attribution__name">Harshdeep Singh Khanuja</p>
          <a
            href="mailto:harshdeepsingh.khanuja0102@gmail.com"
            className="footer-attribution__email"
          >
            harshdeepsingh.khanuja0102@gmail.com
          </a>
        </div>
        <div>
          <a
            id="digital-heroes-btn"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn--heroes"
            aria-label="Built for Digital Heroes — visit digitalheroesco.com"
          >
            <span>🦸</span>
            Built for Digital Heroes
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
