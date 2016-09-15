import React, { PropTypes } from 'react'
import './Maze.css'

function Maze ({ maze }) {
  return (
    <div className='Maze'>
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
