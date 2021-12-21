import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { WrapperContentBody, TableCategory } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const CategoryPage = ({ ...others }) => {
  const [listCategory, setListCategory] = useState([])
  const [search, setSearch] = useState('')
  const { onGetExecute } = useRequestManager()
  const searchInput = useDebounce(search, 5000)

  const [reload, setReload] = useState(true)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} />
  }, [search])

  const _renderTableProduct = useCallback(() => {
    return (
      <TableCategory
        isTree
        rowKey='id'
        expData={listCategory}
        shouldUpdateScroll={true}
        defaultExpandAllRows={true}
        loading={reload}
        autoHeight={true}
        setReload={setReload}
      />
    )
  }, [listCategory, reload])

  const getListCategory = useCallback(() => {
    async function execute(search) {
      const result = await onGetExecute(EndPoint.GET_LIST_CATEGORY, {
        query: search
      })
      if (result) {
        setListCategory(result.listCategory)
      }
    }
    execute(searchInput)
  }, [searchInput, reload])

  useEffect(() => {
    if (reload) {
      getListCategory()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    if (!reload) getListCategory()
  }, [searchInput])

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
