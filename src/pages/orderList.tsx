import Header from '@/modules/header'
import OrdersList from '@/components/orders'

const OrdersListPage = () => {
  return (
    <section className="page">
      <Header title="주문 목록" />
      <OrdersList />
    </section>
  )
}

export default OrdersListPage
