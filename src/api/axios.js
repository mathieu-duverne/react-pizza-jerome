import axios from 'axios';
import { API } from "../components/constant";


export default axios.create({
    baseURL: API
});