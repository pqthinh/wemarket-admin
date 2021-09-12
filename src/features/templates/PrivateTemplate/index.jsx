import { Header } from 'organisms'
import React, { useState, useEffect, useCallback } from 'react'
import { Animation } from 'rsuite'
import {
  BodyWrapper,
  LayoutWrapper,
  ListNotifyWrapper,
  SidebarWrapper,
  Wrapper,
  WrapperNotifyFixed,
  WrapperIcon,
  WrapperIconClose,
  Icon,
  WrapperBadge
} from './styled'
const { Slide } = Animation
import PropTypes from 'prop-types'

const PrivateTemplate = ({ children, ...others }) => {
  const [showInMobile, setShowInMobile] = useState(false)
  const [countNotify, setCountNotify] = useState(0)
  const [toggle, setToggle] = useState(false)

  const onToggleNotify = useCallback(() => {
    setToggle(!toggle)
  }, [toggle])

  const handleResize = useCallback(() => {
    setShowInMobile(window.innerWidth <= 480)
  }, [window])

  useEffect(handleResize, [])
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Wrapper className='show-container'>
      {!showInMobile && <SidebarWrapper />}
      {showInMobile && (
        <Header countNotify={countNotify} setCountNotify={setCountNotify} />
      )}
      <LayoutWrapper>
        <BodyWrapper {...others}>{children}</BodyWrapper>
      </LayoutWrapper>
      {!showInMobile && (
        <>
          <WrapperIcon onClick={onToggleNotify}>
            <Icon name={'feather-bell'} size={20} />
            {countNotify > 0 && (
              <WrapperBadge className={'count-notify'} content={countNotify} />
            )}
          </WrapperIcon>
          {toggle && (
            <Slide in={toggle} placement={'right'}>
              <WrapperNotifyFixed>
                <WrapperIconClose onClick={onToggleNotify}>
                  <Icon name={'feather-x'} size={20} />
                </WrapperIconClose>
                <ListNotifyWrapper
                  countNotify={countNotify}
                  setCountNotify={setCountNotify}
                />
              </WrapperNotifyFixed>
            </Slide>
          )}
        </>
      )}
    </Wrapper>
  )
}

PrivateTemplate.propTypes = {
  children: PropTypes.any
}

export default React.memo(PrivateTemplate)
