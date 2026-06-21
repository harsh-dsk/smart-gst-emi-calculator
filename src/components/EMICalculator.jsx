import React from 'react';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { formatCurrency } from '../utils/calculators';

/**
 * EMICalculator — card component for EMI calculation.
 */
function EMICalculator() {
  const { fields, errors, results, setField, calculate, reset } = useEMICalculator();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') calculate();
  };

  return (
    <div className="calculator-card calculator-card--emi" id="emi-calculator-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="card-header__icon card-header__icon--emi">🏦</div>
        <div>
          <h2 className="card-header__title">EMI Calculator</h2>
          <p className="card-header__subtitle">Equated Monthly Instalment</p>
        </div>
      </div>

      {/* Loan Amount */}
      <div className="form-group">
        <label className="form-label" htmlFor="emi-principal">
          Loan Amount<span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <span className="input-prefix" aria-hidden="true">₹</span>
          <input
            id="emi-principal"
            type="number"
            min="0"
            step="any"
            className={`form-input form-input--with-prefix${errors.principal ? ' form-input--error' : ''}`}
            placeholder="e.g. 500000"
            value={fields.principal}
            onChange={(e) => setField('principal', e.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={!!errors.principal}
            aria-describedby={errors.principal ? 'emi-principal-error' : undefined}
          />
        </div>
        {errors.principal && (
          <p id="emi-principal-error" className="form-error" role="alert">
            ⚠ {errors.principal}
          </p>
        )}
      </div>

      {/* Annual Interest Rate */}
      <div className="form-group">
        <label className="form-label" htmlFor="emi-rate">
          Annual Interest Rate (%)<span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <span className="input-prefix" aria-hidden="true">%</span>
          <input
            id="emi-rate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            className={`form-input form-input--with-prefix${errors.annualRate ? ' form-input--error' : ''}`}
            placeholder="e.g. 8.5"
            value={fields.annualRate}
            onChange={(e) => setField('annualRate', e.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={!!errors.annualRate}
            aria-describedby={errors.annualRate ? 'emi-rate-error' : undefined}
          />
        </div>
        {errors.annualRate && (
          <p id="emi-rate-error" className="form-error" role="alert">
            ⚠ {errors.annualRate}
          </p>
        )}
      </div>

      {/* Tenure */}
      <div className="form-group">
        <label className="form-label" htmlFor="emi-tenure">
          Tenure (Months)<span className="required">*</span>
        </label>
        <input
          id="emi-tenure"
          type="number"
          min="1"
          max="600"
          step="1"
          className={`form-input${errors.tenureMonths ? ' form-input--error' : ''}`}
          placeholder="e.g. 60"
          value={fields.tenureMonths}
          onChange={(e) => setField('tenureMonths', e.target.value)}
          onKeyDown={handleKeyDown}
          aria-invalid={!!errors.tenureMonths}
          aria-describedby={errors.tenureMonths ? 'emi-tenure-error' : undefined}
        />
        {errors.tenureMonths && (
          <p id="emi-tenure-error" className="form-error" role="alert">
            ⚠ {errors.tenureMonths}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="btn-row">
        <button
          id="emi-calculate-btn"
          type="button"
          className="btn btn--emi"
          onClick={calculate}
        >
          ✦ Calculate EMI
        </button>
        <button
          id="emi-reset-btn"
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
            <div className="result-item result-item--highlight-emi">
              <span className="result-label">Monthly EMI</span>
              <span className="result-value">{formatCurrency(results.emi)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Principal Amount</span>
              <span className="result-value">{formatCurrency(results.principal)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Interest Payable</span>
              <span className="result-value">{formatCurrency(results.totalInterest)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Payment Amount</span>
              <span className="result-value">{formatCurrency(results.totalPayment)}</span>
            </div>
          </div>

          {/* Breakdown Bar */}
          <div className="breakdown-bar" aria-label="Payment breakdown chart">
            <p className="breakdown-bar__title">Payment Breakdown</p>
            <div className="breakdown-bar__track" role="img" aria-label={`Principal ${results.principalPercent.toFixed(1)}%, Interest ${results.interestPercent.toFixed(1)}%`}>
              <div
                className="breakdown-bar__principal"
                style={{ width: `${results.principalPercent}%` }}
              />
              <div
                className="breakdown-bar__interest"
                style={{ width: `${results.interestPercent}%` }}
              />
            </div>
            <div className="breakdown-bar__legend">
              <span className="legend-item">
                <span className="legend-dot legend-dot--principal" />
                Principal ({results.principalPercent.toFixed(1)}%)
              </span>
              <span className="legend-item">
                <span className="legend-dot legend-dot--interest" />
                Interest ({results.interestPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EMICalculator;
