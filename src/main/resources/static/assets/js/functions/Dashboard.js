/**
 * Created by kaxa on 12/4/16.
 */
Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
function DashInit() {
    dashDataTodayMenuReset();
    $.getJSON("/filialReport/1?last=7", function (result) {
        var ar = [];
        for (var key in result) {
            ar.push([Number(key), result[key]]);
        }
        ar.sort(function (a, b) {
            if (a[0] < b[0])
                return -1;
            if (a[0] > [0])
                return 1;
        });
        console.log(ar);
        stockCharts('loansChart', ar, 'გაცემული სესხები');
    });
    $("#interestChart").unbind().click(function () {
        $(this).unbind()
        $.getJSON("/filialReport/2?last=7", function (result) {
            var ar = [];
            for (var key in result) {
                ar.push([Number(key), result[key]]);
            }
            ar.sort(function (a, b) {
                if (a[0] < b[0])
                    return -1;
                if (a[0] > [0])
                    return 1;
            });
            console.log(ar);
            stockCharts('interestChart', ar, 'დარიცხული პროცენტები');
        });
    });
    $("#paymentsChart").unbind().click(function () {
        $(this).unbind()
        $.getJSON("/filialReport/3?last=7", function (result) {
            var ar = [];
            for (var key in result) {
                ar.push([Number(key), result[key]]);
            }
            ar.sort(function (a, b) {
                if (a[0] < b[0])
                    return -1;
                if (a[0] > [0])
                    return 1;
            });
            console.log(ar);
            stockCharts('paymentsChart', ar, 'გადახდები');
        });
    });
    $.getJSON('/getTodayData', function (result) {
        $("#loansMadeTodayDiv").html(result.loans + " ლარი")
        $("#todayPayInterestsDiv").html(result.interestsPay + " ლარი")
        $("#payedTodayDiv").html(result.payments + " ლარი")
    });
    loansToPayToday();
    loansGivenToday();

}
function stockCharts(tabName, data, name) {
    var custom_colors = ['#C9625F', '#18A689', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#8085e8', '#91e8e1'];
    var custom_color = custom_colors[Math.floor(Math.random() * custom_colors.length)];

    // Create the chart
    $('#stock-' + tabName).highcharts('StockChart', {
        chart: {
            height: 240,
            type: 'spline',
            borderColor: '#DE0E13'
        },
        credits: {
            enabled: true
        },
        exporting: {
            enabled: true
        },
        rangeSelector: {
            buttons: [{
                type: 'month',
                count: 1,
                text: '1თვე'
            },
                {
                    type: 'month',
                    count: 3,
                    text: '3თვე'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6თვე'
                }, {
                    type: 'all',
                    count: 1,
                    text: 'All'
                }],
            inputEnabled: true,
            selected: 1
        },
        colors: [custom_color],
        scrollbar: {
            enabled: true
        },
        navigator: {
            enabled: true
        },
        xAxis: {
            lineColor: '#EFEFEF',
            tickColor: '#EFEFEF',
        },
        yAxis: {
            gridLineColor: '#EFEFEF'
        },
        series: [{
            name: name,
            data: data,
            type: 'areaspline',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, custom_color],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }]
    });
}


function dashDataTodayMenuReset(){
    $(".dashDataTodayMenu").removeClass("active");
    $(".dashDataTodayMenuTab").removeClass("active");
    $(".dashDataTodayMenuFirst").addClass("active");
    $("#").addClass("active");
}
function loansGivenToday() {
    moment(new Date()).locale("ka").format("YYYY-MM-DD");
    $("#loansTodayDataTable").html("");
    $.getJSON("getloans?index=0&closed=false&opened=false&late=false" +
        "&start=" +
        moment(moment(new Date()).locale("ka").format("YYYY-MM-DD"), "YYYY-MM-DD") +
        "&end=" +
        moment(moment(new Date()).locale("ka").format("YYYY-MM-DD"), "YYYY-MM-DD") +
        "&search=", function (result) {
        $("#curLoansDataTable").dataTable().fnDestroy();
        var dataArray = result["content"];
        for(key in dataArray){
            var currentElement = dataArray[key];
            $("#loansTodayDataTable").append(
                "<tr class='gridRow'>" +
                "<td><a href='#' value='"+key+"' class='loanClickRow2'>"+currentElement["number"]+"</a></td>" +
                "<td><a href='#' value='"+key+"' class='loanClickRowUser2'>"+currentElement["clientFullName"]+"</a></td>" +
                "<td>"+currentElement["loanSum"]+"</td>" +
                "</tr>"
            )
        }
        $('.loanClickRow2').click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            openLoanGlobal(currentElement);
        });
        $('.loanClickRowUser2').click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            openUserGlobal(currentElement.client);
        });

        $("#curLoansDataTable").removeClass("no-footer");
        tableDynamicById("curLoansDataTable");
        inputSelect();
        $("#curLoansDataTable_filter").remove();


        console.log(result)
    })
}
function loansToPayToday(){
    $("#loansToPayDataTable").html("");
    $.getJSON("/getTodayPayLoans", function (result) {

        $("#curLoansToPayDataTable").dataTable().fnDestroy();
        $("#loansToPayDataTable").html("");
        var dataArray = result;
        for(var key2 in dataArray){
            var currentElement = dataArray[key2];
            $("#loansToPayDataTable").append(
                "<tr>" +
                "<td><a href='#' value='"+key2+"' class='loanClickRow'>"+currentElement["number"]+"</a></td>" +
                "<td><a href='#' value='"+key2+"' class='loanClickRowUser'>"+currentElement["clientFullName"]+"</a></td>" +
                "<td>"+currentElement["interestSumLeft"]+"</td>" +
                "</tr>"
            )
        }
        $('.loanClickRow').click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            openLoanGlobal(currentElement);
        });
        $('.loanClickRowUser').click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            openUserGlobal(currentElement.client);
        });
        $("#curLoansToPayDataTable").removeClass("no-footer");
        tableDynamicById("curLoansToPayDataTable");
        inputSelect();
        $("#curLoansToPayDataTable_filter").remove();


        console.log(result)
    })
}