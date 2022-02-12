import { QueryClient } from 'react-query'
export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const enum QueryKeys {
  products = 'products',
  product = 'product',
  orders = 'orders',
  order = 'order',
  cart = 'cart',
}

const DefaultFetchOption = {
  headers: {
    'Content-Type': 'application/json',
  },
}
const BASE_URL = 'http://localhost:3003'

type FetcherArguments = {
  method: METHOD
  path: string
  body?: { [key: string]: any }
  params?: { [key: string]: any }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: FetcherArguments) => {
  try {
    let url = `${BASE_URL}${path}`
    const fetchOption: RequestInit = {
      method,
      ...DefaultFetchOption,
    }
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += '?' + searchParams.toString()
    }
    if (body) fetchOption.body = JSON.stringify(body)
    const res = await fetch(url, fetchOption)
    const json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
}
