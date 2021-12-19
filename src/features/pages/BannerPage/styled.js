import { BaseModal } from 'atoms'
import styled from 'styled-components'
import { FormBanner } from 'molecules'

export const Modal = styled(BaseModal)`
  max-width: 760px;
  .rs-modal-content .rs-modal-body {
    min-height: 300px;
  }
`
export const FormAddBanner = styled(FormBanner)``
