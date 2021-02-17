import axios from '../plugins/axios';

export async function getCountries() {
    try {
        let countries = await axios.get('/location/get-countries');
        return countries;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export async function getCities(key) {
    try {
        let cities = await axios.get(`location/get-cities/${key}`);
        return cities;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}