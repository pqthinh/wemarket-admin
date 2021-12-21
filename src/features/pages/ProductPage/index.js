import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableProductGroup, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const ProductPage = ({ ...others }) => {
  const [listProduct, setListProduct] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [sort, setSort] = useState({
    key: '',
    type: ''
  })
  const { onPostExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

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
        setReload={setReload}
        limit={10}
        sort={sort}
        setSort={setSort}
      />
    )
  }, [listProduct, page, totalRecord, sort, setSort])

  const getListProduct = useCallback(
    params => {
      async function execute(params) {
        const result = await onPostExecute(EndPoint.GET_LIST_PRODUCT, {
          ...params
        })
        if (result) {
          setListProduct(result.result)
          setTotalRecord(result.total)
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) getListProduct({ search: searchInput, offset: page - 1 })
  }, [searchInput, page, reload])

  useEffect(() => {
    if (sort.key)
      getListProduct({
        search: searchInput,
        offset: page - 1,
        sort: sort.key,
        type: sort.type
      })
  }, [sort])

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
