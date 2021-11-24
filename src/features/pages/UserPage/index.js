import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableUserGroup, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const UserPage = ({ ...others }) => {
  const [listUser, setListUser] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { onPostExecute } = useRequestManager()

  const searchInput = useDebounce(search, 5000)

  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} status={1} />
  }, [search])

  const _renderTableProduct = useCallback(() => {
    return (
      <TableUserGroup
        expData={listUser}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        loading={reload}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listUser, page, reload, totalRecord])

  const getListUser = useCallback(() => {
    async function execute(search, page) {
      const result = await onPostExecute(EndPoint.GET_LIST_USER, {
        query: search,
        offset: page
      })
      if (result) {
        setListUser(result.result)
        setTotalRecord(result.total)
      }
    }
    execute(searchInput, page - 1)
  }, [searchInput, page, reload])

  useEffect(() => {
    if (reload) {
      getListUser()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    if (!reload) getListUser()
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Quản lý người dùng'}
      {...others}
    >
      {_renderTableProduct()}
    </WrapperContentBody>
  )
}

export default React.memo(UserPage)
