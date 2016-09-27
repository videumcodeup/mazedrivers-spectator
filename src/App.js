import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Lobby from './Lobby'
import Maze from './Maze'
import Result from './Result'
import configureStore from './configureStore'

const localStorage = window ? window.localStorage : {
  setItem () {},
  getItem () {},
  removeItem () {}
}

const location = window ? window.location : {
  reload () {}
}

const STORAGE_KEY_HOST_DETAILS = 'mazedrivers-host-details'

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

    const hostData = localStorage.getItem(STORAGE_KEY_HOST_DETAILS)

    const { host, port } = hostData ? JSON.parse(hostData) : {
      host: 'localhost',
      port: 8001
    }

    const initialState = {
      host,
      port,
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
      host,
      port,
      clients,
      maze,
      players
    } = this.state

    console.log('App render', this.state)

    return (
      <div className='App'>
        <Header
          onClickHome={this.handleClickHome}
          onUpdateHostDetails={this.handleUpdateHostDetails}
          hostDetails={{ host, port }}
        />
        {maze.length ? null : (
          <Lobby
            clients={clients}
            handleClickPlayer={this.handleClickPlayer}
          />
        )}
        <Maze maze={maze} players={players} />
        <Result players={players} />
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

  handleUpdateHostDetails (values) {
    const data = JSON.stringify(values)
    localStorage.setItem(STORAGE_KEY_HOST_DETAILS, data)
    location.reload()
  }
}

export default App
