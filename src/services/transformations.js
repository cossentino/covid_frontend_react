export function sevenDayAverage(cases) {
  const output = []
  for (let i = 0; i < 6; i++) {
    let sum = 0
    for (let j = 0; j <= i; j++) {
      sum += cases[j]
    }
    output.push(sum / i + 1)
  }
  for (let i = 6; i < cases.length; i++) {
    let sum = 0
    for (let j = i - 6; j <= i; j++) {
      sum += cases[j]
    }
    output.push(sum / 7)
  }
  return output
}

// Cases data has form [[date, cases], [date, cases]]
export function perHundredThousand(population, cases) {
  const ret = cases.map((day) => Math.round((day / population) * 100000))
  return ret
}

export function filterByDate(dateCaseArrays, start, end) {
  const filteredData = dateCaseArrays.filter(
    (el) => el[0] >= new Date(start) && el[0] <= new Date(end)
  )
  return filteredData
}
