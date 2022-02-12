import { RefObject, useEffect } from 'react'
import { useGetProductList } from '@/api'
import useInfiniteScroll from './useInfiniteScroll'

const useProductList = (fetchMoreEl: RefObject<HTMLDivElement | null>) => {
  const { intersecting, destroy } = useInfiniteScroll(fetchMoreEl)
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetProductList()

  useEffect(() => {
    if (intersecting && hasNextPage) fetchNextPage()
  }, [intersecting, hasNextPage])

  return { data, isLoading, destroy }
}

export default useProductList
