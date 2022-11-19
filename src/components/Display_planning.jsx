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

    return (
        // <div className="planning">
        //     <h1>Reservation</h1>
        //     <div className="planning__container">
        //         <div className="planning__container__header">
        //             <t className="planning__container__header__item">Id de la commande</div>
        //             <div className="planning__container__header__item">Client</div>
        //             <div className="planning__container__header__item">Debut</div>
        //             <div className="planning__container__header__item">Fin</div>
        //             <div className="planning__container__header__item">Fin</div>
        //         </div>
        //         <div className="planning__container__body">
        //             {reservations.map(reservation => (
        //                 <div className="planning__container__body__item">
        //                     <div className="planning__container__body__item__content">{reservation.id}</div>
        //                     <div className="planning__container__body__item__content">{reservation.attributes.client}</div>
        //                     <div className="planning__container__body__item__content">{reservation.attributes.debut_resa}</div>
        //                     <div className="planning__container__body__item__content">{reservation.attributes.fin_resa}</div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr>
                                <td>{reservation.id}</td>
                                <td>{reservation.attributes.client}</td>
                                <td>{reservation.attributes.debut_resa}</td>
                                <td>{reservation.attributes.fin_resa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Display_Planning;