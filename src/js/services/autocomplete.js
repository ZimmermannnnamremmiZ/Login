import axios from '../plugins/axios';

export async function getCountries() {
            const countries = await axios.get('/location/get-countries');
            console.log(countries)
            return countries;
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