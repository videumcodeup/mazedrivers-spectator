// import socket from './socket'
import without from 'lodash/without'

let subscribers = []

const notifySubscribers = (state) =>
  subscribers.forEach(callback => callback(state))

export default function configureStore (initialState = {}, reducer, url) {
  const ws = new window.WebSocket(url)

  let state = initialState

  ws.onmessage = event => {
    const { data } = event
    const action = JSON.parse(data)
    if (Array.isArray(action)) {
      action.forEach(item => {
        console.log(...item)
      })
    } else {
      console.log(action)
    }
    state = reducer(state, action)
    notifySubscribers(state)
  }

  const api = {
    subscribe (callback) {
      subscribers.push(callback)
      return function unsubscribe () {
        subscribers = without(subscribers, callback)
      }
    },

    dispatch (action) {
      console.log('dispatch', action)
      ws.send(JSON.stringify(action))
    }
  }

  return api
}
