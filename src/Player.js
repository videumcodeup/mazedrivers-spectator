import React, { PropTypes } from 'react'
import './Player.css'

function Player ({ x, y }) {
  const top = `${y * 30}px`
  const left = `${x * 30}px`
  return (
    <div className='Player' style={{ top, left }} />
  )
}

Player.propTypes = {
  player: PropTypes.object.isRequired
}

export default Player
