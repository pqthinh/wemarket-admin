import { FormCategory } from 'molecules'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { Table } from 'rsuite'
import {
  Cell,
  Column,
  Header,
  Icon,
  Modal,
  Wrapper,
  WrapperIcon,
  WrapperIconButton,
  WrapperImageCell,
  WrapperTextCell
} from './styled'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEditCategory, setShowModalFormEditCategory] =
    useState(false)

  const hideModal = useCallback(() => {
    setShowModalFormEditCategory(false)
  }, [showModalFormEditCategory])

  const _renderModalFormCategory = useCallback(() => {
    return (
      <Modal
        show={showModalFormEditCategory}
        onHide={hideModal}
        body={
          <FormCategory
            type='change-edit-category'
            setReload={setReload}
            id={rowData['id']}
          />
        }
      />
    )
  }, [showModalFormEditCategory])

  return (
    <Cell {...props}>
      {showModalFormEditCategory && _renderModalFormCategory()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => console.log(rowData['id'])}
          appearance='subtle'
          icon={<Icon name='feather-trash-2' />}
        />
        <WrapperIconButton
          onClick={() => setShowModalFormEditCategory(true)}
          icon={<Icon name='feather-edit' strokeWidth={1} size={24} />}
        />
      </WrapperIcon>
    </Cell>
  )
}

const TableCategory = ({ expData, loading, setReload, ...others }) => {
  const _renderTable = useCallback(
    expData => {
      return (
        <Table data={expData} loading={loading} id='table-category' {...others}>
          <Column width={100} align='center'>
            <Header>ID</Header>
            <WrapperTextCell dataKey='id' />
          </Column>

          <Column width={60} align='center'>
            <Header>Icon</Header>
            <WrapperImageCell dataKey='icon' />
          </Column>

          <Column width={120} align='center'>
            <Header>Ảnh</Header>
            <WrapperImageCell dataKey='image' />
          </Column>
          <Column width={160} align='center'>
            <Header>Mô tả</Header>
            <WrapperTextCell dataKey='description' />
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

  return <Wrapper {...others}>{_renderTable(expData)}</Wrapper>
}

ActionCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  showModalFormEdit: PropTypes.bool,
  setShowModalFormEdit: PropTypes.func,
  loading: PropTypes.any,
  setReload: PropTypes.func
}
TableCategory.propTypes = {
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

export default React.memo(TableCategory)
