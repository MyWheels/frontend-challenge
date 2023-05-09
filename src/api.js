import { useState, useEffect } from 'react'

const API_URL = 'https://test.openwheels.nl/api/'

export const useApi = ({ method, params }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(
    () =>
      (async () => {
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
            method,
            params,
          }),
        })

        setData(await response.json())
        setIsLoading(false)
      })(),
    [setIsLoading, setData],
  )

  return { isLoading, data }
}
