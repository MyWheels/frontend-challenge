import isEmpty from './isEmpty'

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })

  it('should return false for non-empty values', () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
  })
})
