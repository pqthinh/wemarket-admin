import { BaseText, BaseImage } from 'atoms'
import styled from 'styled-components'

export const WrapperContent = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`

export const Text = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
`
export const Image = styled(BaseImage)`
  max-height: 400px;
  object-fit: contain;
`
