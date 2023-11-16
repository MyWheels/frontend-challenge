import { responseMock } from '../mock/response.mock'
import { searchParamsMock } from '../mock/searchParams.mock'
import prepareResponse from './prepareResponse'
import { PreparedResource } from '../types'

describe('prepareResponse', () => {
  it('returns the prepared response', () => {
    const preparedResponse = prepareResponse(responseMock, searchParamsMock)

    expect(preparedResponse.results.length).toBe(1)

    expect(preparedResponse.results[0]).toEqual({
      id: 7,
      brand: 'Ford',
      model: 'Mustang',
      address: 'Grevelingen 1 Utrecht',
      alias: 'Muscle Car',
      color: 'Black',
      fuelType: 'Electric',
      availability: undefined,
      availabilityStatus: 'No availability info',
      ratePerHour: 3.25,
      winterTires: false,
      towbar: false,
      shouldDischarge: false,
      distance: null,
    } as PreparedResource)
  })

  it('maps a response to a prepared response', () => {
    const preparedResponse = prepareResponse(responseMock, searchParamsMock)

    expect(preparedResponse.current).toEqual(1)
    expect(preparedResponse.offset).toEqual(0)
    expect(preparedResponse.limit).toEqual(10)
    expect(preparedResponse.total).toEqual(1)
    expect(preparedResponse.results.length).toEqual(1)

    const [preparedResource] = preparedResponse.results

    expect(preparedResource.id).toEqual(7)
    expect(preparedResource.brand).toEqual('Ford')
    expect(preparedResource.model).toEqual('Mustang')
    expect(preparedResource.address).toEqual('Grevelingen 1 Utrecht')
    expect(preparedResource.fuelType).toEqual('Electric')
    expect(preparedResource.availability).toEqual(undefined)
    expect(preparedResource.ratePerHour).toEqual(3.25)
    expect(preparedResource.winterTires).toEqual(false)
    expect(preparedResource.towbar).toEqual(false)
    expect(preparedResource.shouldDischarge).toEqual(false)
    expect(preparedResource.distance).toBeNull()
  })
})
