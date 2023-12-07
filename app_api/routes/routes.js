const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/authentication');
const ctrCars = require('../controllers/cars');

router.route('/').get(ctrlAuth.renderLogin);
router.route('/login').post(ctrlAuth.authenticateUser);
router.route('/logout').get(ctrlAuth.logout);
router.route('/register').get(ctrlAuth.renderRegistration);
router.route('/registerUser').post(ctrlAuth.registerUser);
router.route('/about').get(ctrCars.renderAbout);
router.route('/cars').get(ctrCars.CarList);
router.route('/:id').get(ctrCars.carInfo);

module.exports = router;