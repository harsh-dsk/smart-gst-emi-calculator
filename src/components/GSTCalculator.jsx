import React from 'react';
import { useGSTCalculator, GST_RATES, GST_MODE } from '../hooks/useGSTCalculator';
import { formatCurrency } from '../utils/calculators';

/* ── SVG Icons ─────────────────────────────────────────────── */
const ReceiptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/>
    <line x1="8" y1="8" x2="16" y2="8"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="8" y1="16" x2="12" y2="16"/>
  </svg>
);

const AlertIcon = () => (
  <svg className="field__error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);

/* GST rate descriptions for professional dropdown labels */
const GST_RATE_LABELS = {
  5:  'Essential Goods & Services',
  12: 'Standard Goods',
  18: 'Standard Services',
  28: 'Luxury & Demerit Goods',
};

/**
 * GSTCalculator — professional fintech card component.
 * All calculation logic lives in useGSTCalculator hook (unchanged).
 */
function GSTCalculator() {
  const { fields, errors, results, setField, calculate, reset } = useGSTCalculator();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') calculate();
  };

  const isExclusive = fields.mode === GST_MODE.EXCLUSIVE;

  return (
    <div className="calc-card" id="gst-calculator-card">

      {/* ── Card Header ──────────────────────────────────── */}
      <div className="calc-card__header">
        <div className="calc-card__icon calc-card__icon--blue">
          <ReceiptIcon />
        </div>
        <div className="calc-card__header-text">
          <h2 className="calc-card__title">GST Calculator</h2>
          <p className="calc-card__subtitle">Goods &amp; Services Tax</p>
        </div>
        <span className="calc-card__tag">5% · 12% · 18% · 28%</span>
      </div>

      {/* ── Card Body ────────────────────────────────────── */}
      <div className="calc-card__body">

        {/* Mode toggle */}
        <div className="mode-tabs" role="group" aria-label="GST calculation mode">
          <button
            id="gst-mode-exclusive"
            type="button"
            className={`mode-tab${isExclusive ? ' mode-tab--active' : ''}`}
            onClick={() => setField('mode', GST_MODE.EXCLUSIVE)}
            aria-pressed={isExclusive}
          >
            Add GST to Amount
          </button>
          <button
            id="gst-mode-inclusive"
            type="button"
            className={`mode-tab${!isExclusive ? ' mode-tab--active' : ''}`}
            onClick={() => setField('mode', GST_MODE.INCLUSIVE)}
            aria-pressed={!isExclusive}
          >
            Extract GST from Total
          </button>
        </div>

        {/* Amount field */}
        <div className="field">
          <label className="field__label" htmlFor="gst-amount">
            {isExclusive ? 'Base Amount (Before GST)' : 'GST-Inclusive Total Amount'}
            <span className="field__req" aria-hidden="true">*</span>
          </label>
          <div className="field__input-wrap">
            <span className="field__addon" aria-hidden="true">₹</span>
            <input
              id="gst-amount"
              type="number"
              min="0"
              step="any"
              className={`field__input field__input--prefixed${errors.amount ? ' field__input--error' : ''}`}
              placeholder="e.g. 10000"
              value={fields.amount}
              onChange={(e) => setField('amount', e.target.value)}
              onKeyDown={handleKeyDown}
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? 'gst-amount-error' : undefined}
            />
          </div>
          {errors.amount && (
            <p id="gst-amount-error" className="field__error" role="alert">
              <AlertIcon />
              {errors.amount}
            </p>
          )}
        </div>

        {/* GST Rate field */}
        <div className="field">
          <label className="field__label" htmlFor="gst-rate">GST Rate</label>
          <select
            id="gst-rate"
            className="field__select"
            value={fields.gstRate}
            onChange={(e) => setField('gstRate', Number(e.target.value))}
          >
            {GST_RATES.map((rate) => (
              <option key={rate} value={rate}>
                {rate}% — {GST_RATE_LABELS[rate]}
              </option>
            ))}
          </select>
        </div>

        {/* Action buttons */}
        <div className="calc-actions">
          <button
            id="gst-calculate-btn"
            type="button"
            className="btn btn--primary"
            onClick={calculate}
          >
            Calculate GST
          </button>
          <button
            id="gst-reset-btn"
            type="button"
            className="btn btn--ghost"
            onClick={reset}
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="results" aria-live="polite" aria-label="GST calculation results">
            <div className="results__header">
              <span className="results__label">Calculation Results</span>
              <span className="results__badge">✓ Calculated</span>
            </div>

            {/* Base Amount */}
            <div className="result-row">
              <span className="result-label">{results.baseLabel}</span>
              <span className="result-value">{formatCurrency(results.baseAmount)}</span>
            </div>

            {/* GST Amount */}
            <div className="result-row">
              <span className="result-label">GST Amount ({results.gstRate}%)</span>
              <span className="result-value result-value--warn">
                {formatCurrency(results.gstAmount)}
              </span>
            </div>

            {/* Total — highlighted */}
            <div className="result-row result-row--blue">
              <span className="result-label">{results.totalLabel}</span>
              <span className="result-value result-value--blue">
                {formatCurrency(results.totalAmount)}
              </span>
            </div>
          </div>
        )}

      </div>{/* /calc-card__body */}
    </div>
  );
}

export default GSTCalculator;
