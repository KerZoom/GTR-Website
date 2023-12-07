const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    CarID: {
        required: true,
        type: Number
    },
    CarModel: {
        required: true,
        type: String
    },
    Year: {
        required: true,
        type: Number
    },
    BodyStyle: {
        required: true,
        type: String
    },
    Fuel: {
        required: true,
        type: String
    },
    EngineCode: {
        required: true,
        type: String
    },
    Displacement: {
        required: true,
        type: Number
    },
    HorsePower: {
        required: true,
        type: Number
    },
    Torque: {
        required: true,
        type: Number
    },
    Cylinders: {
        required: true,
        type: Number
    },
    Valves: {
        required: true,
        type: Number
    },
    Aspiration: {
        required: true,
        type: String
    },
    Drivetrain: {
        required: true,
        type: String
    },
    Gearbox: {
        required: true,
        type: String
    },
    Seats: {
        required: true,
        type: Number
    },
    Doors: {
        required: true,
        type: Number
    },
}, { collection: 'gtr' });

module.exports = mongoose.model('Car', carSchema, 'gtr');