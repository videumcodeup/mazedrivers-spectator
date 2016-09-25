import React, { PropTypes } from 'react'
import map from 'lodash/map'
import './GameList.css'

function GameList ({
  games,
  handleClickGame,
  handleClickPlayer
}) {
  return (
    <div className='GameList'>
      {map(games, (players, gameId) => (
        <div key={gameId} className='GameList__item'>
          <button
            className='Game'
            type='button'
            data-id={gameId}
            onClick={handleClickGame}
          >
            <div className='Game__title'>
              {gameId}
            </div>
          </button>
          {map(players, (player, nickname) => (
            <button
              key={nickname}
              className='Player'
              type='button'
              data-id={nickname}
              onClick={handleClickPlayer}
            >
              {nickname}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

GameList.propTypes = {
  games: PropTypes.object.isRequired
}

export default GameList
