import styled from 'styled-components'
import { Nav } from 'rsuite'
import BaseIcon from '../BaseIcon'

export const WrapperNav = styled(Nav)`
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`
export const NavItem = styled(Nav.Item)`
  ${props =>
    props.active &&
    `
    position: relative;
    .rs-nav-item-content {
      &:before {
        left: 10px !important;
        right: 10px !important;
      }

      svg {
        color: ${props.theme.colors.primary} !important;
      }
    }`};

  .rs-nav-item-content {
    &:before {
      content: '';
      position: absolute;
      bottom: 5px !important;
      left: 50%;
      right: 50%;
      height: 2px;
      background: ${props => props.theme.colors.primary} !important;
    }
    svg {
      margin-right: 5px;
    }
  }
  z-index: 0;
`

export const ContentItem = styled.span`
  padding: 2px;
  font-size: 12px;
  color: ${props => props.theme.colors.gray[1]};
  @media screen and (max-width: 1200px) {
    padding: 1px;
    font-size: 10px;
  }
`
export const Icon = styled(BaseIcon)``
export const Wrapper = styled.div`
  display: flex;
  margin: 5px;
`
