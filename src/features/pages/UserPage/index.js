import { useDebounce } from 'hooks'
import { TopBody } from 'molecules'
import { TableUserGroup, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { data } from './fake'

const UserPage = ({ ...others }) => {
  const [listUser, setListUser] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const searchInput = useDebounce(search, 3000)

  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  useEffect(() => {
    setListUser(data)
    setTotalRecord(data.length)
  }, [data])

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
  }, [listUser, page, reload])

  const getListUser = useCallback(() => {
    console.log(search, page)
  }, [searchInput, page])

  useEffect(() => {
    if (reload) {
      getListUser()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    getListUser()
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
