// ==UserScript==
// @name        Depenna
// @namespace   http://fgiobergia.com
// @version     0.1
// @description Tira una "riga" sugli esami già conseguiti presenti nel carico didattico
// @match       https://didattica.polito.it/portal/page/portal/home/Studente*
// @match       https://didattica.polito.it/pls/portal30/sviluppo.pagina_studente.main*
// @copyright   2014+, Flavio Giobergia
// @license     http://opensource.org/licenses/MIT
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// ==/UserScript==

$(document).ready(function() {
    var xms = [];
    $('table').find('tr.policorpo').each(function(i) {
	    if (i) {
            xms.push($(this).children().first().text());
        }
	});
	
    $('table').find('td.policorpo').each(function(i) {
        $(this).find('a').each(function(j) {
            if ($.inArray($(this).text().trim(),xms)>=0) {
                $(this).css('text-decoration','line-through');
            }
        });
    });
});
