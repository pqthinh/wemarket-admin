import { Header } from 'organisms'
import React, { useState, useEffect, useCallback } from 'react'
import {
  BodyWrapper,
  LayoutWrapper,
  ListNotifyWrapper,
  SidebarWrapper,
  Wrapper
} from './styled'
import PropTypes from 'prop-types'

const PrivateTemplate = ({ children, ...others }) => {
  const [showInMobile, setShowInMobile] = useState(false)
  // xử lý đếm thông báo
  const [countNotify, setCountNotify] = useState(0)

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
        <ListNotifyWrapper
          countNotify={countNotify}
          setCountNotify={setCountNotify}
        />
      )}
    </Wrapper>
  )
}

PrivateTemplate.propTypes = {
  children: PropTypes.any
}

export default React.memo(PrivateTemplate)
