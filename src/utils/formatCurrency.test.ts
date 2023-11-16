import formatCurrency from './formatCurrency'

describe('formatCurrency', () => {
  it('should format positive amount with decimals and space', () => {
    const amount = 123.45
    const formatted = formatCurrency(amount)
    expect(formatted).toBe('€ 123,45')
  })

  it('should format negative amount without a space', () => {
    const amount = -678.9
    const formatted = formatCurrency(amount, {
      noSpace: true,
    })
    expect(formatted).toBe('-€678,90')
  })

  it('should format undefined amount with fallback value', () => {
    const amount = undefined
    const fallback = 'N/A'
    const formatted = formatCurrency(amount, { fallback })
    expect(formatted).toBe(fallback)
  })

  it('formats currency with default options', () => {
    const result = formatCurrency('0.13', { noSpace: true })
    expect(result).toBe('€0,13')
  })

  it('formats currency without space separator', () => {
    const result = formatCurrency('0.30', { noSpace: true })
    expect(result).toBe('€0,30')
  })

  it('formats currency without decimal places', () => {
    const result = formatCurrency('13.00', { noDecimals: true })
    expect(result).toBe('€ 13')
  })

  it('formats currency without decimal places if possible', () => {
    const result = formatCurrency('32.50', { noDecimals: true })
    expect(result).toBe('€ 32,50')
    const result2 = formatCurrency('32.00', { noDecimals: true })
    expect(result2).toBe('€ 32')
  })

  it('formats currency without space separator and decimal places', () => {
    const result = formatCurrency(12.69, {
      noSpace: true,
      noDecimals: true,
    })
    expect(result).toBe('€12,69')
  })

  it('handles undefined amount with fallback', () => {
    const result = formatCurrency(undefined, { fallback: 'N/A' })
    expect(result).toBe('N/A')
  })
})
