import { BasePagination, CheckCell, TextCell } from 'atoms'
import { EndPoint } from 'config/api'
import { useRequestManager } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Checkbox, Notification, Table } from 'rsuite'
import {
  ButtonNotification,
  Cell,
  Column,
  FormEdit,
  Header,
  Icon,
  Modal,
  TextNotification,
  Toggle,
  Toolbar,
  Wrapper,
  WrapperIcon,
  WrapperIconButton,
  WrapperImageCell
} from './styled'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const _renderModalFormCustomer = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        body={
          <FormEdit customer={rowData} type={'update'} setReload={setReload} />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormCustomer()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => setShowModalFormEdit(true)}
          appearance='subtle'
          icon={<Icon name='feather-edit' />}
        />
      </WrapperIcon>
    </Cell>
  )
}

const ToggleCell = ({ rowData, setReload, ...props }) => {
  const { onPostExecute } = useRequestManager()

  const changeStatus = useCallback((id, status) => {
    console.log(id, status, 'comment')
    async function execute(id, type) {
      const result = await onPostExecute(EndPoint.CHANGE_STATUS_COMMENT, {
        idComment: id,
        status: type
      })
      if (result) {
        setReload(true)
        console.log(result, 'active / ban comment')
      }
    }
    execute(id, status)
  }, [])

  const handleActive = useCallback((id, status) => {
    Notification['info']({
      title: 'Xác nhận',
      duration: 10000,
      description: (
        <Wrapper>
          <TextNotification>
            Bạn muốn kích hoạt hoặc ẩn bình luận này
          </TextNotification>
          <Toolbar>
            <ButtonNotification
              onClick={() => {
                Notification.close()
                changeStatus(id, status)
              }}
              success
            >
              Xác nhận
            </ButtonNotification>
            <ButtonNotification onClick={() => Notification.close()}>
              Hủy bỏ
            </ButtonNotification>
          </Toolbar>
        </Wrapper>
      )
    })
  }, [])

  return (
    <Cell {...props}>
      {rowData['status'] !== 'deactive' ? (
        <Toggle
          active={rowData['status'] === 'active'}
          onChange={() =>
            handleActive(
              rowData['id'],
              rowData['status'] === 'active' ? 'ban' : 'active'
            )
          }
          checkedChildren={<Icon name='feather-check' />}
          unCheckedChildren={<Icon name='feather-x' />}
        />
      ) : null}
    </Cell>
  )
}

const TableComment = ({
  expData,
  totalRecord,
  page,
  setPage,
  loading,
  setReload,
  limit,
  ...others
}) => {
  const history = useHistory()
  const location = useLocation()
  const { search } = useLocation()

  const onClickCheckbox = useCallback(() => {}, [])
  const onCheckAll = useCallback(() => {}, [])

  const onLoadPage = useCallback(
    page => {
      setPage(page)
      history.push(location.pathname + '?page=' + page)
    },
    [page]
  )

  const onLoadParamPage = useCallback(() => {
    const page = new URLSearchParams(search).get('page')
    if (page) setPage(eval(page))
  }, [location.pathname])
  const onSort = (type, sort) => {
    console.log(type, sort)
  }

  const _renderTable = useCallback(
    expData => {
      return (
        <Table
          data={expData}
          loading={loading}
          wordWrap
          id='table'
          height={window.innerHeight - 210}
          {...others}
        >
          <Column width={40} align='center'>
            <Header>
              <Checkbox inline onChange={onCheckAll} />
            </Header>
            <CheckCell dataKey='id' onChange={onClickCheckbox} />
          </Column>

          <Column width={120} align='center'>
            <Header>Image</Header>
            <WrapperImageCell dataKey='image' />
          </Column>

          <Column width={60} align='center'>
            <Header>ID</Header>
            <TextCell dataKey='id' />
          </Column>

          <Column width={120} align='center'>
            <Header>Title</Header>
            <TextCell dataKey='title' />
          </Column>

          <Column width={120} align='center'>
            <Header>Content</Header>
            <TextCell dataKey='content' />
          </Column>

          <Column width={80} align='center'>
            <Header>ID Order</Header>
            <TextCell dataKey='orderId' />
          </Column>

          <Column width={60} align='center'>
            <Header>Star</Header>
            <TextCell dataKey='star' />
          </Column>

          <Column width={150} sortable>
            <Header>
              <span onClick={() => onSort('createdAt')}>Ngày thêm</span>
            </Header>
            <TextCell dataKey='createdAt' />
          </Column>

          <Column width={100}>
            <Header>Kích hoạt</Header>
            <ToggleCell dataKey='status' setReload={setReload} />
          </Column>

          <Column width={120}>
            <Header>Hành động</Header>
            <ActionCell
              dataKey='id'
              loading={loading ? 1 : 0}
              setReload={setReload}
              {...others}
            />
          </Column>
        </Table>
      )
    },
    [loading, window.innerHeight]
  )

  useEffect(onLoadParamPage, [location.pathname])

  return (
    <Wrapper {...others}>
      {_renderTable(expData)}
      <BasePagination
        onChangePage={e => onLoadPage(e)}
        total={totalRecord}
        activePage={page}
        limit={limit}
      />
    </Wrapper>
  )
}

ActionCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  showModalFormEdit: PropTypes.bool,
  setShowModalFormEdit: PropTypes.func,
  loading: PropTypes.any,
  setReload: PropTypes.func
}
TableComment.propTypes = {
  expData: PropTypes.array,
  totalRecord: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.any,
  setReload: PropTypes.func,
  showModalFormEdit: PropTypes.bool,
  setShowModalFormEdit: PropTypes.func,
  limit: PropTypes.number
}
ToggleCell.propTypes = {
  rowData: PropTypes.object,
  setReload: PropTypes.func
}
FormEdit.propTypes = {
  setReload: PropTypes.func
}

export default React.memo(TableComment)
