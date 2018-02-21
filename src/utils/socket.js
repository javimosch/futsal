import io from 'socket.io-client'
import { endpoint } from '../config'
import shortid from 'shortid'

const socket = io(endpoint)

socket.on('connect', () => {
  console.log('Socket connection working')
})

var instance = null

async function create () {
  await waitConnection()
  let controllers = await emitPromise('getMethodsList')
  let instance = {}
  Object.keys(controllers).forEach(controllerName => {
    controllers[controllerName].forEach(methodName => {
      instance[controllerName] = instance[controllerName] || {}
      instance[controllerName][methodName] = (payload) => emitPromise(`${controllerName}_${methodName}`, payload)
    })
  })
  return instance
}

export async function getSocketActions () {
  if (!instance) {
    instance = await create()
    socket.on('shouldUpdateActions', () => {
      create().then(result => {
        instance = result
      })
      console.log('Actions were updated', JSON.stringify(Object.keys(instance)))
    })
  }
  return instance
}

export function getSocket () {
  return socket
}

export default {
  getSocketActions,
  getSocket: () => socket
}

function emitPromise (name, payload) {
  return new Promise((resolve, reject) => {
    let id = shortid.generate()
    let thenName = `${name}_${id}_then`
    let catchName = `${name}_${id}_catch`
    socket.on(thenName, thenHandler)
    socket.on(catchName, catchHandler)
    function removeListeners () {
      socket.off(thenName, thenHandler)
      socket.off(catchName, catchHandler)
    }
    function thenHandler (res) {
      removeListeners()
      resolve(res)
    }
    function catchHandler (error) {
      removeListeners()
      reject(error)
    }
    console.log('Calling', name)
    socket.emit(`${name}`, {
      identifier: id,
      data: payload
    })
  })
}

function waitConnection (start) {
  start = Date.now()
  return new Promise((resolve, reject) => {
    loop()
    function loop () {
      if (Date.now() - start > 10000) return reject(new Error('Connection timeout'))
      if (socket.id) return resolve()
      setTimeout(loop, 200)
    }
  })
}
