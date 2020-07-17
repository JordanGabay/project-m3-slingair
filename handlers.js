const { flights }       = require('./test-data/flightSeating');
const { reservations }  = require('./test-data/reservations')
const { uuid }          = require('uuidv4')

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

module.exports = { handleFlight, handleReservation}