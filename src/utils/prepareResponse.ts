import {
  ApiTimeframe,
  Availability,
  SearchParams,
  PreparedResource,
  PreparedResponse,
  Response,
} from '../types'

export function normalizeAvailability(av: Availability, req: ApiTimeframe) {
  if (av.beginAvailable && av.beginAvailable <= req.startDate) {
    delete av.beginAvailable
  }
  if (av.endAvailable && av.endAvailable >= req.endDate) {
    delete av.endAvailable
  }
  av.requested = req
  return av
}

const availabilityStatuses: Record<Availability['status'], string> = {
  available: 'Available',
  partially_available: 'Partially available',
  unavailable: 'Unavailable',
}

const getAvailabilityStatus = (availability?: Availability) =>
  availability?.status
    ? availabilityStatuses[availability?.status]
    : 'No availability info'

function prepareResponse(
  response: Response,
  params: SearchParams,
): PreparedResponse {
  const { result } = response
  const results: PreparedResource[] = result.results.map<PreparedResource>(
    (resultItem) => {
      const availability =
        resultItem.availability && params.timeFrame
          ? normalizeAvailability(resultItem.availability, params.timeFrame)
          : undefined

      return {
        id: resultItem.resource.id,
        brand: resultItem.resource.brand,
        model: resultItem.resource.model,
        alias: resultItem.resource.alias || '',
        address: `${resultItem.resource.location} ${resultItem.resource.streetNumber} ${resultItem.resource.city}`,
        fuelType: resultItem.resource.fuelType,
        color: resultItem.resource.color,
        availability,
        availabilityStatus: getAvailabilityStatus(availability),
        ratePerHour: Number(resultItem.resource.price.hourRate),
        winterTires: resultItem.resource.options.winterTires,
        towbar: resultItem.resource.options.towbar,
        shouldDischarge:
          resultItem.resource.fuelLevel !== null &&
          resultItem.resource.fuelLevel > 0,
        distance: null, // TODO: figure out how to calculate this
      }
    },
  )

  return {
    ...result,
    results,
  }
}

export default prepareResponse
