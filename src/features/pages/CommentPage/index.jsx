import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { WrapperContentBody, TableComment } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'

const CommentPage = ({ ...others }) => {
  const [listComment, setListComment] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 5000)

  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} />
  }, [search])

  const _renderTableProduct = useCallback(() => {
    return (
      <TableComment
        expData={listComment}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        loading={reload}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listComment, page, reload, totalRecord])

  const getListComment = useCallback(() => {
    async function execute(search, page) {
      const result = await onGetExecute(EndPoint.GET_LIST_COMMENT, {
        query: search,
        offset: page
      })
      if (result) {
        setListComment(result.result)
        setTotalRecord(result.total)
      }
    }
    execute(searchInput, page - 1)
  }, [searchInput, page, reload])

  useEffect(() => {
    if (reload) {
      getListComment()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    if (!reload) getListComment()
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Quản lý bình luận'}
      {...others}
    >
      {_renderTableProduct()}
    </WrapperContentBody>
  )
}

export default React.memo(CommentPage)
