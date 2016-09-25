import React, { PropTypes } from 'react'
import './Player.css'

function Player ({ direction, x, y }) {
  const transform = `rotate(${{NORTH: 0, EAST: 90, SOUTH: 180, WEST: 270}[direction]}deg)`
  const top = `${y * 30}px`
  const left = `${x * 30}px`
  return (
    <div className='Player' style={{ top, left, transform }} />
  )
}

Player.propTypes = {
  direction: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default Player
