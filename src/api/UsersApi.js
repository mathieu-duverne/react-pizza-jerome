import axios from "axios";
import { API } from "../components/constant";


const LOGIN_URL = '/api/auth/local';


async function getMe(jwt){
    return new Promise((resolve, reject) => {
        axios.get(`${API}/users/me?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,//  when user login there will be a jwt in reponse so you can pass user jwt in here 
            },
        })
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            resolve (error.response)
        })
       
    })
}

async function connect(identifier, password){

    return new Promise((resolve, reject) => {
        axios.post(LOGIN_URL, {
            identifier: identifier,
            password: password
        })
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            resolve (error.response)
        });
    })
}

export default {getMe, connect};