import styled from 'styled-components'
import { FormControl } from 'rsuite'
import BaseText from '../BaseText'

export const Wrapper = styled.div`
  margin: 20px 0;
`
export const Label = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
  display: flex;
`
export const WrapperTextArea = styled(FormControl)`
  margin: 20px auto;
`
export const TextRequire = styled(BaseText)`
  color: ${props => props.theme.colors.red[0]};
  margin-left: 10px;
`
