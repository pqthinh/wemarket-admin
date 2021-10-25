import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React from 'react'
import { Table, Checkbox } from 'rsuite'
const { Cell } = Table

const TextCell = ({ rowData, dataKey, onChange, ...others }) => {
  return (
    <Cell {...others}>
      <Checkbox value={withEmpty(dataKey, rowData)} onChange={onChange} />
    </Cell>
  )
}

TextCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  onChange: PropTypes.func
}

export default React.memo(TextCell)
