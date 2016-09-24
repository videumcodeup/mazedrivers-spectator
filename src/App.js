import React, { Component } from 'react'
import './App.css'
import Maze from './Maze'
import configureStore from './configureStore'

// Example actions
// ['players', 'albert', 'directions', 'NORTH'],
// ['players', 'albert', 'x', 2],
// ['maze', 0, 1, 'wall'],
const actionArrayReducer = (state, [collection, scope, key, value]) => ({
  ...state,
  [collection]: {
    ...state[collection],
    [scope]: {
      ...state[collection][scope],
      [key]: value
    }
  }
})

function reducer (state, action) {
  if (Array.isArray(action)) {
    return action.reduce(actionArrayReducer, state)
  }
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
      maze: [],
      players: {}
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
      maze,
      players
    } = this.state

    console.log('App render', this.state)

    return (
      <div className='App'>
        <Maze maze={maze} players={players} />
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
