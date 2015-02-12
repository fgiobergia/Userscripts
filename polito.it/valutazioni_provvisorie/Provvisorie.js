// ==UserScript==
// @name        Valutazioni provvisorie
// @namespace   http://fgiobergia.com
// @version     0.2
// @description Segnala la presenza di valutazioni nella sezione Valutazioni Provvisorie
// @match       https://didattica.polito.it/portal/page/portal/home/Studente*
// @match       https://didattica.polito.it/pls/portal30/sviluppo.pagina_studente.main*
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
           	var page = $.parseHTML(data);
            for (var i=0;i<page.length;i++) {
                if (page[i].constructor.name=='HTMLFontElement') {
                    for (var j=0;j<page[i].children.length;j++) {
                        if (page[i].children[j].id=='myTable') {
                    		temp = page[i].children[j].rows.length-1;
                            i=page.length;
                            break;
                        }
                    }
                }
            }
        }
        
        $('a[href="/pls/portal30/sviluppo.esami_da_registrare"] b').append(" ("+temp+")");
    });
});
