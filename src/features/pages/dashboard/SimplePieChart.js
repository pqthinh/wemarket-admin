import PropTypes from 'prop-types'
import React from 'react'
import Chartist from 'react-chartist'

const SimplePieChart = ({ title, data, type, options }) => (
  <div className='simple-chart'>
    <h3>{title}</h3>
    <Chartist
      data={data}
      type={type}
      options={{
        height: 300,
        ...options
      }}
    />
  </div>
)

SimplePieChart.propTypes = {
  className: PropTypes.any,
  title: PropTypes.any,
  data: PropTypes.any,
  type: PropTypes.any,
  options: PropTypes.any
}

export default SimplePieChart
