// services/countryService.js
import axios from 'axios';

const DATE_NAGER_API = 'https://date.nager.at/api/v3';
const COUNTRIES_NOW_API = 'https://countriesnow.space/api/v0.1';
const countriesService = {};

countriesService.fetchAvailableCountries = async () => {
    try {
        const response = await axios.get(`${DATE_NAGER_API}/AvailableCountries`);
        return response.data;
    } catch (error) {
        throw { status: 500, message: 'Failed to fetch countries' };
    }
};

countriesService.fetchCountryInfo = async (countryCode) => {
    try {
        const borderResponse = await axios.get(`${DATE_NAGER_API}/CountryInfo/${countryCode}`);
        console.log(borderResponse.data);
        const populationResponse = await axios.post(`${COUNTRIES_NOW_API}/countries/population`, { country: borderResponse.data.commonName });
        const flagResponse = await axios.post(`${COUNTRIES_NOW_API}/countries/flag/images`, { country: borderResponse.data.commonName });

        const borderCountries = borderResponse.data.borders || [];
        const populationData = populationResponse.data.data || [];
        const flagUrl = flagResponse.data.data ? flagResponse.data.data.flag : '';

        return {
            ...borderResponse.data,
            borders: borderCountries,
            population: populationData,
            flag: flagUrl,
        };
    } catch (error) {
        console.log(error);
        throw { status: 500, message: 'Failed to fetch country info' };
    }
};


export default countriesService;