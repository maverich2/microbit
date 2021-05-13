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
 * C=risultato (k=indovinato, < o >)
 */
input.onButtonPressed(Button.A, function () {
    casuale = randint(0, 9)
    basic.showNumber(casuale)
    // go!
    radio.sendString("g")
})
radio.onReceivedString(function (receivedString) {
    utente = receivedString.substr(0, 1)
    tentativo = parseFloat(receivedString.substr(1, 1))
    if (tentativo == casuale) {
        radio.sendString("" + utente + "k")
    } else if (tentativo > casuale) {
        radio.sendString("" + utente + "<")
    } else {
        radio.sendString("" + utente + ">")
    }
})
let tentativo = 0
let utente = ""
let casuale = 0
radio.setGroup(101)
