import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import { Wrapper } from './styled'

const defaultOptions = {
  title: {
    text: 'My chart'
  },
  series: [
    {
      data: [1, 2, 3]
    }
  ]
}

const BaseStatistic = ({ options, ...others }) => (
  <Wrapper className='container-statistic'>
    <HighchartsReact
      highcharts={Highcharts}
      options={options || defaultOptions}
      {...others}
    />
  </Wrapper>
)

BaseStatistic.propTypes = {
  options: PropTypes.object
}

export default BaseStatistic
