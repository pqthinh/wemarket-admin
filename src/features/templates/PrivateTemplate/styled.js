import { ListNotify, Sidebar } from 'molecules'
import { Container, Content, Footer } from 'rsuite'
import { BaseIcon, BaseBadge } from 'atoms'
import styled from 'styled-components'

export const Wrapper = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 480px) {
    display: block;
  }
`

export const LayoutWrapper = styled(Container)`
  display: block;
  max-width: calc(100% - 256px);
  background-color: ${props => props.theme.colors.gray[1]};
  height: 100vh;
  @media screen and (max-width: 480px) {
    height: calc(100vh - 90px);
    max-width: 100%;
  }
  // hide scrollbar
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
`
export const BodyWrapper = styled(Content)`
  position: relative;
  height: 100%;
  background: ${props => props.theme.colors.background};
`
export const FooterWrapper = styled(Footer)``
export const SidebarWrapper = styled(Sidebar)``
export const ListNotifyWrapper = styled(ListNotify)`
  position: relative;
  width: 100%;
  min-width: 200px;
`
export const WrapperBadge = styled(BaseBadge)`
  position: absolute;
  top: 0;
  right: 10px;
  transform: translate(30%, -30%);
  font-size: 9px;
  background: ${props => props.theme.colors.red[0]};
`

export const Icon = styled(BaseIcon)`
  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.gray[1]};
`
export const WrapperIcon = styled.div`
  display: flex;
  margin-top: 25px;
  padding: 0 10px;
  width: auto;
  cursor: pointer;
  position: relative;
`
export const WrapperIconClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
`
export const WrapperNotifyFixed = styled(Container)`
  height: 100vh;
  max-width: 400px;
  position: fixed;
  right: 0;
  z-index: 999;
`
