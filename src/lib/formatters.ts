/**
 * Format a number or string to currency format
 */
export function formatCurrency(value: string | number): string {
  // Handle empty values
  if (value === '' || value === undefined || value === null) return 'R$ 0,00'

  // Convert to number if it's a string
  const numberValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'))
      : value

  // Check if it's a valid number
  if (isNaN(numberValue)) return 'R$ 0,00'

  // Format the number as currency
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue)
}

/**
 * Format a date to a readable format
 */
export function formatDate(date: Date | string): string {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? new Date(date) : date
  // Adjust for timezone offset
  const adjustedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(adjustedDate)
}

/**
 * Format input as Brazilian currency mask for form inputs
 * @param value The raw input value
 * @param isDecimal Whether the value is already in decimal format (not cents)
 * @returns Formatted currency string (e.g., "R$ 1.234,56")
 */
export function formatAsBrazilianCurrency(
  value: string | number,
  isDecimal = false,
): string {
  // Handle empty values
  if (value === '' || value === undefined || value === null) return ''

  if (typeof value === 'number') {
    // For numeric values, assume it's already in decimal format
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }

  // For string input from user typing
  const numericValue = value.replace(/\D/g, '')

  if (numericValue === '') return ''

  // Convert to a number
  const valueAsNumber = parseInt(numericValue, 10) || 0

  // If isDecimal is true, the value is already in decimal format
  // If not, it's in cents and needs to be divided by 100
  const finalValue = isDecimal ? valueAsNumber : valueAsNumber / 100

  // Format as Brazilian currency (R$ 1.234,56)
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(finalValue)
}

/**
 * Extract numeric value from a formatted currency string
 * @param formattedValue The formatted currency string
 * @returns The numeric value as a string
 */
export function extractNumericValueFromCurrency(
  formattedValue: string,
): string {
  // Extract just the numeric value from the formatted string
  const numericString = formattedValue.replace(/\D/g, '')
  return (parseFloat(numericString) / 100 || 0).toString()
}
