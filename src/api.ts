import { useState, useEffect } from 'react'

const API_URL = 'https://test.openwheels.nl/api/'

type ApiConfig = {
  method: 'search.map' | string
  params: any
}

export const useApi = (config: ApiConfig) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState()

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

      setData(await response.json())
      setIsLoading(false)
    })()
  }, [setIsLoading, setData])

  return { isLoading, data }
}
