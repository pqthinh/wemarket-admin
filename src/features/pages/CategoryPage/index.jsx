import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { WrapperContentBody, TableCategory } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const CategoryPage = ({ ...others }) => {
  const [listCategory, setListCategory] = useState([]) 
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 5000)

  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} status={1} />
  }, [search])

  const _renderTableProduct = useCallback(() => {
    return (
      <TableCategory
        expData={listCategory}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        loading={reload}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listCategory, page, reload, totalRecord])

  const getListCategory = useCallback(() => {
    async function execute(search, page) {
      const result = await onGetExecute(EndPoint.GET_LIST_CATEGORY, {
        query: search,
        offset: page
      })
      if (result) {
        setListCategory(result.result)
        setTotalRecord(result.total)
      }
    }
    execute(searchInput, page - 1)
  }, [searchInput, page, reload])

  useEffect(() => {
    if (reload) {
      getListCategory()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    if (!reload) getListCategory()
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Quản lý danh mục'}
      {...others}
    >
      {_renderTableProduct()}
    </WrapperContentBody>
  )
}

export default React.memo(CategoryPage)
