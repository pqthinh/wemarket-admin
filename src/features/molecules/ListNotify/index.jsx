import { BaseCalendar } from 'atoms'
import PropTypes from 'prop-types'
import { useRequestManager, useUser } from 'hooks'
import { EndPoint } from 'config/api'
import React, { useCallback, useEffect, useState } from 'react'
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
import { withArray } from 'exp-value'

const ListNotification = ({ countNotify, setCountNotify }) => {
  const [showHeaderMobile, setShowHeaderMobile] = useState(false)
  const [notifications, setNotifications] = useState([])
  const { onPostExecute, onGetExecute } = useRequestManager()
  const { user } = useUser()

  const handleResize = useCallback(() => {
    setShowHeaderMobile(window.innerWidth <= 480)
  }, [])

  const getListNotify = useCallback(() => {
    async function execute(id) {
      if (!id) return
      const result = await onGetExecute(EndPoint.GET_LIST_NOTIFY(id))
      if (result) {
        setNotifications(withArray('data', result))
        setCountNotify(_countNotify(withArray('data', result)))
      }
    }
    execute(user?.id)
  }, [user])

  const readNotify = useCallback((idNotify, type) => {
    async function execute(idAdmin, idNotify, type) {
      if (!idAdmin) return
      await onPostExecute(EndPoint.READ_NOTIFY, {
        idAdmin,
        idNotify,
        type
      })
      await getListNotify()
    }
    execute(user.id, idNotify, type)
  })

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
          <TextLink onClick={() => readNotify(null, 'all')}>
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
            <Notify
              key={index}
              notify={notify}
              onClick={() => {
                if (!notify?.isRead) readNotify(notify.id)
              }}
            />
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
        if (!notify?.isRead) ++numOfNotify
      })
      return numOfNotify
    },
    [notifications]
  )

  useEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    getListNotify()
  }, [user])

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
