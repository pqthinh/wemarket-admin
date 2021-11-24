import { Table } from 'rsuite'
import styled from 'styled-components'
import BaseImage from '../BaseImage'
const { Cell } = Table

export const Image = styled(BaseImage)``
export const WrapperImageCell = styled(Cell)`
  img {
    object-fit: contain;
    width: 100%;
    border-radius: 50%;
    height: 40px;
  }
`
