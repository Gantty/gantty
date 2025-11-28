import { ValidationError } from '@/lib/gantt-chart/usecase/errors';
import { parseISODate } from './date';

/**
 * Validate that a date range is valid (endDate >= startDate)
 * @param startDate - Start date (ISO string)
 * @param endDate - End date (ISO string)
 * @throws ValidationError if endDate < startDate
 */
export function validateDateRange(startDate: string, endDate: string): void {
  try {
    const start = parseISODate(startDate);
    const end = parseISODate(endDate);
    
    if (end < start) {
      throw new ValidationError(
        'End date must be greater than or equal to start date',
        'endDate',
        'dateRange'
      );
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError(
      'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)',
      'date',
      'format'
    );
  }
}

/**
 * Validate that a hex color is valid (#RRGGBB format)
 * @param color - Hex color string
 * @throws ValidationError if color is invalid
 */
export function validateHexColor(color: string): void {
  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
  if (!hexColorRegex.test(color)) {
    throw new ValidationError(
      'Color must be a valid hex color in format #RRGGBB',
      'color',
      'hexFormat'
    );
  }
}

/**
 * Validate that a string is not empty (not just whitespace)
 * @param value - String to validate
 * @param fieldName - Name of the field being validated
 * @throws ValidationError if string is empty or whitespace only
 */
export function validateNonEmpty(value: string, fieldName: string): void {
  if (!value || value.trim().length === 0) {
    throw new ValidationError(
      `${fieldName} cannot be empty`,
      fieldName,
      'nonEmpty'
    );
  }
}

/**
 * Validate that a string length is within bounds
 * @param value - String to validate
 * @param fieldName - Name of the field being validated
 * @param min - Minimum length (inclusive)
 * @param max - Maximum length (inclusive)
 * @throws ValidationError if length is out of bounds
 */
export function validateLength(
  value: string,
  fieldName: string,
  min: number,
  max: number
): void {
  const length = value.length;
  if (length < min || length > max) {
    throw new ValidationError(
      `${fieldName} must be between ${min} and ${max} characters (current: ${length})`,
      fieldName,
      'length'
    );
  }
}

/**
 * Validate that a date string is in valid ISO 8601 format
 * @param dateString - Date string to validate
 * @param fieldName - Name of the field being validated
 * @throws ValidationError if date format is invalid
 */
export function validateISODate(dateString: string, fieldName: string): void {
  try {
    parseISODate(dateString);
  } catch {
    throw new ValidationError(
      `${fieldName} must be a valid ISO 8601 date (YYYY-MM-DD)`,
      fieldName,
      'isoFormat'
    );
  }
}

/**
 * Validate that a value is a positive number
 * @param value - Number to validate
 * @param fieldName - Name of the field being validated
 * @throws ValidationError if value is not a positive number
 */
export function validatePositiveNumber(value: number, fieldName: string): void {
  if (typeof value !== 'number' || value < 0 || !isFinite(value)) {
    throw new ValidationError(
      `${fieldName} must be a positive number`,
      fieldName,
      'positiveNumber'
    );
  }
}
