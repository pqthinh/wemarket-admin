import React from 'react'
import classNames from 'classnames'
import Chartist from 'react-chartist'
import { formatValue } from 'utils'
import PropTypes from 'prop-types'

const ColorfulChart = ({ className, title, data, type, options }) => (
  <div className={classNames('colorful-chart', className)}>
    <h3>{title}</h3>
    <Chartist
      data={data}
      type={type}
      options={{
        axisX: {
          showLabel: false,
          showGrid: false
        },
        axisY: {
          offset: 50,
          labelInterpolationFnc: function (value) {
            return formatValue(value)
          }
        },
        ...options
      }}
    />
  </div>
)

ColorfulChart.propTypes = {
  className: PropTypes.any,
  title: PropTypes.any,
  data: PropTypes.any,
  type: PropTypes.any,
  options: PropTypes.any
}

export default ColorfulChart
