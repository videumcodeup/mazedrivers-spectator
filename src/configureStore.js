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
    console.log('onmessage', data)
    const action = JSON.parse(data)
    console.log('onmessage', state, action)
    state = reducer(state, action)
    console.log('onmessage', state)
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
