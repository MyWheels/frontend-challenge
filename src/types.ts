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

type ResultItem = {
  resource: Resource
  availability: boolean | null
  shouldDischarge: boolean
  distance: null // ??
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

type Model =
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
  availability: boolean
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

export type Filter = Partial<
  Pick<
    PreparedResource,
    'model' | 'fuelType' | 'availability' | 'winterTires' | 'towbar'
  >
>

export type JSONResponse = any
