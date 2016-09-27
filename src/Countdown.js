import React, { PropTypes } from 'react'
import './Countdown.css'

function Countdown({ details }) {
  const isStarted = (details.predicates || {}).isStarted || false
  const isStarting = (details.predicates || {}).isStarting || false

  if (isStarted) {
    return <div className="counter hide-counter">Go!</div>
  }

  if (isStarting) {
    return <div className="counter">Get ready</div>
  }

  return null
}

Countdown.propTypes = {
  details: PropTypes.object.isRequired
}

export default Countdown
