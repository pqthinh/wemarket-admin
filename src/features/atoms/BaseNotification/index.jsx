import React from 'react'
import { Toolbar, Wrapper, Text, Button } from './styled'
import PropTypes from 'prop-types'

const BaseNotification = ({
  agree = 'Xác nhận',
  accept,
  cancelTitle = 'Hủy bỏ',
  cancel,
  content
}) => {
  return (
    <Wrapper>
      <Text>{content}</Text>
      {(agree || cancel) && (
        <Toolbar>
          <Button onClick={accept}>{agree}</Button>
          <Button onClick={cancel}>{cancelTitle}</Button>
        </Toolbar>
      )}
    </Wrapper>
  )
}

BaseNotification.propTypes = {
  accept: PropTypes.func,
  cancel: PropTypes.func,
  agree: PropTypes.string,
  cancelTitle: PropTypes.string,
  content: PropTypes.string
}

export default React.memo(BaseNotification)
