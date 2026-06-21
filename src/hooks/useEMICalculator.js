import { useState, useCallback } from 'react';
import { calculateEMI, parsePositiveNumber } from '../utils/calculators';

const INITIAL_STATE = {
  principal: '',
  annualRate: '',
  tenureMonths: '',
};

const INITIAL_ERRORS = {
  principal: '',
  annualRate: '',
  tenureMonths: '',
};

/**
 * useEMICalculator — manages all state and logic for the EMI calculator.
 */
export function useEMICalculator() {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [results, setResults] = useState(null);

  const setField = useCallback((name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setResults(null);
  }, []);

  const validate = useCallback(() => {
    const newErrors = { principal: '', annualRate: '', tenureMonths: '' };
    let valid = true;

    // Validate principal
    if (fields.principal === '') {
      newErrors.principal = 'Please enter a loan amount.';
      valid = false;
    } else {
      const p = parsePositiveNumber(fields.principal);
      if (p === null || p <= 0) {
        newErrors.principal = 'Loan amount must be a positive number.';
        valid = false;
      }
    }

    // Validate annual rate
    if (fields.annualRate === '') {
      newErrors.annualRate = 'Please enter an interest rate.';
      valid = false;
    } else {
      const r = parsePositiveNumber(fields.annualRate);
      if (r === null || r < 0) {
        newErrors.annualRate = 'Interest rate must be 0 or greater.';
        valid = false;
      } else if (r > 100) {
        newErrors.annualRate = 'Interest rate seems too high (max 100%).';
        valid = false;
      }
    }

    // Validate tenure
    if (fields.tenureMonths === '') {
      newErrors.tenureMonths = 'Please enter the tenure.';
      valid = false;
    } else {
      const t = parseInt(fields.tenureMonths, 10);
      if (isNaN(t) || t <= 0) {
        newErrors.tenureMonths = 'Tenure must be at least 1 month.';
        valid = false;
      } else if (t > 600) {
        newErrors.tenureMonths = 'Tenure cannot exceed 600 months (50 years).';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  }, [fields]);

  const calculate = useCallback(() => {
    if (!validate()) return;

    const principal = parseFloat(fields.principal);
    const annualRate = parseFloat(fields.annualRate);
    const tenureMonths = parseInt(fields.tenureMonths, 10);

    const { emi, totalPayment, totalInterest } = calculateEMI(
      principal,
      annualRate,
      tenureMonths
    );

    const principalPercent = (principal / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    setResults({
      emi,
      totalPayment,
      totalInterest,
      principal,
      annualRate,
      tenureMonths,
      principalPercent,
      interestPercent,
    });
  }, [fields, validate]);

  const reset = useCallback(() => {
    setFields(INITIAL_STATE);
    setErrors(INITIAL_ERRORS);
    setResults(null);
  }, []);

  return { fields, errors, results, setField, calculate, reset };
}
