'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const {
    handleFlight, handleReservation, handleConfirmation, handleViewReservation
} = require('./handlers')


express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    .set("view engine", "ejs")
    
    // endpoints
    .get('/flights/:flightNumber', handleFlight)
    .post('/reservation', handleReservation)
    .get('/confirmed/:id', handleConfirmation)
    .get('/view-reservation/:email', handleViewReservation)
    .use((req, res) => res.send('Not Found'))
    .listen(process.env.PORT || 5000, () => console.log(`Listening on port 5000`));