import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001', //Change to production URL 
    withCredentials: true
});