import React, { PropTypes } from 'react'
import Player from './Player'
import './PlayersOverlay.css'

function PlayersOverlay ({ players }) {
  return (
    <div className='PlayersOverlay'>
      {Object.keys(players).map(id => (
        <Player key={id} nickname={id} {...players[id]} />
      ))}
    </div>
  )
}

PlayersOverlay.propTypes = {
  players: PropTypes.object.isRequired
}

export default PlayersOverlay
