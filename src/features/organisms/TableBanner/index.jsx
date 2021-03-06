import { BasePagination, CheckCell, TextCell } from 'atoms'
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
import { useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)

  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const _renderModalFormBanner = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        body={
          <FormEdit
            banner={rowData}
            type={'update'}
            setReload={e => {
              setReload(e)
              hideModal()
            }}
          />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormBanner()}
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
    console.log(id, status, 'banner')
    async function execute(id, type) {
      const result = await onPostExecute(EndPoint.CHANGE_STATUS_BANNER, {
        idBanner: id,
        status: type
      })
      if (result) {
        setReload(true)
        console.log(result, 'active / ban banner')
      }
    }
    execute(id, status)
  }, [])

  const handleActive = useCallback((id, status) => {
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

const TableBanner = ({
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
            <Header>ID</Header>
            <TextCell dataKey='id' />
          </Column>

          <Column width={150} align='center'>
            <Header>Image URL</Header>
            <WrapperImageCell dataKey='url' />
          </Column>

          <Column width={150} align='center'>
            <Header>Ki???u banner</Header>
            <TextCell dataKey='type' />
          </Column>

          <Column width={200} align='center'>
            <Header>M?? t??? banner</Header>
            <TextCell dataKey='description' />
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
TableBanner.propTypes = {
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

export default React.memo(TableBanner)
