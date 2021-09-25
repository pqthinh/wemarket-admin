import { BaseCalendar } from 'atoms'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ContentTitle,
  GridItemContainer,
  HeaderListNotification,
  Notify,
  NotifyIcon,
  TextLink,
  Wrapper,
  WrapperBadge,
  WrapperCalendar,
  WrapperContainer,
  WrapperIcon,
  WrapperListNotify
} from './styled'

const ListNotification = ({ countNotify, setCountNotify }) => {
  const [showHeaderMobile, setShowHeaderMobile] = useState(false)
  const [notifications, setNotifications] = useState([])

  const fakeNotify = useMemo(() => {
    return [
      {
        node: {
          id: 'QmFzZU5vZGUtMzk3',
          title: 'Tin đăng mới',
          message:
            'Thành viên Phạm Văn A đẵ đăng tin rao bán lúc 21:59 04/08/2021',
          image_url: null,
          notification_type: 'owner',
          status: 'unread',
          data: '{"id":"QXVjdGlvbkl0ZW1UeXBlLTI3OQ==","title":"Tin đăng mới","type":"product","app_route":"biz/detail"}',
          created_at: '2021-07-26 08:25:19 UTC',
          __typename: 'Notification'
        },
        __typename: 'NotificationsEdgeType'
      },
      {
        node: {
          id: 'QmFzZU5vZGUtMzk4',
          title: 'Thành viên mới',
          message: 'Thành viên ABC vừa đăng ký tài khoản lúc 21:59 04/08/2021',
          image_url: null,
          notification_type: 'admin',
          status: 'unread',
          data: '{"id":"QXVjdGlvbkl0ZW1UeXBlLTI3OQ==","title":"Đăng ký tài khoản","type":"user","app_route":"biz/detail"}',
          created_at: '2021-07-26 08:25:19 UTC',
          __typename: 'Notification'
        },
        __typename: 'NotificationsEdgeType'
      },
      {
        node: {
          id: 'QmFzZU5vZGUtMzk4',
          title: 'Gia hạn bài viết',
          message:
            'Thành viên ABCD vừa gửi yêu cầu gia hạn tin đăng CEF lúc 21:59 04/08/2021',
          image_url: null,
          notification_type: 'admin',
          status: 'read',
          data: '{"id":"QXVjdGlvbkl0ZW1UeXBlLTI3OQ==","title":"Đăng ký tài khoản","type":"product","app_route":"biz/detail"}',
          created_at: '2021-07-26 08:25:19 UTC',
          __typename: 'Notification'
        },
        __typename: 'NotificationsEdgeType'
      }
    ]
  }, [])

  const handleResize = useCallback(() => {
    setShowHeaderMobile(window.innerWidth <= 480)
  }, [])

  const getTodoList = useCallback(date => {
    const day = new Date(date).getDate()
    switch (day) {
      case 10:
        return [
          { time: '10:30 am', title: 'Meeting' },
          { time: '12:00 pm', title: 'Lunch' }
        ]
      case 12:
        return [
          { time: '10:30 am', title: 'Meeting', seen: true },
          { time: '12:00 pm', title: 'Lunch', seen: true }
        ]
      case 15:
        return [
          { time: '09:30 pm', title: 'Products Introduction Meeting' },
          { time: '12:30 pm', title: 'Client entertaining' },
          { time: '02:00 pm', title: 'Product design discussion' },
          { time: '05:00 pm', title: 'Product test and acceptance' },
          { time: '06:30 pm', title: 'Reporting' },
          { time: '10:00 pm', title: 'Going home to walk the dog' }
        ]
      default:
        return []
    }
  }, [])

  const renderCell = useCallback(date => {
    const list = getTodoList(date)
    const listSeen = list.filter(item => item.seen)
    if (list.length && !listSeen.length) {
      return <WrapperBadge className='calendar-todo-item-badge' />
    }
    if (list.length && listSeen.length) {
      return <WrapperBadge className='calendar-todo-item-badge-seen' />
    }

    return null
  }, [])

  const headerNotification = useCallback(() => {
    if (!showHeaderMobile)
      return (
        <HeaderListNotification between>
          <Wrapper>
            <WrapperIcon onClick={() => console.log('click icon')}>
              <NotifyIcon name={'feather-bell'} />
              {countNotify > 0 && (
                <WrapperBadge
                  className={'count-notify'}
                  content={countNotify}
                />
              )}
            </WrapperIcon>
            <ContentTitle>Thông báo</ContentTitle>
          </Wrapper>
          <TextLink onClick={() => console.log('click read all')}>
            Đọc tất cả
          </TextLink>
        </HeaderListNotification>
      )
    return null
  }, [showHeaderMobile, countNotify])

  const renderListNotification = useCallback(() => {
    return (
      <WrapperListNotify>
        {notifications?.length > 0 ? (
          notifications?.map((notify, index) => (
            <Notify key={index} notify={notify} />
          ))
        ) : (
          <Wrapper>Bạn chưa có thông báo</Wrapper>
        )}
      </WrapperListNotify>
    )
  }, [notifications])

  const _countNotify = useCallback(
    notifications => {
      let numOfNotify = 0
      notifications?.map(notify => {
        if (notify.node?.status == 'unread') ++numOfNotify
      })
      return numOfNotify
    },
    [notifications]
  )

  useEffect(() => {
    handleResize()
    setNotifications(fakeNotify)
    setCountNotify(_countNotify(fakeNotify))
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <GridItemContainer sm={6} md={4} lg={5}>
      <WrapperContainer>
        {headerNotification()}
        {renderListNotification()}

        <WrapperCalendar>
          <BaseCalendar
            compact
            renderCell={renderCell}
            isoWeek={true}
            onChange={e => console.log(e)} // handle change date -> get notify in month
            bordered={false}
          />
        </WrapperCalendar>
      </WrapperContainer>
    </GridItemContainer>
  )
}

ListNotification.propTypes = {
  countNotify: PropTypes.number.isRequired,
  setCountNotify: PropTypes.func.isRequired
}

export default React.memo(ListNotification)
