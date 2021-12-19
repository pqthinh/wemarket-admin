import React from 'react'
import { TextContent, TextLink, TextTime, TextTitle, Wrapper } from './styled'

const BaseNotify = ({ notify, ...others }) => {
  const { title, content, createdAt, isRead } = notify

  const notifyDefault = React.useMemo(
    () => (
      <Wrapper status={!isRead} {...others}>
        <TextTitle className={'title'}>{title}</TextTitle>
        <TextContent>
          {content + ' '}
          <TextLink appearance='link'>{createdAt.toDateTime()}</TextLink>
        </TextContent>
        <TextTime>{createdAt.timeAgo()}</TextTime>
      </Wrapper>
    ),
    [notify]
  )

  return notifyDefault
}

export default React.memo(BaseNotify)
