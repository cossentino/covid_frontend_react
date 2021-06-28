## Covid-19 Data Center (ReactJS/TailwindCSS)<br><br>
![Example of side-by-side comparison of time-series COVID case data between Michigan and California](/media/readme_image.png)<br><br>

**Description:** A web application that displays continuously-updating state- and county-level data surrounding the COVID-19 pandemic. Includes time-series graphs of state-level cases since March of 2020, which can be compared on a population-adjusted basis to other states, and filtered by start and end dates.

**Languages/Frameworks:** ReactJS, TailwindCSS, ChartJS, JS Fetch API

**Technical Notes**

* All React components are functional components, and React hooks are used to replicate class-component-like functionality
* COVID-19 data fetched from COVID ActNow API to populate info-cards and graphs
* Custom data transformation/filter functions used for population-adjustment

**Data Sources:**
  - All COVID-19 data: [COVID ActNow](https://covidactnow.org)<br>
  - Population data: [US Census Bureau](https://www.census.gov/programs-surveys/popest/data/data-sets.html)
