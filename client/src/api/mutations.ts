import {
  GetProductResponse,
  ProductRequest,
  GetCartResponse,
  GetOrderResponse,
} from '@/dto'
import { MutationFunction, UseMutationOptions, useMutation } from 'react-query'
import { fetcher } from './client'

const mutator =
  <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    mutationFn: MutationFunction<TData, TVariables>,
  ) =>
  (options?: UseMutationOptions<TData, TError, TVariables, TContext>) =>
    useMutation<TData, TError, TVariables, TContext>(mutationFn, options)

export const useAddProduct = mutator<
  GetProductResponse,
  unknown,
  ProductRequest
>(body =>
  fetcher({
    method: 'POST',
    path: '/products',
    body,
  }),
)

export const useDeleteProduct = mutator<string, unknown, string>((id: string) =>
  fetcher({
    method: 'DELETE',
    path: `/products/${id}`,
  }),
)

export const useAddCart = mutator<GetCartResponse, unknown, GetProductResponse>(
  body =>
    fetcher({
      method: 'POST',
      path: '/cart',
      body,
    }),
)
export const useDeleteCart = mutator<string, unknown, string>((id: string) =>
  fetcher({
    method: 'DELETE',
    path: `/cart/${id}`,
  }),
)
export const useAddOrder = mutator<
  GetOrderResponse,
  unknown,
  {
    orderDetails: {
      price: number
      name: string
      imageUrl: string
      quantity: number
    }[]
  }
>(body =>
  fetcher({
    method: 'POST',
    path: '/orders',
    body,
  }),
)
