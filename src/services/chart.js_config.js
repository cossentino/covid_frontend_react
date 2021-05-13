const chartConfigDataObj = (stateData, myState, comparisonData = null, comparisonState = null) => {
  const data = {
    labels: [
      stateData.map((el) => `${el[0].getMonth()}-${el[0].getDate()}-${el[0].getFullYear()}`)
    ],
    datasets: [
      {
        label: myState.name,
        backgroundColor: 'rgba(30, 64, 175)',
        borderColor: 'rgba(30, 64, 175)',
        data: stateData.map((el) => el[1])
      }
    ]
  }
  // if (comparisonState) {
  //   datasets.push({
  //     label: comparisonState.name,
  //     backgroundColor: 'rgba(30, 64, 175)',
  //     borderColor: 'rgba(30, 64, 175)',
  //     data: comparisonData.map((el) => el[1])
  //   })
  // }
  return data
}

export default chartConfigDataObj
