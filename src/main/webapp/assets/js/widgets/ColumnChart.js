/**
 * Created by kaxa on 9/7/16.
 */
function drawColumnChart(div,data1,data2){

    



    return new Chart(div, {
        type: 'bar',
        data: {
            labels: data1,
            datasets: [{
                height:300,
                label: '# ჯამური ღირებულება',
                data: data2,
               /* backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],*/
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio:false,
            height:400,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    })
}