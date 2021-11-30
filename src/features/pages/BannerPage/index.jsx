import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { WrapperContentBody, TableBanner } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const BannerPage = ({ ...others }) => {
  // ctrl + F2 | ctrl + f 
  const [listBanner, setListBanner] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  // hàm này custom lại axios 
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 5000)

  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} status={1} />
  }, [search])

  const _renderTableProduct = useCallback(() => {
    return (
      <TableBanner
        expData={listBanner}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        loading={reload}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listBanner, page, reload, totalRecord])

  const getListBanner = useCallback(() => {
    async function execute(search, page) {
      const result = await onGetExecute(EndPoint.GET_LIST_BANNER, {
        query: search,
        offset: page
      })
      if (result) {
        setListBanner(result.result)
        setTotalRecord(result.total)
      }
    }
    execute(searchInput, page - 1)
  }, [searchInput, page, reload])

  useEffect(() => {
    if (reload) {
      getListBanner()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    if (!reload) getListBanner()
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Quản lý banner'}
      {...others}
    >
      {_renderTableProduct()}
    </WrapperContentBody>
  )
}

export default React.memo(BannerPage)
