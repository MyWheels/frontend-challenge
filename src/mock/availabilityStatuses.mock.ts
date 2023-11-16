import { Availability } from '../types'

const availabilityStatusesMock: Record<Availability['status'], Availability> = {
  available: {
    status: 'available',
    beginAvailable: '2021-01-01T00:00:00.000Z',
    endAvailable: '2021-01-01T00:00:00.000Z',
    requested: {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-01-01T00:00:00.000Z',
    },
  },

  unavailable: {
    status: 'unavailable',
    requested: {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-01-01T00:00:00.000Z',
    },
  },

  partially_available: {
    status: 'partially_available',
    beginAvailable: '2021-01-01T00:00:00.000Z',
    requested: {
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2021-01-01T00:00:00.000Z',
    },
  },
}

export default availabilityStatusesMock
