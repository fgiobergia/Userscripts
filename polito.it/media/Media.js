// ==UserScript==
// @name        Media
// @namespace   http://fgiobergia.com
// @version     0.1
// @description Calcola media ponderata e aritmentica dei voti presenti nel Libretto Elettronico
// @match       https://didattica.polito.it/portal/page/portal/home/Studente*
// @match       https://didattica.polito.it/pls/portal30/sviluppo.pagina_studente.main*
// @copyright   2014+, Flavio Giobergia
// @license     http://opensource.org/licenses/MIT
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// ==/UserScript==


$(document).ready(function() {
    
    function calcWeightedAverage () {
        var wsum = 0, wnum = 0, cfu, rank, anum = 0, asum = 0;
		$('table').find('tr.policorpo').each(function(i) {
            if (i) {
                if ($(this).find('input').prop('checked')) {
                    var tds = $(this).find('td').each(function(j) {
						if (j==1) {
							cfu = $(this).text();
                    	}
                        else if (j==2) {
                            rank = $(this).text();
                        }
                	});
                    if (rank=='sup') {
                        rank = 25;
                    }
                    rank = parseInt(rank);
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
    $(parent).children().last().children().last().prop('colspan',3);
    $(parent).append('<tr><td class="policorpo" align="right"><b>Media ponderata:</b></td>             \
                      <td class="policorpo" align="center"><b><span id="fg_weighted"></span></b></td>  \
                      <td align="center" colspan="3">&nbsp;</td></tr>                                  \
                      <tr><td class="policorpo" align="right"><b>Media aritmentica:</b></td>           \
                      <td class="policorpo" align="center"><b><span id="fg_arithmetic"></span></b></td>\
                      <td align="center" colspan="3">&nbsp;</td></tr>');
    
    calcWeightedAverage();
    
    $('.fg_include').click(function() {
        calcWeightedAverage();
    });
    
    
});
