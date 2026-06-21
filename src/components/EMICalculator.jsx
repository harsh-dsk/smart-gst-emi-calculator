import React from 'react';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { formatCurrency } from '../utils/calculators';

/* ── SVG Icons ─────────────────────────────────────────────── */
const BankIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <line x1="3" y1="22" x2="21" y2="22"/>
    <line x1="6" y1="18" x2="6" y2="11"/>
    <line x1="10" y1="18" x2="10" y2="11"/>
    <line x1="14" y1="18" x2="14" y2="11"/>
    <line x1="18" y1="18" x2="18" y2="11"/>
    <polygon points="12 2 20 7 4 7"/>
  </svg>
);

const PercentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    aria-hidden="true">
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

const AlertIcon = () => (
  <svg className="field__error-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);

/**
 * EMICalculator — professional fintech card component.
 * All calculation logic lives in useEMICalculator hook (unchanged).
 */
function EMICalculator() {
  const { fields, errors, results, setField, calculate, reset } = useEMICalculator();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') calculate();
  };

  return (
    <div className="calc-card" id="emi-calculator-card">

      {/* ── Card Header ──────────────────────────────────── */}
      <div className="calc-card__header">
        <div className="calc-card__icon calc-card__icon--teal">
          <BankIcon />
        </div>
        <div className="calc-card__header-text">
          <h2 className="calc-card__title">EMI Calculator</h2>
          <p className="calc-card__subtitle">Equated Monthly Instalment</p>
        </div>
        <span className="calc-card__tag">Standard Formula</span>
      </div>

      {/* ── Card Body ────────────────────────────────────── */}
      <div className="calc-card__body">

        {/* Loan Amount */}
        <div className="field">
          <label className="field__label" htmlFor="emi-principal">
            Loan Amount
            <span className="field__req" aria-hidden="true">*</span>
          </label>
          <div className="field__input-wrap">
            <span className="field__addon" aria-hidden="true">₹</span>
            <input
              id="emi-principal"
              type="number"
              min="0"
              step="any"
              className={`field__input field__input--prefixed${errors.principal ? ' field__input--error' : ''}`}
              placeholder="e.g. 500000"
              value={fields.principal}
              onChange={(e) => setField('principal', e.target.value)}
              onKeyDown={handleKeyDown}
              aria-invalid={!!errors.principal}
              aria-describedby={errors.principal ? 'emi-principal-error' : undefined}
            />
          </div>
          {errors.principal && (
            <p id="emi-principal-error" className="field__error" role="alert">
              <AlertIcon />
              {errors.principal}
            </p>
          )}
        </div>

        {/* Annual Interest Rate */}
        <div className="field">
          <label className="field__label" htmlFor="emi-rate">
            Annual Interest Rate
            <span className="field__req" aria-hidden="true">*</span>
          </label>
          <div className="field__input-wrap">
            <span className="field__addon" aria-hidden="true">
              <PercentIcon />
            </span>
            <input
              id="emi-rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              className={`field__input field__input--prefixed${errors.annualRate ? ' field__input--error' : ''}`}
              placeholder="e.g. 8.5"
              value={fields.annualRate}
              onChange={(e) => setField('annualRate', e.target.value)}
              onKeyDown={handleKeyDown}
              aria-invalid={!!errors.annualRate}
              aria-describedby={errors.annualRate ? 'emi-rate-error' : undefined}
            />
          </div>
          {errors.annualRate && (
            <p id="emi-rate-error" className="field__error" role="alert">
              <AlertIcon />
              {errors.annualRate}
            </p>
          )}
        </div>

        {/* Tenure */}
        <div className="field">
          <label className="field__label" htmlFor="emi-tenure">
            Loan Tenure (Months)
            <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id="emi-tenure"
            type="number"
            min="1"
            max="600"
            step="1"
            className={`field__input${errors.tenureMonths ? ' field__input--error' : ''}`}
            placeholder="e.g. 60  (= 5 years)"
            value={fields.tenureMonths}
            onChange={(e) => setField('tenureMonths', e.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={!!errors.tenureMonths}
            aria-describedby={errors.tenureMonths ? 'emi-tenure-error' : undefined}
          />
          {errors.tenureMonths && (
            <p id="emi-tenure-error" className="field__error" role="alert">
              <AlertIcon />
              {errors.tenureMonths}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="calc-actions">
          <button
            id="emi-calculate-btn"
            type="button"
            className="btn btn--primary-teal"
            onClick={calculate}
          >
            Calculate EMI
          </button>
          <button
            id="emi-reset-btn"
            type="button"
            className="btn btn--ghost"
            onClick={reset}
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="results" aria-live="polite" aria-label="EMI calculation results">
            <div className="results__header">
              <span className="results__label">Calculation Results</span>
              <span className="results__badge">✓ Calculated</span>
            </div>

            {/* Monthly EMI — primary highlight */}
            <div className="result-row result-row--teal">
              <span className="result-label">Monthly EMI</span>
              <span className="result-value result-value--teal">
                {formatCurrency(results.emi)}
              </span>
            </div>

            {/* Principal */}
            <div className="result-row">
              <span className="result-label">Principal Amount</span>
              <span className="result-value">{formatCurrency(results.principal)}</span>
            </div>

            {/* Total Interest */}
            <div className="result-row">
              <span className="result-label">Total Interest Payable</span>
              <span className="result-value result-value--warn">
                {formatCurrency(results.totalInterest)}
              </span>
            </div>

            {/* Total Payment */}
            <div className="result-row">
              <span className="result-label">Total Payment (P + I)</span>
              <span className="result-value">{formatCurrency(results.totalPayment)}</span>
            </div>

            {/* Payment breakdown bar */}
            <div className="breakdown" aria-label="Payment breakdown">
              <p className="breakdown__label">Payment Breakdown</p>
              <div
                className="breakdown__bar"
                role="img"
                aria-label={`Principal ${results.principalPercent.toFixed(1)}%, Interest ${results.interestPercent.toFixed(1)}%`}
              >
                <div
                  className="breakdown__principal"
                  style={{ width: `${results.principalPercent}%` }}
                />
                <div
                  className="breakdown__interest"
                  style={{ width: `${results.interestPercent}%` }}
                />
              </div>
              <div className="breakdown__legend">
                <span className="legend-item">
                  <span className="legend-dot legend-dot--principal" aria-hidden="true" />
                  Principal&nbsp;({results.principalPercent.toFixed(1)}%)
                </span>
                <span className="legend-item">
                  <span className="legend-dot legend-dot--interest" aria-hidden="true" />
                  Interest&nbsp;({results.interestPercent.toFixed(1)}%)
                </span>
              </div>
            </div>

          </div>
        )}

      </div>{/* /calc-card__body */}
    </div>
  );
}

export default EMICalculator;
