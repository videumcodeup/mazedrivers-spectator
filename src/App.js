import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Lobby from './Lobby'
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
    case 'LIST_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    case 'STATE':
      return action.payload
    case 'FOLLOW_SUCCESS':
      return {
        ...state,
        following: action.payload.nickname
      }
    case 'UNFOLLOW_SUCCESS':
      return {
        ...state,
        maze: [],
        players: {}
      }
    default:
      return state
  }
}

const listRequest = () =>
  ({ type: 'LIST_REQUEST' })

const followRequest = ({ nickname }) =>
  ({ type: 'FOLLOW_REQUEST', payload: { nickname } })

const unfollowRequest = ({ nickname }) =>
  ({ type: 'UNFOLLOW_REQUEST', payload: { nickname } })

class App extends Component {
  constructor (props) {
    super(props)

    const host = 'localhost'
    const port = 8001

    const initialState = {
      clients: [],
      maze: [],
      players: {}
    }

    this.store = configureStore(initialState, reducer, `ws://${host}:${port}`)

    this.state = initialState

    this.unsubscribeFromStore = this.store.subscribe('message', state => {
      console.log('subscribe', state)
      this.setState(state)
    })

    this.unsubscribeFromStoreOpen = this.store.subscribe('open', () => {
      this.store.dispatch(listRequest())
    })

    this.handleClickPlayer = this.handleClickPlayer.bind(this)
    this.handleClickHome = this.handleClickHome.bind(this)
  }

  render () {
    const {
      clients,
      maze,
      players
    } = this.state

    console.log('App render', this.state)

    return (
      <div className='App'>
        <Header onClickHome={this.handleClickHome} />
        {maze.length ? null : (
          <Lobby
            clients={clients}
            handleClickPlayer={this.handleClickPlayer}
          />
        )}
        <Maze maze={maze} players={players} />
      </div>
    )
  }

  componentWillUnmount () {
    this.unsubscribeFromStore()
    this.unsubscribeFromStoreOpen()
  }

  handleClickPlayer (event) {
    const { nickname } = event.target.dataset
    this.store.dispatch(followRequest({ nickname }))
  }

  handleClickHome () {
    const nickname = this.state.following
    this.store.dispatch(unfollowRequest({ nickname }))
  }
}

export default App
