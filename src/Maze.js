import React, { PropTypes } from 'react'
import PlayersOverlay from './PlayersOverlay'
import Countdown from './Countdown'
import './Maze.css'

function Maze ({
  maze,
  players,
  details
}) {
  return (
    <div className='Maze'>
      <Countdown details={details} />
      <PlayersOverlay players={players} />
      {maze.map((row, rowKey) => (
        <div key={rowKey} className='Maze__row'>
          {row.map((cell, cellKey) => (
            <div key={cellKey} className={`Maze__cell Maze__cell--${cell}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

Maze.propTypes = {
  maze: PropTypes.array.isRequired
}

export default Maze
