import { sevenDayAverage } from './transformations' 

const dataHandler = (stateInfo, caseData, perCapitaOn = false, filterDates = false) => {
  const dates = data.map((sd) => sd.attributes.date)
  const baseData = sevenDayAverage(case)
}