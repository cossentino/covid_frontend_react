export function formatDateLabels(dateObj) {
  return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`
}

export function generateTimeSeriesUrl(stateName, startDate = null, endDate = null) {
  const urlBase = `https://api.covidactnow.org/v2/state/${stateName}.timeseries.json?apiKey=229ed0d259874d8f94d9f0a34e1c1e28`
  let url = ''
  if (startDate && endDate) {
    url = `${urlBase}?start_date=${startDate}&end_date=${endDate}`
  } else if (startDate) {
    url = `${urlBase}?start_date=${startDate}`
  } else if (endDate) {
    url = `${urlBase}?end_date=${endDate}`
  } else {
    url = urlBase
  }
  console.log(url)
  return url
}
