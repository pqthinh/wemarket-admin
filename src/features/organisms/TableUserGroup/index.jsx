import { BasePagination, CheckCell, ImageCell, TextCell } from 'atoms'
import { FormChangePassword } from 'molecules'
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
  Link,
  Modal,
  TextNoData,
  TextNotification,
  Toggle,
  Toolbar,
  Wrapper,
  WrapperIcon,
  WrapperIconButton
} from './styled'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const [showModalFormChangePassword, setShowModalFormChangePassword] =
    useState(false)

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

  const hideModalChangePassword = useCallback(() => {
    setShowModalFormChangePassword(false)
  }, [showModalFormChangePassword])

  const _renderModalFormChangePassword = useCallback(() => {
    return (
      <Modal
        show={showModalFormChangePassword}
        onHide={hideModalChangePassword}
        body={
          <FormChangePassword
            type='change-password-user'
            setReload={setReload}
            id={rowData['id']}
          />
        }
      />
    )
  }, [showModalFormChangePassword])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormCustomer()}
      {showModalFormChangePassword && _renderModalFormChangePassword()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => setShowModalFormEdit(true)}
          appearance='subtle'
          icon={<Icon name='feather-edit' />}
        />
        <WrapperIconButton
          onClick={() => setShowModalFormChangePassword(true)}
          icon={<Icon name='feather-key' strokeWidth={1} size={24} />}
        />
      </WrapperIcon>
    </Cell>
  )
}

const ToggleCell = ({ rowData, ...props }) => {
  const changeStatus = useCallback((id, status) => {
    console.log(id, status, 'customer')
  }, [])

  const handleActive = useCallback((id, status) => {
    Notification['info']({
      title: 'Kích hoạt tài khoản',
      duration: 10000,
      description: (
        <Wrapper>
          <TextNotification>
            Bạn muốn kích hoạt hoặc ban tài khoản này
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

const TableCustomerGroup = ({
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

  const _renderEmpty = useCallback(() => {
    return <TextNoData>Không có dữ liệu</TextNoData>
  }, [])

  const _renderTable = useCallback(
    expData => {
      const data = expData.filter((v, i) => {
        const start = limit * (page - 1)
        const end = start + limit
        return i >= start && i < end
      })
      return (
        <Table
          data={data}
          loading={loading}
          setReload={setReload}
          wordWrap
          id='table'
          height={window.innerHeight - 200}
          renderEmpty={_renderEmpty}
          {...others}
        >
          <Column width={40} align='center'>
            <Header>
              <Checkbox inline onChange={onCheckAll} />
            </Header>
            <CheckCell dataKey='id' onChange={onClickCheckbox} />
          </Column>
          <Column width={60} align='center'>
            <Header>Avatar</Header>
            <ImageCell dataKey='avatar' />
          </Column>

          <Column width={160} sortable>
            <Header>{'Họ & tên'}</Header>
            <TextCell dataKey='name' />
          </Column>

          <Column width={120}>
            <Header>Số điện thoại</Header>
            <Cell>
              {rowData => (
                <Link href={`tel:${rowData.phone}`}>{rowData.phone}</Link>
              )}
            </Cell>
          </Column>

          <Column width={200}>
            <Header>Email</Header>
            <Cell>
              {rowData => (
                <Link href={`mailto:${rowData.email}`}>{rowData.email}</Link>
              )}
            </Cell>
          </Column>

          <Column width={120}>
            <Header>Đăng nhập lúc</Header>
            <Cell>
              {rowData => <Link href={``}>{rowData.last_login}</Link>}
            </Cell>
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
TableCustomerGroup.propTypes = {
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

export default React.memo(TableCustomerGroup)