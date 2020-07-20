const { flights }       = require('./test-data/flightSeating');
const { reservations }  = require('./test-data/reservations')
const { uuid }          = require('uuidv4')

function findId(id) {
    return reservations.find((client) => {
        // console.log('1', client.id === id)
        // console.log('2', client)
        // console.log('3', typeof client.id)
        // console.log('4', typeof id)
        return client.id === id
    })
}

const handleFlight = (req, res) => {
    const { flightNumber } = req.params;
    const flight = flights[flightNumber]
    res.send(flight)
}

const handleReservation = (req, res) => {
    const id = uuid()
    const reservation = { id, ...req.body }
    reservations.push(reservation)
    res.json(id)
}


//render confirm page with info

 function handleConfirmation (req, res) {
    const { id } = req.params
    // console.log(id)
    const client =  findId(id)
    console.log(client)
    if (client !== undefined) {
        res.render('pages/confirm', {client})
    } else { 
        console.log('keep trying')
    }
}

module.exports = { handleFlight, handleReservation, 
    handleConfirmation
}