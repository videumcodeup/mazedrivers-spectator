import React, { Component } from 'react'
import './App.css'
import Maze from './Maze'
import configureStore from './configureStore'

function reducer (state, action) {
  switch (action.type) {
    case 'JOIN_SUCCESS':
      console.log(action)
      return state
    case 'JOIN_FAILURE':
      console.log(action)
      return state
    case 'STATE':
      return action.payload
    default:
      return state
  }
}

const joinRequest = nickname =>
  ({ type: 'JOIN_REQUEST', payload: { nickname } })

class App extends Component {
  constructor (props) {
    super(props)

    const host = 'localhost'
    const port = 8001

    const initialState = {
      game: {
        maze: []
      }
    }

    this.store = configureStore(initialState, reducer, `ws://${host}:${port}`)

    this.state = initialState

    this.unsubscribeFromStore = this.store.subscribe(state => {
      console.log('subscribe', state)
      this.setState(state)
    })

    this.handleJoinButtonClick = this.handleJoinButtonClick.bind(this)
  }

  handleJoinButtonClick () {
    this.store.dispatch(joinRequest('Albert' + Math.floor(Math.random() * 25)))
  }

  render () {
    const {
      game: { maze }
    } = this.state

    console.log('App render', this.state, this.state.game, this.state.game.maze)

    return (
      <div className='App'>
        <Maze maze={maze} />
        <button type='button' onClick={this.handleJoinButtonClick}>
          Join game
        </button>
      </div>
    )
  }

  componentWillUnmount () {
    this.unsubscribeFromStore()
  }
}

export default App
