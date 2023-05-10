import { PreparedResource, PreparedResponse, Response } from '../types'

function prepareResponse(response: Response): PreparedResponse {
  const { result } = response
  const results: PreparedResource[] = result.results.map<PreparedResource>(
    (resultItem) => ({
      id: resultItem.resource.id,
      brand: resultItem.resource.brand,
      model: resultItem.resource.model,
      alias: resultItem.resource.alias || '',
      address: `${resultItem.resource.location} ${resultItem.resource.streetNumber} ${resultItem.resource.city}`,
      fuelType: resultItem.resource.fuelType,
      availability: resultItem.resource.advertisement === null,
      ratePerHour: Number(resultItem.resource.price.hourRate),
      winterTires: resultItem.resource.options.winterTires,
      towbar: resultItem.resource.options.towbar,
      shouldDischarge:
        resultItem.resource.fuelLevel !== null &&
        resultItem.resource.fuelLevel > 0,
      distance: null, // TODO: figure out how to calculate this
    }),
  )

  return {
    ...result,
    results,
  }
}

export default prepareResponse
