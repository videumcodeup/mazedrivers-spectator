import without from 'lodash/without'

let subscribers = { open: [], message: [] }

const notifySubscribers = (event, payload) =>
  subscribers[event].forEach(callback => callback(payload))

export default function configureStore (initialState = {}, reducer, url) {
  const ws = new window.WebSocket(url)

  let state = initialState

  ws.onopen = () => {
    notifySubscribers('open')
  }

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
    notifySubscribers('message', state)
  }

  const api = {
    subscribe (event, callback) {
      subscribers[event].push(callback)
      return function unsubscribe () {
        subscribers[event] = without(subscribers[event], callback)
      }
    },

    dispatch (action) {
      console.log('dispatch', action)
      ws.send(JSON.stringify(action))
    }
  }

  return api
}
