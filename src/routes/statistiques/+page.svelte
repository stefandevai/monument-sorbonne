<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  const data1 = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  let ctx1;
	let chart1Canvas;

  let labels2 = ['January', 'February', 'March', 'April', 'May'];
  let dataset21Data = [10, 25, 13, 18, 30];
  let dataset22Data = [20, 15, 28, 22, 10];
  let ctx2;
	let chart2Canvas;

  onMount(async (promise) => {
    // Chart 1
    ctx1 = chart1Canvas.getContext('2d');
    const chart1 = new Chart(ctx1, {
      type: 'bar',
      options: {
        plugins: {
          legend: {
            display: false
          },
        }
      },
      data: {
        labels: data1.map(row => row.year),
        datasets: [
          {
            label: 'Année de naissance',
            data: data1.map(row => row.count)
          }
        ]
      }});

    // Chart 2
    ctx2 = chart2Canvas.getContext('2d');
    const chart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: labels2,
        datasets: [
            {
                label: 'Solid Line',
                data: dataset21Data,
                fill: false,
            },
            {
                label: 'Solid Line',
                data: dataset22Data,
                fill: false,
            },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        }
      },
    });
  });
</script>

<main>
  <h1>Statistiques</h1>
  <canvas bind:this={chart1Canvas} id="chart1"></canvas>
  <canvas bind:this={chart2Canvas} id="chart2"></canvas>
</main>

<style lang="scss">
  main {
    padding: 2rem 16rem;
    background: white;
    min-height: 100vh;
  }
  
  h1 {
    color: #ebba3d;
    font-size: 3rem;
    margin-bottom: 1rem;
    font-family: "Cinzel", serif;
  }
</style>
