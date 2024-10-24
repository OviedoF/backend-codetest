import countryService from '../services/countries.service.js';

const countriesController = {};

countriesController.getAvailableCountries = async (req, res, next) => {
    try {
        const countries = await countryService.fetchAvailableCountries();
        res.json(countries);
    } catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
};

countriesController.getCountryInfo = async (req, res, next) => {
    const { countryCode } = req.params;

    // Validar el código de país
    if (!/^[A-Z]{2}$/.test(countryCode)) {
        return next({ status: 400, message: 'Invalid country code. It should be a 2-letter uppercase code.' });
    }

    try {
        const countryInfo = await countryService.fetchCountryInfo(countryCode);
        res.json(countryInfo);
    } catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
};

export default countriesController;