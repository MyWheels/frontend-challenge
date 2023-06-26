import { ComponentProps } from 'react'
import { PreparedResource } from '../types'
import formatCurrency from '../utils/formatCurrency'
import formatDistance from '../utils/formatDistance'
import slugify from '../utils/slugify'

const appStartupTime = Date.now()

// YEEEET
export function resourceStockImage(
  resourceOrId: string | Pick<PreparedResource, 'brand' | 'model' | 'color'>,
  invalidate = true,
) {
  const id = slugify(
    typeof resourceOrId === 'string'
      ? resourceOrId
      : `${resourceOrId.brand}-${resourceOrId.model}`,
  )

  const color =
    typeof resourceOrId === 'string' ? 'default' : slugify(resourceOrId.color)

  const invalidator = invalidate ? `?inv=${appStartupTime}` : ''

  return `https://mywheels.nl/static/cars/${id}/${color}.png${invalidator}`
}

type ResourceListCardProps = Omit<ComponentProps<'div'>, 'resource'> & {
  resource: PreparedResource
  distance?: number
  viewOnMapScrollToTop?: boolean
}

function ResourceListCard({
  resource,
  distance,
  ...rest
}: ResourceListCardProps) {
  return (
    <div
      className="flex items-center mt-2 px-4 py-3 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out"
      {...rest}
    >
      <div className="w-24 mr-4 transition-opacity duration-300 ease-in-out">
        <div
          className="h-24 bg-contain bg-center bg-no-repeat transition-opacity duration-300 ease-in-out"
          style={{
            backgroundImage: `url("${resourceStockImage(resource)}")`,
          }}
        />
        <div className="mt-1 text-sm font-medium text-center">
          {formatCurrency(resource.ratePerHour)}
        </div>
        <div className="text-xs text-gray-500 text-center">per uur</div>
      </div>
      <div className="flex flex-col transition-opacity duration-300 ease-in-out">
        <div className="text-lg font-semibold text-gray-900 truncate">
          {resource.address}
          {typeof distance === 'number' && (
            <span className="ml-2 text-sm text-gray-500">
              {formatDistance(distance)}
            </span>
          )}
        </div>
        {resource.fuelType === 'elektrisch' && (
          <span className="text-md font-semibold truncate text-green-500">
            Elektrisch
          </span>
        )}
        <div className="text-sm text-gray-500">
          {resource.brand} {resource.model}
        </div>
        {resource.availabilityStatus && (
          <div className="text-sm text-gray-500">
            {resource.availabilityStatus}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResourceListCard
