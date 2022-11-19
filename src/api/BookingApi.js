import { resolveTo } from "@remix-run/router";
import axios from "./axios";
const LOGIN_URL = '/api/auth/local';

async function newBooking(creneaux, pizza){
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:1337/api/reservations',{
            "data":{
                pizza: pizza,
                creneaux: creneaux
            }
        })
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            resolve (error.response)
        });
    })
}

// async function getBooking() {
//     axios.get('http://localhost:1337/api/reservations')
//     .then(res => {
//         // console.log(res)
//     })
// }
 export default newBooking;