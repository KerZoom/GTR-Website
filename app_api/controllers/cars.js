const Model = require('../models/carSchemas');

const renderAbout = (req, res) => {
    res.render('about', { title: 'About' });
};

const CarList = async (req, res) => {
    console.log('Response object:', res);
    try {
        const data = await Model.find();
        res.render('car-list', {
            title: 'Cars',
            pageHeader: {
                strapline: 'List of all Nissan Cars available'
            },
            cars: data.map(car => ({
                id: car._id,
                model: car.CarModel,
                year: car.Year,
                horsepower: car.HorsePower,
                aspiration: car.Aspiration,
                fuel: car.Fuel,
                img: '/images/' + car.CarModel + '.png'
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const carInfo = async function (req, res) {
    try {
        const carID = req.params.id;

        if (!carID) {
            return res.status(400).json({ message: 'CarID is missing in the request' });
        }

        console.log('Requested CarID:', carID);

        const car = await Model.findOne({ _id: carID });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.render('car-info', {
            title: car.CarModel,
            pageHeader: {
                title: car.CarModel
            },
            details: {
                model: car.CarModel,
                year: car.Year,
                bodyStyle: car.BodyStyle,
                fuel: car.Fuel,
                engineCode: car.EngineCode,
                displacement: car.Displacement,
                horsePower: car.HorsePower,
                torque: car.Torque,
                cylinders: car.Cylinders,
                valves: car.Valves,
                aspiration: car.Aspiration,
                driveTrain: car.Drivetrain,
                gearbox: car.Gearbox,
                seats: car.Seats,
                doors: car.Doors,
                img: '/images/' + car.CarModel + '.png'
            }
        });
    } catch (error) {
        console.error('Error in carInfo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    CarList,
    carInfo,
    renderAbout
};