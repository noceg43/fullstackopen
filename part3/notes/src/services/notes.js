import axios from 'axios'

// add this baseUrl to the proxy in vite.config.js
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  // return only the response.data short form
  return request.then(response => response.data)
}

const getAllThrowError = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
  }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

/*
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
*/
// if the key name matches the content name use the short form
export default { getAll, create, update, getAllThrowError }