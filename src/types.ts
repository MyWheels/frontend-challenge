export type Response = {
  jsonrpc: string
  authenticated: boolean
  result: Result
  id: number
}

type Result = {
  results: ResultItem[]
  current: number
  offset: number
  limit: number
  total: number
}

export interface Availability {
  status: 'available' | 'partially_available' | 'unavailable'
  beginAvailable?: Datetime
  endAvailable?: Datetime
  requested: ApiTimeframe
}

export enum ParkingType {
  Default = 'default',
  Spot = 'parking_spot',
  Zone = 'zone',
  FreeFloat = 'free_float',
}

export type Datetime = string

export interface ApiTimeframe {
  startDate: Datetime
  endDate: Datetime
  namedPrediction?: 'today' | 'now' | 'tomorrow'
}

export type LocationPoint = {
  latitudeMin: number
  latitudeMax: number
  longitudeMin: number
  longitudeMax: number
}

type ResultItem = {
  resource: Resource
  // availability: boolean | null
  availability?: Availability
  shouldDischarge: boolean
  distance?: number // ??
}

export type Resource = {
  id: number
  registrationPlate: string
  alias: string
  resourceType: string
  brand: string | null
  model: Model | null
  color: string | null
  fuelType: string | null
  numberOfSeats: number
  location: string
  streetNumber: string | null
  latitude: number
  longitude: number
  advertisement: null
  created: string
  city: string
  locktype: string
  parkingType: string
  fuelLevel: number | null
  fuelRange: number | null
  charging: boolean
  chargeAdapterConnected: boolean | null
  fuelRangeDefault: number
  chargeAdapterConnectedSince: string | null
  price: Price
  options: Options
  locktypes: string[]
  favorite: boolean
  rating_totals: null
}

export type Model =
  | '108'
  | 'Aiways-model'
  | 'C1'
  | 'C1-5 Feel'
  | 'C3 Feel'
  | 'C4 Picasso'
  | 'CAPTUR Intens'
  | 'Citigo'
  | 'Clio'
  | 'Corsa'
  | 'EVO'
  | 'Evalia'
  | 'Golf'
  | 'Leaf'
  | 'MEGANE Zen'
  | 'Mustang'
  | 'Polar'
  | 'ZOE Life'
  | 'ZOE Zen'
  | 'ZOE'
  | 'e-Niro'

type Price = {
  id: number
  hourRate: string
  kilometerRate: string
  fuelPerKilometer: string
  dayRateTotal: string
}

type Options = {
  id: number
  automatic: boolean
  winterTires: boolean
  towbar: boolean
}

// We map the Resource to this type to make it easier to work with
export type PreparedResource = {
  id: number
  brand: string | null
  model: Model | string | null
  address: string
  alias: string
  fuelType: string | null
  color: string | null
  availability: Availability | undefined
  availabilityStatus: string
  ratePerHour: number
  winterTires: boolean
  towbar: boolean
  shouldDischarge: boolean
  distance: null // ??
}

// We map the Response to this type to make it easier to work with
export type PreparedResponse = {
  results: PreparedResource[]
} & Pick<Result, 'current' | 'offset' | 'limit' | 'total'>

export interface SearchParams {
  filter?: SearchFilter
  locationPoint: LocationPoint
  timeFrame?: ApiTimeframe
}

export interface SearchFilter {
  fuelType?: string | null
  parkingType?: ParkingType
  resourceTypes?: string[]
  models?: Model[]
  fuelLevel?: number
  onlyFavorites?: boolean
  onlyAvailable?: boolean
  onlyDischarging?: boolean
  onlyCleaning?: boolean
  cleaningScore?: number
  automatic?: boolean
  winterTires?: boolean
  towbar?: boolean
}

// export type Filter = Partial<
//   Pick<PreparedResource, 'model' | 'fuelType' | 'availability'> &
//     Pick<Options, 'automatic' | 'winterTires' | 'towbar'> & {
//       onlyAvailable?: boolean
//     }
// >

export type JSONResponse = any
