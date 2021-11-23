import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableProductGroup, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const ProductPage = ({ ...others }) => {
  const [listProduct, setListProduct] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

  const [totalRecord, setTotalRecord] = useState(0)

  const getListProduct = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_PRODUCT, {
          ...params
        })
        if (result) {
          setListProduct(result)
          setTotalRecord(result.length)
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(getListProduct, [])

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
        limit={10}
      />
    )
  }, [listProduct, page, totalRecord])

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
