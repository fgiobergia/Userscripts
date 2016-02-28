// ==UserScript==
// @name        BarChart
// @namespace   http://fgiobergia.com
// @version     1.0
// @description Un grafico a barre rappresentante l'andamento della carriera
// @match       https://didattica.polito.it/portal/page/portal/home/Studente*
// @match       https://didattica.polito.it/pls/portal30/sviluppo.pagina_studente*main*
// @copyright   2016+, Flavio Giobergia
// @license     http://opensource.org/licenses/MIT
// @require     https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js
// @require     http://momentjs.com/downloads/moment.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    
    function findLibretto () {
        mao = undefined;
        $('.RegionBorderMao').each(function(k,v) {
            $(v).find('div').each(function(k,v) {
                if ($(v).text().trim() === 'Libretto Elettronico' && mao === undefined) {
                    mao = $(this).parent().parent();
                }
            });
        });
        return mao;
    }
    
    function getGrades () {
        list = [];
		$('table').find('tr.policorpo').each(function(k,v) {
            if (k && !$(v).hasClass('fg_dummy')) { // fg_dummy are inserted by another script
                obj = {};
                $(v).find('td').each(function(j,w) {
                    switch (j) {
                        case 1:
                            obj['cfu'] = parseInt($(w).children().first().val());
                            break;
                        case 2:
                            obj['grade'] = parseInt($(w).children().first().val());
                            if (isNaN(obj['grade'])) {
                                obj['grade'] = 25; // parseInt('sup') -> NaN , using 25
                            }
                            break;
                        case 3:
                            var date = $(w).text();
                            obj['date'] = moment(date,'DD/MM/YYYY');
                            break;
                        default:
                            break;
                    }
                });
                list.push(obj);
            }
		});
        
        /* sort by date, ascending order */
        list.sort(function(a,b) {
            return a['date'].diff(b['date']);
        });
        
        return list;
    }
    
    function genMonthsList (from, to) {
        list = [];
        var f = moment(from);
        while (f.diff(to) <= 0) {
            list.push(f.format('MMM YYYY'));
            f.add(1,'month');
        }
        list.push(f.format('MMM YYYY'));
        return list;
    }
    
    function computeAverage (grades, months) {
        var list = [];
        var currentCfu = 0;
        var currentSum = 0;
        var i = 0;
        
        $(grades).each(function(k,v) {
            while (v['date'].format('MMM YYYY') !== months[i]) {
                i++;
                list.push((currentCfu === 0) ? null : (currentSum /currentCfu).toFixed(2));
                currentSum = 0;
                currentCfu = 0;
            }
            currentSum += v['cfu'] * v['grade'];
            currentCfu += v['cfu'];
        });
        list.push((currentCfu === 0) ? null : (currentSum /currentCfu).toFixed(2));
        return list;
    }
    
    function compactData (data) {
        return data.filter(function(obj) {
            return obj['avg'] !== null;
        });
    }
    
    
    $(findLibretto()).after('<div class = "col-md-12"><table width="100%" class="RegionBorderMao"><tbody><tr><td> \
                             <canvas id="chart"></canvas></td></tr><tr><td><input type = \
                             \'checkbox\' id = \'fg_compact\'> <span style = \'font:     \
                             Helvetica-Neue, Helvetica, Arial, sans-serif; font-size:    \
                             12px; color: #666;\'>Compatta mesi</span></td></tr></tbody></table></div>');
    var grades = getGrades();
    var labels = genMonthsList(grades[0]['date'], grades[grades.length-1]['date']);
    var avg = computeAverage(grades,labels);
    
    var data = new Array(labels.length);
    var i = 0;
    $.each(labels,function(k,v) {
        var obj = {'label': v, 'avg': null};
        data[i++] = obj;
    });
    i = 0;
    $.each(avg,function(k,v) {
        data[i++]['avg'] = v;
    });
    
    var originalData = data;
    var compact = false;
    var ctx = document.getElementById("chart").getContext("2d");
    
    var chartData = {
        labels: data.map(function (obj) { return obj['label']; }),
        datasets: [
            {
                label: "Average",
                fillColor: "rgba(252,122,8,0.5)",
                strokeColor: "rgba(252,122,8,0.8)",
                highlightFill: "rgba(252,122,8,0.75)",
                highlightStroke: "rgba(252,122,8,1)",
                data: data.map(function (obj) { return obj['avg']; })  // jQuery's map() sucks - when null or undefined is returned, it removes the item!
            }
        ]
    };
    
    var chartOptions = { 
        responsive: true,
        maintainAspectRatio: true,
        
        scaleOverride : true,
        scaleStartValue: 16,
        scaleStepWidth : 2,
        scaleSteps: 7,
        scaleShowVerticalLines: false

    };
    
    ctx.canvas.height = 50;
    var barChart = new Chart(ctx).Bar(chartData, chartOptions);

    $('#fg_compact').click(function() {
        if (compact) {
            compact = false;
            data = originalData;
        }
        else {
            compact = true;
            data = compactData(originalData);
        }
        
        chartData.labels =  data.map(function (obj) { return obj['label']; });
        chartData.datasets[0].data = data.map(function (obj) { return obj['avg']; });
        
        /* I don't really care to figure how to actually update the chart */
        barChart.destroy();
        barChart = new Chart(ctx).Bar(chartData, chartOptions);
    });
    
    
});

