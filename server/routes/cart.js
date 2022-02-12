// @ts-nocheck
import db from '../dbController.js'

const getCart = () => {
  db.read()
  db.data = db.data || { cart: [] }
  return db.data.cart
}
const setCart = data => {
  db.data.cart = data
  db.write()
}

export default [
  [
    'get',
    '/cart',
    (req, res) => {
      const list = getCart()
      res.send(list)
    },
  ],
  [
    'post',
    '/cart',
    (req, res) => {
      const { id, price, name, imageUrl } = req.body
      const parsedPrice = parseInt(price)

      if (
        Number.isNaN(parsedPrice) ||
        typeof name !== 'string' ||
        typeof imageUrl !== 'string'
      ) {
        res.sendStatus(400)
        return
      }
      const cart = getCart()
      const existingCartIndex = cart.findIndex(item => item.id === id)
      let newCartItem
      if (existingCartIndex > -1) {
        const prevItem = cart[existingCartIndex]
        newCartItem = {
          ...prevItem,
          quantity: (prevItem.quantity || 0) + 1,
        }
        cart.splice(existingCartIndex, 1, newCartItem)
      } else {
        newCartItem = { ...req.body, quantity: 1 }
        cart.unshift(newCartItem)
      }
      setCart(cart)
      res.send(newCartItem)
    },
  ],
  [
    'patch',
    '/cart:id',
    ({ body, params: { id } }, res) => {
      const cart = getCart()
      const targetIndex = cart.findIndex(item => item.id === id)
      if (targetIndex < 0) throw Error('item not existed')

      if (body.quantity === 0) {
        cart.splice(targetIndex, 1)
        setCart(cart)
        res.sendStatus(201)
      } else {
        const newItem = { ...cart[targetIndex], ...body }
        cart.splice(targetIndex, 1, newItem)
        setCart(cart)
        res.send(newItem)
      }
    },
  ],
]
