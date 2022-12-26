import axios from "axios";
import { API } from "../components/constant";

async function newBooking(creneaux, pizza){
    return new Promise((resolve, reject) => {
        axios.post(`${API}/reservations`,{
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