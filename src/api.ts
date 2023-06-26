import { useState, useEffect } from 'react'
import { SearchParams, JSONResponse, PreparedResponse } from './types'
import prepareResponse from './utils/prepareResponse'

const API_URL = 'https://test.openwheels.nl/api/'

type ApiConfig = {
  method: 'search.map' | string
  params: SearchParams
  refetchOnPropsChange?: any[]
}

export const useApi = (config: ApiConfig) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<JSONResponse>()
  const [preparedResponse, setPreparedResponse] =
    useState<PreparedResponse | null>(null)

  const refetchOnPropsChange = config.refetchOnPropsChange ?? []

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-ref': 'http://localhost:9009',
          'X-Simple-Auth-App-Id':
            '28_c3VwZXJzZWNyZXRteXdoZWVsc2NvZGluZ3Rlc3RzY3JldDhuMjdxdGc5ODdxM3R5',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 0,
          method: config.method,
          params: config.params,
        }),
      })

      const jsonData = await response.json()
      setData(jsonData)
      setPreparedResponse(prepareResponse(jsonData, config.params))
      setIsLoading(false)
    })()
  }, [setIsLoading, setData, ...refetchOnPropsChange])

  return { isLoading, data, preparedResponse }
}

const api = {
  fetchResources: async (config: ApiConfig) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-ref': 'http://localhost:9009',
        'X-Simple-Auth-App-Id':
          '28_c3VwZXJzZWNyZXRteXdoZWVsc2NvZGluZ3Rlc3RzY3JldDhuMjdxdGc5ODdxM3R5',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 0,
        method: config.method,
        params: config.params,
      }),
    })

    const json = await response.json()
    return prepareResponse(json, config.params)
  },
}

export default api
