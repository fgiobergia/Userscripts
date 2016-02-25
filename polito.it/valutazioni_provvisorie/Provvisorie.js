// ==UserScript==
// @name        Valutazioni provvisorie
// @namespace   http://fgiobergia.com
// @version     0.2
// @description Segnala la presenza di valutazioni nella sezione Valutazioni Provvisorie
// @match       https://didattica.polito.it/portal/page/portal/home/Studente*
// @match       https://didattica.polito.it/pls/portal30/sviluppo.pagina_studente*main*
// @copyright   2014+, Flavio Giobergia
// @license     http://opensource.org/licenses/MIT
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// ==/UserScript==

$(document).ready(function() {
    $.ajax("https://didattica.polito.it/pls/portal30/sviluppo.esami_da_registrare").done(function(data) {
        var temp = '?';
        if (data.indexOf("Non ci sono valutazioni disponibili per la pubblicazione")!=-1) {
            temp = 0;
        }
        else {
            data = data.replace(/http:\/\//gi,'https://');
            temp = $(data).find('#myTable').find('tbody').children(':not(tr[class^=hidden])').size();
        }
        
        $('a[href="/pls/portal30/sviluppo.esami_da_registrare"]').append(" <b>("+temp+")</b>");
    });
});
