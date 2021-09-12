import { WrapperContentBody } from 'organisms'
import React from 'react'
import { Constants } from 'utils'
import { WrapperContent, Image } from './styled'
import { IMAGES } from 'assets'

const DashboardPage = () => {
  return (
    <WrapperContentBody top={null} contentBody={Constants.contentPage[1].title}>
      <WrapperContent>
        <Image source={IMAGES.NO_CONTENT.default} />
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default React.memo(DashboardPage)
