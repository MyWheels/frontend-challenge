import { PreparedResource } from '../types'

function isFuzzyMatch(query: string, text: string): boolean {
  query = query.toLowerCase()
  text = text.toLowerCase()
  let queryIndex = 0
  let textIndex = 0
  let mismatches = 0

  while (queryIndex < query.length && textIndex < text.length) {
    if (query[queryIndex] === text[textIndex]) {
      queryIndex++
    } else {
      mismatches++
      if (mismatches > 2) return false // adjust mismatch threshold here
    }
    textIndex++
  }

  return queryIndex === query.length
}

function fuzzySearch(
  query: string,
  resources: PreparedResource[],
): PreparedResource[] {
  if (!query) return resources

  return resources.filter((resource) => {
    const combined = [
      resource.brand,
      typeof resource.model === 'string' ? resource.model : '',
      resource.alias,
      resource.color,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return isFuzzyMatch(query.toLowerCase(), combined)
  })
}

export default fuzzySearch
