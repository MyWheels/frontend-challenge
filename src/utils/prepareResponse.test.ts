import prepareResponse from './prepareResponse'
import { Response } from '../types'

const response: Response = {
  jsonrpc: '2.0',
  authenticated: false,
  id: 1,
  result: {
    results: [
      {
        resource: {
          id: 7,
          registrationPlate: 'AA-CD-05',
          alias: 'Muscle Car',
          resourceType: 'car',
          brand: 'Ford',
          model: 'Mustang',
          color: 'Black',
          fuelType: 'Electric',
          numberOfSeats: 4,
          location: 'Grevelingen',
          streetNumber: '1',
          latitude: 52.090793,
          longitude: 5.111107,
          advertisement: null,
          created: '2023-05-09 16:35',
          city: 'Utrecht',
          locktype: 'meeting',
          parkingType: 'default',
          fuelLevel: null,
          fuelRange: null,
          charging: false,
          chargeAdapterConnected: null,
          fuelRangeDefault: 0,
          chargeAdapterConnectedSince: null,
          price: {
            id: 7,
            hourRate: '3.25',
            kilometerRate: '0.30',
            fuelPerKilometer: '0.13',
            dayRateTotal: '32.50',
          },
          options: {
            id: 7,
            automatic: false,
            winterTires: false,
            towbar: false,
          },
          locktypes: ['meeting'],
          favorite: false,
          rating_totals: null,
        },
        availability: null,
        shouldDischarge: false,
        distance: null,
      },
    ],
    current: 1,
    offset: 0,
    limit: 10,
    total: 1,
  },
}

describe('prepareResponse', () => {
  it('returns the prepared response', () => {
    const preparedResponse = prepareResponse(response)

    expect(preparedResponse.results.length).toBe(1)

    expect(preparedResponse.results[0]).toEqual({
      id: 7,
      brand: 'Ford',
      model: 'Mustang',
      address: 'Grevelingen 1 Utrecht',
      alias: 'Muscle Car',
      fuelType: 'Electric',
      availability: true,
      ratePerHour: 3.25,
      winterTires: false,
      towbar: false,
      shouldDischarge: false,
      distance: null,
    })
  })

  it('maps a response to a prepared response', () => {
    const preparedResponse = prepareResponse(response)

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
    expect(preparedResource.availability).toEqual(true)
    expect(preparedResource.ratePerHour).toEqual(3.25)
    expect(preparedResource.winterTires).toEqual(false)
    expect(preparedResource.towbar).toEqual(false)
    expect(preparedResource.shouldDischarge).toEqual(false)
    expect(preparedResource.distance).toBeNull()
  })
})
