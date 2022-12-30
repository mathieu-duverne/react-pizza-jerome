import React from "react";
import axios from 'axios';
import { API } from "./constant";
import { useState, useEffect} from 'react';
import "./dsp_Planning.css"
import { useNavigate } from "react-router-dom";

const Display_Planning = () => {
    // axios get all reservations from today by default
    const [reservations, setReservations] = useState([]);

    useEffect(()=>{
        const loadReservations = async () => {
            const response = await axios.get(`${API}/reservations?populate=*`);
            console.log(response.data.data);
            setReservations(response.data.data)
        }
        loadReservations();
    },[])

    const CreateRows = (pizzas_reserved) => {
        console.log(pizzas_reserved);
        return(
        Object.keys(pizzas_reserved).map(key =>
            // console.log(pizzas_reserved[key])
            <span>{pizzas_reserved[key].pizza}, : {pizzas_reserved[key].pizza_note}</span>
        ));
    }

    return (
        // create a table with all reservations
        <div className="planning">
            <h1>Reservation</h1>
            <div className="planning__container">
                <table className="planning__container__table">
                    <thead>
                        <tr>
                            <th>Id de la commande</th>
                            <th>Client</th>
                            <th>Debut</th>
                            <th>Fin</th>
                            <th>pizza reserver</th>
                            <th>Information supplementaires</th>
                            <th>Prix total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr>
                                <td>{reservation.id}</td>
                                <td>{reservation.attributes.client}</td>
                                <td>{reservation.attributes.debut_resa}</td>
                                <td className="planning_container__table__td">{reservation.attributes.fin_resa}</td>
                                <td className="planning__container__table__td__scrollable">
                                    {CreateRows(reservation.attributes.pizzas_reserved)}
                                </td>
                                <td>{reservation.attributes.informations}</td>
                                <td>{reservation.attributes.prix_total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Display_Planning;