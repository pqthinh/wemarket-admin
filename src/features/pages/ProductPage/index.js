import { useDebounce } from 'hooks'
import { TopBody } from 'molecules'
import { TableProductGroup, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { data } from './fake'

const ProductPage = ({ ...others }) => {
  const [listProduct, setListProduct] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const searchInput = useDebounce(search, 3000)

  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  useEffect(() => {
    console.log(data)
    setListProduct(data)
    setTotalRecord(data.length)
  }, [data])

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} status={4} />
  }, [search])

  const _renderTableProduct = useCallback(() => {
    return (
      <TableProductGroup
        expData={listProduct}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        loading={reload}
        limimt={10}
        setReload={setReload}
      />
    )
  }, [listProduct, page, reload])

  const getListProduct = useCallback(() => {
    console.log(search, page)
  }, [searchInput, page])

  useEffect(() => {
    if (reload) {
      getListProduct()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    getListProduct()
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Quản lý sản phẩm'}
      {...others}
    >
      {_renderTableProduct()}
    </WrapperContentBody>
  )
}

export default React.memo(ProductPage)
