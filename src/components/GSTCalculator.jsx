import React from 'react';
import { useGSTCalculator, GST_RATES, GST_MODE } from '../hooks/useGSTCalculator';
import { formatCurrency } from '../utils/calculators';

/**
 * GSTCalculator — card component for the GST calculator.
 */
function GSTCalculator() {
  const { fields, errors, results, setField, calculate, reset } = useGSTCalculator();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') calculate();
  };

  return (
    <div className="calculator-card calculator-card--gst" id="gst-calculator-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="card-header__icon card-header__icon--gst">🧾</div>
        <div>
          <h2 className="card-header__title">GST Calculator</h2>
          <p className="card-header__subtitle">Goods &amp; Services Tax</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="mode-toggle" role="group" aria-label="GST calculation mode">
        <button
          id="gst-mode-exclusive"
          type="button"
          className={`mode-toggle__btn${fields.mode === GST_MODE.EXCLUSIVE ? ' mode-toggle__btn--active' : ''}`}
          onClick={() => setField('mode', GST_MODE.EXCLUSIVE)}
          aria-pressed={fields.mode === GST_MODE.EXCLUSIVE}
        >
          Add GST to Amount
        </button>
        <button
          id="gst-mode-inclusive"
          type="button"
          className={`mode-toggle__btn${fields.mode === GST_MODE.INCLUSIVE ? ' mode-toggle__btn--active' : ''}`}
          onClick={() => setField('mode', GST_MODE.INCLUSIVE)}
          aria-pressed={fields.mode === GST_MODE.INCLUSIVE}
        >
          Extract GST from Total
        </button>
      </div>

      {/* Amount Field */}
      <div className="form-group">
        <label className="form-label" htmlFor="gst-amount">
          {fields.mode === GST_MODE.EXCLUSIVE ? 'Base Amount' : 'GST-Inclusive Amount'}
          <span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <span className="input-prefix" aria-hidden="true">₹</span>
          <input
            id="gst-amount"
            type="number"
            min="0"
            step="any"
            className={`form-input form-input--with-prefix${errors.amount ? ' form-input--error' : ''}`}
            placeholder="e.g. 10000"
            value={fields.amount}
            onChange={(e) => setField('amount', e.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? 'gst-amount-error' : undefined}
          />
        </div>
        {errors.amount && (
          <p id="gst-amount-error" className="form-error" role="alert">
            ⚠ {errors.amount}
          </p>
        )}
      </div>

      {/* GST Rate Field */}
      <div className="form-group">
        <label className="form-label" htmlFor="gst-rate">GST Rate</label>
        <select
          id="gst-rate"
          className="form-select"
          value={fields.gstRate}
          onChange={(e) => setField('gstRate', Number(e.target.value))}
        >
          {GST_RATES.map((rate) => (
            <option key={rate} value={rate}>
              {rate}% GST
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="btn-row">
        <button
          id="gst-calculate-btn"
          type="button"
          className="btn btn--gst"
          onClick={calculate}
        >
          ✦ Calculate GST
        </button>
        <button
          id="gst-reset-btn"
          type="button"
          className="btn btn--reset"
          onClick={reset}
        >
          ↺ Reset
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="results-section" aria-live="polite">
          <p className="results-title">Results</p>
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">{results.baseLabel}</span>
              <span className="result-value">{formatCurrency(results.baseAmount)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">GST Amount ({results.gstRate}%)</span>
              <span className="result-value">{formatCurrency(results.gstAmount)}</span>
            </div>
            <div className="result-item result-item--highlight-gst">
              <span className="result-label">{results.totalLabel}</span>
              <span className="result-value">{formatCurrency(results.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GSTCalculator;
