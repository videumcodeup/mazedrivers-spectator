import React, { PropTypes } from 'react'
import './Player.css'

function Player ({ direction, nickname, style, x, y }) {
  const transform = `rotate(${{NORTH: 0, EAST: 90, SOUTH: 180, WEST: 270}[direction]}deg)`
  const top = `${y * 30}px`
  const left = `${x * 30}px`
  return (
    <div className='Player' style={{ top, left }}>
      <div className={'Player__background Player__background--' + style} style={{ transform }}/>
      <div className='Player__nickname'>{nickname}</div>
    </div>
  )
}

Player.propTypes = {
  direction: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default Player
