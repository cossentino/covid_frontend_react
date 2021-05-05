import { STATES_ENDPOINT } from '../constants/routes'

async function fetchStates() {
  const response = await fetch(STATES_ENDPOINT).then((resp) => resp.json())
  return response.data
}

export default fetchStates
