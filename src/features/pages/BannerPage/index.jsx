import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { WrapperContentBody, TableBanner } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { Modal, FormAddBanner } from './styled'

const BannerPage = ({ ...others }) => {
  const [listBanner, setListBanner] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { onGetExecute } = useRequestManager()
  const searchInput = useDebounce(search, 5000)
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [showModalAddBanner, setShowModalAddBanner] = useState(false)

  const TopTab = React.useCallback(() => {
    return (
      <TopBody
        search={search}
        setSearch={setSearch}
        buttonAction={() => setShowModalAddBanner(true)}
      />
    )
  }, [search])

  const _renderModalAddCustomer = useCallback(() => {
    if (!showModalAddBanner) return
    return (
      <Modal
        show={showModalAddBanner}
        onHide={() => setShowModalAddBanner(false)}
        body={
          <FormAddBanner
            type={'add'}
            setReload={e => {
              setReload(e)
              setShowModalAddBanner(false)
            }}
          />
        }
      />
    )
  }, [showModalAddBanner])

  const _renderTableBanner = useCallback(() => {
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
      {_renderModalAddCustomer()}
      {_renderTableBanner()}
    </WrapperContentBody>
  )
}

export default React.memo(BannerPage)
