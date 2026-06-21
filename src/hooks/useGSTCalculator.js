import { useState, useCallback } from 'react';
import {
  calculateGST,
  reverseGST,
  parsePositiveNumber,
  formatCurrency,
} from '../utils/calculators';

/** GST rate options available in the dropdown */
export const GST_RATES = [5, 12, 18, 28];

/** Calculation modes for the GST calculator */
export const GST_MODE = {
  EXCLUSIVE: 'exclusive', // Add GST to base amount
  INCLUSIVE: 'inclusive', // Extract GST from total amount
};

const INITIAL_STATE = {
  amount: '',
  gstRate: 18,
  mode: GST_MODE.EXCLUSIVE,
};

const INITIAL_ERRORS = {
  amount: '',
};

const INITIAL_RESULTS = null;

/**
 * useGSTCalculator — manages all state and logic for the GST calculator.
 */
export function useGSTCalculator() {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [results, setResults] = useState(INITIAL_RESULTS);

  const setField = useCallback((name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Clear results when inputs change
    setResults(null);
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors = { amount: '' };
    let valid = true;

    const amount = parsePositiveNumber(fields.amount);
    if (fields.amount === '') {
      newErrors.amount = 'Please enter an amount.';
      valid = false;
    } else if (amount === null) {
      newErrors.amount = 'Amount must be a positive number.';
      valid = false;
    } else if (amount <= 0) {
      newErrors.amount = 'Amount must be greater than zero.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [fields]);

  const calculate = useCallback(() => {
    if (!validate()) return;

    const amount = parseFloat(fields.amount);
    const rate = fields.gstRate;

    if (fields.mode === GST_MODE.EXCLUSIVE) {
      const { gstAmount, totalAmount } = calculateGST(amount, rate);
      setResults({
        mode: GST_MODE.EXCLUSIVE,
        inputAmount: amount,
        gstRate: rate,
        baseAmount: amount,
        gstAmount,
        totalAmount,
        baseLabel: 'Base Amount (Before GST)',
        totalLabel: 'Total Amount (After GST)',
      });
    } else {
      const { baseAmount, gstAmount } = reverseGST(amount, rate);
      setResults({
        mode: GST_MODE.INCLUSIVE,
        inputAmount: amount,
        gstRate: rate,
        baseAmount,
        gstAmount,
        totalAmount: amount,
        baseLabel: 'Base Amount (Extracted)',
        totalLabel: 'GST-Inclusive Amount',
      });
    }
  }, [fields, validate]);

  const reset = useCallback(() => {
    setFields(INITIAL_STATE);
    setErrors(INITIAL_ERRORS);
    setResults(INITIAL_RESULTS);
  }, []);

  return { fields, errors, results, setField, calculate, reset };
}
