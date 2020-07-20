const { flights }       = require('./test-data/flightSeating');
const { reservations }  = require('./test-data/reservations')
const { uuid }          = require('uuidv4')

function findId(id) {
    return reservations.find((client) => client.id === id)
}

const handleFlight = (req, res) => {
    const { flightNumber } = req.params;
    const flight = flights[flightNumber]
    res.send(flight)
}

const handleReservation = (req, res) => {
    const reservation = { id: uuid(), ...req.body }
    reservations.push(reservation)
    res.send(reservations)
}

function handleConfirmation (req, res) {
    const clientId = req.params.id
    const bookedClient = findId(clientId)
    if (bookedClient !== undefined) {
        res.render('./pages/confirm', {client: bookedClient})
    } else { 
        console.log('keep trying')
    }
}

module.exports = { handleFlight, handleReservation, handleConfirmation}