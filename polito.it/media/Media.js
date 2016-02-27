// ==UserScript==
// @name        Media
// @namespace   http://fgiobergia.com
// @version     1.0
// @description Calcola media ponderata e aritmentica dei voti presenti nel Libretto Elettronico
// @match       https://didattica.polito.it/portal/page/portal/home/Studente*
// @match       https://didattica.polito.it/pls/portal30/sviluppo.pagina_studente*main*
// @copyright   2014+, Flavio Giobergia
// @license     http://opensource.org/licenses/MIT
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// ==/UserScript==


$(document).ready(function() {
    
    function calcWeightedAverage () {
        var wsum = 0, wnum = 0, cfu, rank, anum = 0, asum = 0;
        $('table').find('tr.policorpo').each(function(i) {
            if (i) {
                if ($(this).find('input[type=checkbox]').prop('checked')) {
                    var tds = $(this).find('td').each(function(j) {
                        if (j==1) {
                            cfu = $(this).children().first().val();
                        }
                        else if (j==2) {
                            rank = $(this).children().first().val();
                        }
                    });
                    if (isNaN(parseInt(rank))) {
                        rank = 25;
                    }
                    rank = parseFloat(rank);
                    cfu = parseInt(cfu);
                    wsum += rank*cfu;
                    wnum += cfu;
                    asum += rank;
                    anum++;
                }
            }    
        });
        $('#fg_weighted').html((wsum/wnum).toFixed(2));
        $('#fg_arithmetic').html((asum/anum).toFixed(2));
    }
    
    function addRow() {
        var row = $('table').find('tr.policorpo').slice(-1);
        row.after("<tr class='policorpo fg_dummy'>"+row.html()+"</tr>");
        var new_row = row.next();
        $(new_row).find('input').css('background-color',$(new_row).css('background-color'));
        new_row.children().first().html("<input value='Dummy exam'>");
        new_row.children().first().children().first().css('background-color',$(new_row).css('background-color'))
        .css('border','0px').css('width','100%').css('font-size','12px');
        new_row.children().slice(1,2).children().first().val(Math.floor(Math.random()*3+3)*2);
        new_row.children().slice(2,3).children().first().val(Math.floor(Math.random()*13+18));
        
        $('.fg_include').click(calcWeightedAverage);
        $('.fg_rank').blur(calcWeightedAverage);
        $('.fg_cfu').blur(calcWeightedAverage);
        calcWeightedAverage();
    }
    
    var parent;
    $('table').find('tr.policorpo').each(function(i) {
        if (!i) {
            parent = $(this).parent();
            $(this).append('<td align="center"><b>Includi</b></td>');
        }
        else {
            $(this).append('<td align="center"><input type="checkbox" class="fg_include" checked></td>');
        }
    });
    $(parent).children().slice(-2,-1).after('<tr style = "border-top: 1px solid #ddd;"><td class="policorpo"><input id = "fg_add_exam" type="button" value="Aggiungi insegnamento"></td><td/><td/><td/><td/></tr>');
    $(parent).children().last().children().last().prop('colspan',3);
    $(parent).append('<tr><td class="policorpo" align="right"><b>Media ponderata:</b></td>             \
                      <td class="policorpo" align="center"><b><span id="fg_weighted"></span></b></td>  \
                      <td align="center" colspan="3">&nbsp;</td></tr>                                  \
                      <tr><td class="policorpo" align="right"><b>Media aritmentica:</b></td>           \
                      <td class="policorpo" align="center"><b><span id="fg_arithmetic"></span></b></td>\
                      <td align="center" colspan="3">&nbsp;</td></tr>');
   
    
    
    $('table').find('tr.policorpo').each(function(i) {
        if (i) {
            var tds = $(this).find('td').each(function(j,v) {
                if (j==1 || j==2) {
                    var val = $(this).text();
                    var label = (j==1) ? 'fg_cfu' : 'fg_rank';
                    $(this).html("<input class = '"+label+"' value='"+val+"'>");
                    $(this).children().css('border','0px').css('background-color',$(this).parent().css('background-color'))
                    .css('width','60px').css('text-align','center').css('font-size','12px');
                }
            });
        }
    });
    
    /* compute the weighted average on loading */
    calcWeightedAverage();
    
    /* listeners */
    $('.fg_include').click(calcWeightedAverage);
    $('.fg_rank').blur(calcWeightedAverage);
    $('.fg_cfu').blur(calcWeightedAverage);
    $('#fg_add_exam').click(addRow);
    $('.fg_rank').keydown(function(k) {
        if (k.keyCode == 13) {
            calcWeightedAverage();
        }
    });
    $('.fg_cfu').keydown(function(k) {
        if (k.keyCode == 13) {
            calcWeightedAverage();
        }
    });
});