/**
 * formatCurrency — formats a number in Indian Rupee notation
 * e.g., 1234567.89 → "₹12,34,567.89"
 *
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatCurrency(value, decimals = 2) {
  if (isNaN(value) || value === null || value === undefined) return '₹0.00';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * parsePositiveNumber — parses a string to a positive finite number, or null if invalid.
 *
 * @param {string} str
 * @returns {number|null}
 */
export function parsePositiveNumber(str) {
  const n = parseFloat(str);
  if (isNaN(n) || !isFinite(n) || n < 0) return null;
  return n;
}

/**
 * calculateGST — given base amount and GST rate, returns gstAmount and totalAmount.
 *
 * @param {number} baseAmount
 * @param {number} gstRate  (e.g., 18 for 18%)
 * @returns {{ gstAmount: number, totalAmount: number }}
 */
export function calculateGST(baseAmount, gstRate) {
  const gstAmount = (baseAmount * gstRate) / 100;
  const totalAmount = baseAmount + gstAmount;
  return { gstAmount, totalAmount };
}

/**
 * reverseGST — given GST-inclusive amount and GST rate, reverse-calculates base & GST.
 *
 * @param {number} totalAmount
 * @param {number} gstRate
 * @returns {{ baseAmount: number, gstAmount: number }}
 */
export function reverseGST(totalAmount, gstRate) {
  const baseAmount = (totalAmount * 100) / (100 + gstRate);
  const gstAmount = totalAmount - baseAmount;
  return { baseAmount, gstAmount };
}

/**
 * calculateEMI — standard EMI formula: P × r × (1+r)^n / ((1+r)^n − 1)
 *
 * @param {number} principal   Loan amount
 * @param {number} annualRate  Annual interest rate (%)
 * @param {number} tenureMonths
 * @returns {{ emi: number, totalPayment: number, totalInterest: number }}
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  if (annualRate === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalPayment: principal, totalInterest: 0 };
  }

  const monthlyRate = annualRate / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}
