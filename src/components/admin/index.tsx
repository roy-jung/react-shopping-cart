import { GetProductResponse, ProductRequest } from '@/dto'
import useProductList from '@/hooks/useProductList'
import { queryClient, QueryKeys, useAddProduct, useDeleteProduct } from '@/api'
import InfiniteList from '@/modules/infiniteList'
import AdminForm from './form'
import AdminProductItem from './item'

const Admin = () => {
  const { mutate: onAdd } = useAddProduct()
  const { mutate: onDelete } = useDeleteProduct()

  const addItem = (data: ProductRequest) =>
    onAdd(data, {
      onSuccess: newProduct => {
        queryClient.setQueryData<GetProductResponse[]>(
          QueryKeys.products,
          old => {
            return [newProduct, ...(old || [])]
          },
        )
      },
    })

  const deleteItem = (id: string) =>
    onDelete(id, {
      onSuccess: () => {
        queryClient.setQueryData<GetProductResponse[]>(
          QueryKeys.products,
          data => {
            return data?.filter(d => d.id !== id) || []
          },
        )
      },
    })

  return (
    <div className="contents">
      <AdminForm handleSubmit={addItem} />
      <InfiniteList
        wrapperClass="product-container"
        fetcher={useProductList}
        Item={AdminProductItem}
        deleteItem={deleteItem}
        empty={{
          description: '목록이 비었습니다. 상품을 추가해 주세요.',
        }}
      />
    </div>
  )
}

export default Admin
