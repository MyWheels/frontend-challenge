import { Filter, PreparedResource } from '../types'
import getFilteredResources from './getFilteredResources'

describe('getFilteredResources', () => {
  const resources: PreparedResource[] = [
    {
      id: 1,
      brand: 'Brand 1',
      model: 'Model 1',
      address: 'Address 1',
      fuelType: 'Diesel',
      availability: true,
      ratePerHour: 10,
      winterTires: true,
      towbar: true,
      shouldDischarge: false,
      distance: null,
    },
    {
      id: 2,
      brand: 'Brand 2',
      model: 'Model 2',
      address: 'Address 2',
      fuelType: 'Electric',
      availability: false,
      ratePerHour: 20,
      winterTires: false,
      towbar: true,
      shouldDischarge: true,
      distance: null,
    },
    {
      id: 3,
      brand: 'Brand 3',
      model: 'Model 3',
      address: 'Address 3',
      fuelType: 'Gasoline',
      availability: true,
      ratePerHour: 15,
      winterTires: false,
      towbar: false,
      shouldDischarge: false,
      distance: null,
    },
  ]

  test('should return all resources when filter is empty', () => {
    const filter: Filter = {}
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual(resources)
  })

  test('should filter by model', () => {
    const filter: Filter = { model: 'Model 2' }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[1]])
  })

  test('should filter by fuel type', () => {
    const filter: Filter = { fuelType: 'Diesel' }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[0]])
  })

  test('should filter case-insensitive', () => {
    const filter: Filter = { fuelType: 'diesel' }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[0]])
  })

  test('should filter by availability', () => {
    const filter: Filter = { availability: true }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[0], resources[2]])
  })

  test('should filter by winter tires', () => {
    const filter: Filter = { winterTires: true }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[0]])
  })

  test('should filter by towbar', () => {
    const filter: Filter = { towbar: true }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[0], resources[1]])
  })

  test('should filter by multiple filters', () => {
    const filter: Filter = {
      model: 'Model 2',
      fuelType: 'Electric',
      availability: false,
    }
    const filteredResources = getFilteredResources({ resources, filter })
    expect(filteredResources).toEqual([resources[1]])
  })
})
