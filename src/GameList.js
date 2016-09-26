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
            data-gameId={gameId}
            onClick={handleClickGame}
          >
            <div className='Game__title'>
              {gameId}
            </div>
          </button>
          {map(players, (player, nickname) => (
            <button
              key={nickname}
              className='GameList__player'
              type='button'
              data-nickname={nickname}
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
