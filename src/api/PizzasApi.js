import axios from "./axios";

async function  getAllPizzas  () {

    return new Promise((resolve, reject) => {
        axios.get('http://localhost:1337/api/pizzas')
        .then(response => {
            resolve(response.data.data)
            // console.log(response.data.data)

        })
    })

}

export default getAllPizzas;