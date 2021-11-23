import { BasePagination, TextCell } from 'atoms'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Notification, Table } from 'rsuite'
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

  const _renderModalFormProduct = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        body={
          <FormEdit product={rowData} type={'update'} setReload={setReload} />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormProduct()}
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

const ToggleCell = ({ rowData, ...props }) => {
  const changeStatus = useCallback((id, status) => {
    console.log(id, status)
  }, [])

  const handleActive = useCallback((id, status) => {
    Notification['info']({
      title: 'Kích hoạt sản phẩm',
      duration: 10000,
      description: (
        <Wrapper>
          <TextNotification>Bạn muốn kích hoạt sản phẩm này ?</TextNotification>
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
      <Toggle
        active={rowData['status'] === 'active'}
        onChange={() =>
          handleActive(
            rowData['id'],
            rowData['status'] === 'active' ? 'deactive' : 'active'
          )
        }
        checkedChildren={<Icon name='feather-check' />}
        unCheckedChildren={<Icon name='feather-x' />}
      />
    </Cell>
  )
}

const TableProductGroup = ({
  expData,
  totalRecord,
  page,
  setPage,
  limit,
  ...others
}) => {
  const history = useHistory()
  const location = useLocation()
  const { search } = useLocation()

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

  const _renderTable = useCallback(
    (expData, page) => {
      const data = expData.filter((_, i) => {
        const start = limit * (page - 1)
        const end = start + limit
        return i >= start && i < end
      })
      return (
        <Table
          data={data}
          wordWrap
          id='table-product'
          height={window.innerHeight - 220}
          {...others}
        >
          <Column width={150} align='center'>
            <Header>Image</Header>
            <WrapperImageCell dataKey='imgs' />
          </Column>
          <Column width={100} sortable>
            <Header>Tên sp</Header>
            <TextCell dataKey='title' />
          </Column>
          <Column width={120} sortable>
            <Header>Tên user</Header>
            <TextCell dataKey='user_name' />
          </Column>
          <Column width={100} sortable>
            <Header>Email user</Header>
            <TextCell dataKey='email' />
          </Column>

          <Column width={100} sortable>
            <Header>Giá</Header>
            <TextCell dataKey='price' />
          </Column>
          <Column width={100} sortable>
            <Header>Số lượng</Header>
            <TextCell dataKey='quality' />
          </Column>

          <Column width={200} sortable>
            <Header>Mô tả</Header>
            <TextCell dataKey='product_description' />
          </Column>

          <Column width={140} sortable>
            <Header>Danh mục SP</Header>
            <TextCell dataKey='category' />
          </Column>

          <Column width={150}>
            <Header>Địa điểm</Header>
            <TextCell dataKey='place_name' />
          </Column>

          <Column width={150}>
            <Header>Ngày đăng</Header>
            <TextCell dataKey='createdAt' />
          </Column>

          <Column width={100}>
            <Header>Kích hoạt</Header>
            <ToggleCell dataKey='status' />
          </Column>
          <Column width={120}>
            <Header>Hành động</Header>
            <ActionCell dataKey='id' {...others} />
          </Column>
        </Table>
      )
    },
    [window.innerHeight]
  )

  useEffect(onLoadParamPage, [location.pathname])

  return (
    <Wrapper {...others}>
      {_renderTable(expData, page)}
      <BasePagination
        onChangePage={e => onLoadPage(e)}
        total={totalRecord}
        activePage={page}
        limit={10}
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
TableProductGroup.propTypes = {
  expData: PropTypes.array,
  totalRecord: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.any,
  setReload: PropTypes.func,
  limit: PropTypes.number
}
ToggleCell.propTypes = {
  rowData: PropTypes.object,
  setReload: PropTypes.func
}
FormEdit.propTypes = {
  setReload: PropTypes.func
}

export default React.memo(TableProductGroup)
