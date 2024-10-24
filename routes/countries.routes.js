// routes/countriesRoutes.js
import express from 'express';
import countriesController from '../controllers/countries.controller.js';

const router = express.Router();

router.get('/countries', countriesController.getAvailableCountries);
router.get('/country/:countryCode', countriesController.getCountryInfo);

export default router;