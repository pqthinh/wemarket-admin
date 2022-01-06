import { Table } from 'rsuite'
import styled from 'styled-components'
import BaseImage from '../BaseImage'
const { Cell } = Table

export const Image = styled(BaseImage)``
export const WrapperImageCell = styled(Cell)`
  img {
    object-fit: contain;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`
