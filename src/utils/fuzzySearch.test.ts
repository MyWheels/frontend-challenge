import { preparedResourcesMock } from '../mock/preparedResource.mock'
import fuzzySearch from './fuzzySearch' // adjust the import path

describe('fuzzySearch', () => {
  test('finds matching resources', () => {
    const query = 'volkswagen'
    const result = fuzzySearch(query, preparedResourcesMock)
    expect(result).toHaveLength(1)
    expect(result[0].brand).toBe('Volkswagen')
  })

  test('is case-insensitive', () => {
    const query = 'fOrD'
    const result = fuzzySearch(query, preparedResourcesMock)
    expect(result).toHaveLength(1)
    expect(result[0].brand).toBe('Ford')
  })

  test('handles non-matching query', () => {
    const query = 'Porsche'
    const result = fuzzySearch(query, preparedResourcesMock)
    expect(result).toHaveLength(0)
  })

  test('handles empty query', () => {
    const query = ''
    const result = fuzzySearch(query, preparedResourcesMock)
    expect(result).toHaveLength(preparedResourcesMock.length)
  })

  test('handles empty resource list', () => {
    const query = 'tesla'
    const result = fuzzySearch(query, [])
    expect(result).toHaveLength(0)
  })
})
