import { RefObject, useRef } from 'react'
import { InfiniteData } from 'react-query'
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
  }
  empty: {
    description: string
    backTo?: string
    buttonText?: string
  }
  [key: string]: any
}) => {
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const { data, isLoading } = fetcher(fetchMoreEl)

  if (!isLoading && !data)
    return <EmptyPage {...empty} fetchMoreEl={fetchMoreEl} />

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
