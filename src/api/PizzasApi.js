import axios from "./axios";
import { API } from "../components/constant";

async function getAllPizzasPopulate  () {

    return new Promise((resolve, reject) => {
        axios.get(`${API}/pizzas?populate=*`)
        .then(response => {
            resolve(response.data.data)
        })
        .catch(error => {
            console.log(error)
            resolve(error.response)
        });
    })

}

export default getAllPizzasPopulate;