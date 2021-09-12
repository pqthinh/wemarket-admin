import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Label, WrapperTextArea, TextRequire } from './styled'

const BaseTextArea = ({
  label,
  data,
  onChange,
  require,
  accepter,
  ...others
}) => {
  return (
    <Wrapper>
      <Label>
        {label} {require ? <TextRequire>(*)</TextRequire> : null}
      </Label>

      <WrapperTextArea
        componentClass='textarea'
        value={data}
        onChange={onChange}
        accepter={accepter}
        {...others}
      />
    </Wrapper>
  )
}

BaseTextArea.propTypes = {
  label: PropTypes.string,
  data: PropTypes.any,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  require: PropTypes.bool,
  accepter: PropTypes.object
}

export default BaseTextArea
