import React, { PropTypes } from 'react'
import GameList from './GameList'
// import './Lobby.css'

function Lobby ({
  clients,
  ...rest
}) {
  const games = clients.reduce((result, {
    gameId,
    nickname,
    ...client
  }) => ({
    ...result,
    [gameId]: {
      ...result[gameId],
      [nickname]: client
    }
  }), {})
  return (
    <div className='Lobby'>
      <GameList games={games} {...rest} />
    </div>
  )
}

Lobby.propTypes = {
  clients: PropTypes.array.isRequired
}

export default Lobby
