export function sevenDayAverage(dates, cases) {
  const dateCaseTuples = dates.map((el, i) => [new Date(el), cases[i]])
  const output = []
  dateCaseTuples.forEach((el, i) => {
    if (i >= 6) {
      const temp = [el[0], 0]
      for (let j = i - 6; j < i + 1; j++) {
        temp[1] += dateCaseTuples[j][1]
      }
      output.push(temp)
    }
  })
  return output
}

// Cases data has form [[date, cases], [date, cases]]
export function perHundredThousand(population, cases) {
  const ret = cases.map((el) => [el[0], Math.round((el[1] / population) * 100000)])
  return ret
}

export function filterByDate(dateCaseArrays, start, end) {
  const filteredData = dateCaseArrays.filter(
    (el) => el[0] >= new Date(start) && el[0] <= new Date(end)
  )
  return filteredData
}
