import { RefObject, useEffect, useRef } from 'react'
import { InfiniteData } from 'react-query'
import { queryClient, QueryKeys } from '@/api'
import EmptyPage from './emptyPage'
import LoadingIndicator from './loadingIndicator'

const InfiniteList = <T extends unknown>({
  wrapperClass,
  Item,
  fetcher,
  empty,
  ...itemProps
}: {
  wrapperClass: string
  Item: (...args: any) => JSX.Element
  fetcher: (fetchMoreEl: RefObject<HTMLDivElement | null>) => {
    data: InfiniteData<T[]> | undefined
    isLoading: boolean
    destroy: () => any
  }
  empty: {
    description: string
    backTo?: string
    buttonText?: string
  }
  [key: string]: any
}) => {
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const { data, isLoading, destroy } = fetcher(fetchMoreEl)

  useEffect(() => {
    return () => {
      queryClient.cancelQueries(QueryKeys.products)
      destroy()
    }
  }, [])

  if (!data) return <EmptyPage {...empty} fetchMoreEl={fetchMoreEl} />

  return (
    <>
      <div className={wrapperClass}>
        {data?.pages.map((list, i) =>
          list?.map((item, j) => (
            <Item item={item} {...itemProps} key={`${i}_${j}`} />
          )),
        )}
      </div>
      <div className="fetch-more" ref={fetchMoreEl} />
      <LoadingIndicator isLoading={isLoading} />
    </>
  )
}

export default InfiniteList
