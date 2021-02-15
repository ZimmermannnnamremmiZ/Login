import axios from '../plugins/axios';

export async function getCountries() {
    try {
        let countries = await axios.get('/location/get-countries');
        countries.values;
        return countries
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};
// export async function getCity() {
//     try {
//         const response = await axios.get('/news');

//         console.log(response);
//         return response;
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(err);
//     }
// }