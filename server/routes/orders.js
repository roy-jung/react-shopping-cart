// @ts-nocheck
import uniqid from 'uniqid'
import db from '../dbController.js'

const getOrders = () => {
  db.read()
  db.data = db.data || { orders: [] }
  return db.data.orders
}
export default [
  [
    'post',
    '/orders',
    (req, res) => {
      const { orderDetails } = req.body

      for (const orderDetail of orderDetails) {
        const { quantity, price, name, imageUrl } = orderDetail

        if (
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          !Number.isInteger(price) ||
          typeof name !== 'string' ||
          typeof imageUrl !== 'string'
        ) {
          res.sendStatus(400)
          return
        }
      }

      getOrders()
      const newOrder = {
        id: uniqid(),
        orderDetails,
      }
      db.data.orders.unshift(newOrder)
      db.write()
      res.send(newOrder)
    },
  ],
]
