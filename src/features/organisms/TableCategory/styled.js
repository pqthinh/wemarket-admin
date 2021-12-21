import {
  BaseCell,
  BaseCheckbox,
  BaseColumn,
  BaseContainer,
  BaseIcon,
  BaseLink,
  BaseModal,
  BaseText,
  ImageCell,
  TextCell
} from 'atoms'
import { Button, ButtonToolbar, IconButton, Table } from 'rsuite'
import styled from 'styled-components'

export const Wrapper = styled(BaseContainer)`
  max-height: calc(100vh - 150px);
  @media screen and (max-width: 980px) {
    margin: 10px;
  }

  .rs-table-cell-content {
    display: flex;
    min-height: 40px;
    align-items: center;
  }
`
export const Text = styled(BaseText)``
export const TextNoData = styled(BaseText)`
  top: 45%;
  left: 45%;
  position: absolute;
`
export const Cell = styled(BaseCell)`
  line-height: 50px;
  .rs-table-cell-content {
    display: flex;
  }
`
export const Column = styled(BaseColumn)``
export const Checkbox = styled(BaseCheckbox)``

export const Icon = styled(BaseIcon)`
  overflow: hidden;
  left: 5px;
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 10px;
`
export const WrapperIcon = styled.div`
  justify-content: space-around;
  display: flex;
  align-items: center;
`
export const WrapperIconButton = styled(IconButton)``
export const Header = styled(Table.HeaderCell)`
  .rs-checkbox {
    margin: unset;
    .rs-checkbox-wrapper {
      top: 2px;
    }
  }
  line-height: 100%;
`
export const Link = styled(BaseLink)``
export const Modal = styled(BaseModal)`
  max-width: 760px;
  .rs-modal-content .rs-modal-body {
    min-height: 300px;
  }
`

export const ContainerBlock = styled.div``
export const Toolbar = styled(ButtonToolbar)`
  margin: 20px auto 0;
`
export const TextNotification = styled.p`
  margin: 10px auto;
`
export const ButtonNotification = styled(Button)`
  ${props => props.success && `color: #E26740;`}
`
export const WrapperImageCell = styled(ImageCell)`
  img {
    width: 100%;
    border-radius: 4px;
    height: 30px;
  }
`
export const WrapperTextCell = styled(TextCell)``
