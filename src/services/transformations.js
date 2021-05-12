/* eslint-disable no-plusplus */
export function oneWeekBuckets(dates, cases) {
  const dateCaseTuples = dates.map((el, i) => [new Date(el), cases[i]])
  const output = []
  dateCaseTuples.forEach((el, i) => {
    if (el[0].getDay() === 0) {
      const temp = [el[0], el[1]]
      for (let j = i + 1; j < i + 7; j++) {
        if (j < dateCaseTuples.length) {
          temp[1] += dateCaseTuples[j][1]
        }
      }
      output.push(temp)
    }
  })
  return output
}

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

// Input - dates and cases
// Output - Array of arrays, where date represents start of the week, cases represents average for that week
