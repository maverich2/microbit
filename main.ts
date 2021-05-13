/**
 * messaggi scambiati tra slaves e master:
 * 
 * UN
 * 
 * U=iniziale utente
 * 
 * N=numero tentato d'indovinare
 * 
 * il master risponde con:
 * 
 * UC
 * 
 * U=iniziale utente
 * 
 * C=risultato (k=indovinato, < o >, r=reset degli slaves)
 */
function aggiorna_lista (testo: string) {
    attuale = punteggio[lista.indexOf(testo)]
    attuale += 1
    punteggio[lista.indexOf(testo)] = attuale
}
input.onButtonPressed(Button.A, function () {
    casuale = randint(0, 9)
    basic.showNumber(casuale)
    // go!
    radio.sendString("g")
})
radio.onReceivedString(function (receivedString) {
    utente = receivedString.substr(0, 1)
    aggiungi_lista(utente)
    tentativo = parseFloat(receivedString.substr(1, 1))
    if (tentativo == casuale) {
        radio.sendString("" + utente + "k")
        aggiorna_lista(utente)
        basic.showString(utente)
        basic.pause(1000)
        // reset
        radio.sendString("r")
    } else if (tentativo > casuale) {
        radio.sendString("" + utente + "<")
    } else {
        radio.sendString("" + utente + ">")
    }
})
input.onButtonPressed(Button.B, function () {
    output = ""
    for (let indice = 0; indice <= lista.length - 1; indice++) {
        output = "" + output + lista[indice]
        output = "" + output + "="
        output = "" + output + punteggio[indice]
        output = "" + output + ";"
    }
    basic.showString(output)
})
function aggiungi_lista (testo: string) {
    if (lista.indexOf(testo) == -1) {
        lista.push(testo)
        punteggio.push(0)
    }
}
let output = ""
let tentativo = 0
let utente = ""
let casuale = 0
let attuale = 0
let punteggio: number[] = []
let lista: string[] = []
radio.setGroup(101)
lista = []
punteggio = []
