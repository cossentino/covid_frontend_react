const canvas = document.createElement('canvas')
canvas.id = 'myChart'
const ctx = canvas.getContext('2d')
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [...this.labels],
    datasets: [
      {
        label: '',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [...this.dailyCases]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: `Cases of COVID-19 in ${this.name}`,
      fontSize: 24
    }
  }
})
