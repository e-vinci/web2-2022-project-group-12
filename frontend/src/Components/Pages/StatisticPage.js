import { Chart } from 'chart.js/auto'
import { clearPage } from '../../utils/render';


const text = `
<div class="text-center">
  <h1 class="display-1">Your sales stats</h1>
</div>
<div style="display:block;margin:0 auto; width:20%">
  <div>
    <canvas id="myChart" height="250" width="400"></canvas>
  </div>
</div>
`;

const StatisticPage = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = text;


  (async function () {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
      { year: 2017, count: 45 }
    ];

    new Chart(
      document.getElementById('myChart'),
      {
        type: 'polarArea',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ]
        },
        options: {
          responsive: true
        }
      }
    );
  })();
  /* https://www.chartjs.org/docs/latest/getting-started/ */
};


export default StatisticPage;
