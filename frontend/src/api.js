import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const header = ($token) => {
    return {headers: {'Authorization': `Bearer ${JSON.parse($token)}`}}
}

export default {
    login: (credentials) => axios.post(`${baseUrl}/login`, credentials),
    logout: () => axios.post(`${baseUrl}/logout`, {}, header(localStorage.getItem('token'))),
    publish: (values) => axios.post(`${baseUrl}/apartment`, values, header(localStorage.getItem('token'))),
    book: (values) => axios.post(`${baseUrl}/booking`, values, header(localStorage.getItem('token'))),
    listApartment: (filters) => axios.get(`${baseUrl}/apartment?features=${filters}`),
    listFeatures: () => axios.get(`${baseUrl}/feature`),
    listBookings: () => axios.get(`${baseUrl}/booking`),
    updateBooking: (values) => axios.post(`${baseUrl}/booking/update`, values, header(localStorage.getItem('token'))),
}