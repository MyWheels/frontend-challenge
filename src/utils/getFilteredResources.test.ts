import { preparedResourcesMock } from '../mock/preparedResource.mock'
import getFilteredResources from './getFilteredResources'
import { SearchFilter } from '../types'

describe('getFilteredResources', () => {
  test('should return all resources when filter is empty', () => {
    const filter: SearchFilter = {}
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual(preparedResourcesMock)
  })

  test('should filter by model', () => {
    const filter: SearchFilter = { models: ['Golf'] }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([preparedResourcesMock[1]])
  })

  test('should filter by fuel type', () => {
    const filter: SearchFilter = { fuelType: 'Diesel' }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([preparedResourcesMock[0]])
  })

  test('should filter case-insensitive', () => {
    const filter: SearchFilter = { fuelType: 'diesel' }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([preparedResourcesMock[0]])
  })

  test('should filter by availability', () => {
    const filter: SearchFilter = { onlyAvailable: true }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([
      preparedResourcesMock[0],
      preparedResourcesMock[2],
    ])
  })

  test('should filter by winter tires', () => {
    const filter: SearchFilter = { winterTires: true }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([preparedResourcesMock[0]])
  })

  test('should filter by towbar', () => {
    const filter: SearchFilter = { towbar: true }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([
      preparedResourcesMock[0],
      preparedResourcesMock[1],
    ])
  })

  test('should filter by multiple filters', () => {
    const filter: SearchFilter = {
      fuelType: 'Electric',
      onlyAvailable: false,
    }
    const filteredResources = getFilteredResources({
      resources: preparedResourcesMock,
      filter,
    })
    expect(filteredResources).toEqual([preparedResourcesMock[1]])
  })
})
