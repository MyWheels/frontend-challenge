import slugify from './slugify'

describe('slugify', () => {
  it('converts string to slug format', () => {
    const result = slugify('Àmong Us')
    expect(result).toBe('among-us')
  })

  it('handles empty string', () => {
    const result = slugify('')
    expect(result).toBe('')
  })

  it('handles Karen so we know it can handle everything else', () => {
    const result = slugify('Kären')
    expect(result).toBe('karen')
  })

  it("handles Karen when the manager doesn't want to come", () => {
    const result = slugify('KAAAREN')
    expect(result).toBe('kaaaren')
  })

  it('handles special characters', () => {
    const result = slugify('Thïs Ïs Fïne')
    expect(result).toBe('this-is-fine')
  })

  it('handles multiple special characters in a row', () => {
    const result = slugify('òóöh nòóö')
    expect(result).toBe('oooh-nooo')
  })
})
