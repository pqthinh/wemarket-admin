import { BasePagination, CheckCell, TextCell, AvatarCell } from 'atoms'
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
  TextNotification,
  Toggle,
  Toolbar,
  Wrapper,
  WrapperIcon,
  WrapperIconButton
} from './styled'
import { useRequestManager, useUser } from 'hooks'
import { EndPoint } from 'config/api'

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

const ToggleCell = ({ rowData, setReload, ...props }) => {
  const { onPostExecute } = useRequestManager()
  const { user } = useUser()
  const changeStatus = useCallback(
    (id, status) => {
      console.log(id, status, 'user')
      async function execute(id, type) {
        let endPoint =
          type == 'active'
            ? EndPoint.ADMIN_ACTIVE_USER
            : EndPoint.ADMIN_BAN_USER
        const result = await onPostExecute(endPoint, {
          uid: id
        })
        if (result) {
          setReload(true)
          console.log(result, 'active / ban user ')
        }
      }
      execute(id, status)
    },
    [user]
  )

  const handleActive = useCallback(
    (id, status) => {
      Notification['info']({
        title: 'K??ch ho???t t??i kho???n',
        duration: 10000,
        description: (
          <Wrapper>
            <TextNotification>
              B???n mu???n k??ch ho???t ho???c ban t??i kho???n n??y
            </TextNotification>
            <Toolbar>
              <ButtonNotification
                onClick={() => {
                  Notification.close()
                  changeStatus(id, status)
                }}
                success
              >
                X??c nh???n
              </ButtonNotification>
              <ButtonNotification onClick={() => Notification.close()}>
                H???y b???
              </ButtonNotification>
            </Toolbar>
          </Wrapper>
        )
      })
    },
    [user]
  )

  return (
    <Cell {...props}>
      {rowData['status'] !== 'deactive' ? (
        <Toggle
          active={rowData['status'] === 'active'}
          onChange={() =>
            handleActive(
              rowData['uid'],
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
          <Column width={60} align='center'>
            <Header>Avatar</Header>
            <AvatarCell dataKey='avatar' />
          </Column>

          <Column width={160} sortable>
            <Header>{'H??? & t??n'}</Header>
            <TextCell dataKey='username' />
          </Column>

          <Column width={120}>
            <Header>S??? ??i???n tho???i</Header>
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
            <Header>????ng nh???p l??c</Header>
            <Cell>
              {rowData => <Link href={``}>{rowData.last_login}</Link>}
            </Cell>
          </Column>

          <Column width={100}>
            <Header>K??ch ho???t</Header>
            <ToggleCell dataKey='status' setReload={setReload} />
          </Column>

          <Column width={120}>
            <Header>H??nh ?????ng</Header>
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
