export default async function useCounties(stateAbbrev) {
  const url = `https://api.covidactnow.org/v2/county/${stateAbbrev}.json?apiKey=229ed0d259874d8f94d9f0a34e1c1e28`
  const data = await fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      return json
    })
  return data
}
