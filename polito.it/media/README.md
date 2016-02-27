# Media

![risultato dello script 'Media.js'](https://raw.githubusercontent.com/fgiobergia/Userscripts/master/polito.it/media/media.png)

Questo userscript calcola la media ponderata (pesata con i crediti) e aritmetica dei voti presenti nel Libretto Elettronico.

È possibile includere/escludere esami a piacimento nel calcolo della media selezionando o meno la checkbox presente al fianco di ciascun esame (in questo modo è possibile, per esempio, escludere i crediti peggiori che non vengono tenuti in considerazione al momento del calcolo del voto di laurea). 

Se nessun esame viene selezionato, la media risultante sarà NaN. Il numero di crediti visualizzato (già dal sito, non dall'userscript) non viene aggiornato quando vengono cambiati gli esami selezionati (ma vengono tenuti in considerazione nel calcolo della media ponderata). 

**Update v1.0**
- Compatibile con la nuova versione del sito del Politecnico. Continua a funzionare con la versione vecchia, ma i nuovi corsi che verranno aggiunti manualmente non avranno righe di colori alternati (per non aggiungere codice ulteriore che sarà poi inutile a passaggio completato)

**Update v0.8**: 
- possibilità di modificare le righe presenti (numero di CFU e voto relativo) posizionandosi con il cursore sul campo da modificare
- possibiltà di aggiungere nuovi voti (specificando nome della materia, numero di CFU e voto) (aggiunto un pulsante per aggiungere nuovi voti: i campi possono quindi essere modificati posizionandosi con il cursore sui vari valori)

