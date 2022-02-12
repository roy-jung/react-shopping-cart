//@ts-nocheck
import uniqid from 'uniqid'
import db from '../dbController.js'

const getProducts = () => {
  db.read()
  db.data = db.data || { products: [] }
  return db.data.products
}

export default [
  [
    'get',
    '/products',
    ({ query: { page = 1 } }, res) => {
      const list = getProducts()
      res.send(list.slice((page - 1) * 12, page * 12))
    },
  ],
  [
    'post',
    '/products',
    (req, res) => {
      const { price, name, imageUrl } = req.body
      const parsedPrice = parseInt(price)

      if (
        Number.isNaN(parsedPrice) ||
        typeof name !== 'string' ||
        typeof imageUrl !== 'string'
      ) {
        res.sendStatus(400)
        return
      }
      getProducts()
      const newProduct = { id: uniqid(), price: parsedPrice, name, imageUrl }
      db.data.products.unshift(newProduct)
      db.write()
      res.status(201).send(newProduct)
    },
  ],
  [
    'delete',
    '/products/:id',
    ({ params: { id } }, res) => {
      const list = getProducts()
      const targetIndex = list.findIndex(item => item.id === id)
      if (targetIndex < 0 || !list[targetIndex]) return
      db.data.products.splice(targetIndex, 1)
      db.write()
      res.send({ id })
    },
  ],
]
