import { withRandomImage } from 'exp-value'
import PropTypes from 'prop-types'
import React from 'react'
import { WrapperImageCell, Image } from './styled'

const AvatarCell = ({ rowData, dataKey, ...others }) => {
  return (
    <WrapperImageCell {...others}>
      <Image source={withRandomImage(dataKey, rowData)} />
    </WrapperImageCell>
  )
}

AvatarCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string
}

export default React.memo(AvatarCell)
