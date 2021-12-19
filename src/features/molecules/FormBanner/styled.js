import {
  BaseButton,
  BaseForm,
  BaseIcon,
  BaseItemGrid,
  BaseWrapper,
  BaseImage,
  BaseUploader,
  BaseText,
  Loading
} from 'atoms'

import { Panel, Container } from 'rsuite'
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

export const WrapperAvatar = styled(BaseWrapper)`
  margin: 20px auto;
  position: relative;
  text-align: center;
  width: 150px;
  height: 150px;
`
export const Image = styled(BaseImage)`
  width: 100% !important;
  object-fit: contain;
`
export const Uploader = styled(BaseUploader)`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const IconAvatar = styled(BaseIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px !important;
  color: #000 !important;
`
export const Title = styled(BaseText)`
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  margin: 40px auto;
`
export const WrapperLoading = styled(Loading)``
export const Drag = styled(BaseUploader)`
  min-height: 150px;
  width: 100%;
  .rs-uploader-trigger-btn {
    min-height: 150px;
    width: 100% !important;
  }
`
export const DragText = styled(BaseText)`
  font-weight: bold;
`