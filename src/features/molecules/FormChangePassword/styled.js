import {
  BaseButton,
  BaseForm,
  BaseIcon,
  BaseItemGrid,
  BaseText,
  BaseWrapper,
  Loading
} from 'atoms'
import { Container, Panel } from 'rsuite'
import styled from 'styled-components'

export const Button = styled(BaseButton)`
  width: 50%;
`

export const Form = styled(BaseForm)``
export const GridItem = styled(BaseItemGrid)``
export const Icon = styled(BaseIcon)`
  width: 20px;
`

export const PanelWrapper = styled(Panel)`
  background: ${props => props.theme.colors.white};
  height: auto;
`
export const LayoutWrapper = styled(Container)`
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  width: 95%;
`

export const Wrapper = styled(BaseWrapper)`
  text-align: center;
  margin: 40px auto;
`
export const Title = styled(BaseText)`
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  margin: 40px auto;
`
export const WrapperLoading = styled(Loading)``
