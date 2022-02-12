import { useGetOrderList } from '@/api'
import EmptyPage from '@/modules/emptyPage'
import OrderedDetails from './details'

const OrderedList = () => {
  const { data } = useGetOrderList()

  if (!data)
    return (
      <EmptyPage
        description="결제 내역이 없어요."
        backTo="/"
        buttonText="홈으로"
      />
    )

  return (
    <div className="contents">
      {data.map(order => (
        <OrderedDetails {...order} key={order.id} />
      ))}
    </div>
  )
}

export default OrderedList
