import { useState } from 'react'
import CartModal from '@/components/product/cartModal'
import { GetProductResponse } from '@/dto'

const useCartModal = () => {
  const [modalItem, setModalItem] = useState<GetProductResponse | null>(null)
  const showModal = (item: GetProductResponse) => {
    setModalItem(item)
  }
  const closeModal = () => {
    setModalItem(null)
  }

  return {
    modalComponent: modalItem ? (
      <CartModal item={modalItem} closeModal={closeModal} />
    ) : null,
    showModal,
    closeModal,
  }
}

export default useCartModal
