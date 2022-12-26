import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { useState, useEffect} from 'react';
import "./Planning.css"
import { useNavigate } from "react-router-dom";

const PlanningV2 = () => {
	
	const navigate = useNavigate();	
	let retrievedObject = localStorage.getItem('pizzas');
	const [pizzas, setPizzas] = useState(JSON.parse(retrievedObject));
	const [pizzas_name, setPizzasname] = useState([]);
	const [number_pizzas, setNumber_pizzas] = useState(0);
    const [reserved, setReserved] = useState([]);
    const [date, setDate] = useState(get_date_formated_today());
	const [prep_time, setPrep_time] = useState("");
	const [modalisOpen, setmodalisOpen] = useState(false);
	const [modalisOpenFalse, setmodalisOpenFalse] = useState(false);
	const [debut, setDebut] = useState("");
	const [fin, setFin] = useState("");
	const [lst_pizza_object, setLst_pizza_object] = useState({});
	const [pizza_reserved, setPizzaReserved] = useState({})

	// reformat date to dd/mm/yyyy
	function get_date_formated_today(){
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}
    
	const [crenaux, setCrenaux] = useState([
		{"horaire" : "18h00 - 18h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]}, 
		{"horaire" : "18h10 - 18h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "18h20 - 18h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "18h30 - 18h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]}, 
		{"horaire" : "18h40 - 18h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]}, 
		{"horaire" : "19h00 - 19h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]}, 
		{"horaire" : "19h10 - 19h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "19h20 - 19h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "19h30 - 19h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "19h40 - 19h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "19h50 - 20h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "20h00 - 20h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "20h10 - 20h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "20h20 - 20h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "20h30 - 20h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "20h40 - 20h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "20h50 - 21h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "21h00 - 21h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "21h10 - 21h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "21h20 - 21h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "21h30 - 21h40", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "21h40 - 21h50", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "21h50 - 22h00", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]}
	]);

	const [data, setData] = useState([]);
	useEffect(()=>{
        const loadReserved = async (date) => {
            const response = await axios.get(`${API}/reservations?filters[debut_resa][$containsi]=${date}`);
			setData(response.data.data);
        }
        loadReserved(date);
		console.log(date)
    }
    ,[date]);

    // function structured_planning_with_pizzas_reserved(){
    //     crenaux.map((crenau, i) => (
    //         console.log(crenau)
    //     	console.log(data)
    //     ))
    // }
	
	const setDateQuery = (e) => {
		console.log(e)
		setDate(e);
	}


	return (
		// display pizzas in card
		<div className="plannings">
			<div className="planning__containers">
				<div className="planning__container__title">
					<h1>Planning</h1>
					<p>Le temps de préparation est de {prep_time}</p>
					{/* <span>avancer toutes les commandes de </span>
					<span>reculer toutes les commandes de </span> */}
					<input 
          				type="date"
          				id='resa'
						value={date}
          				onChange={(e) => setDateQuery(e.target.value)}
          			/>
					
                    <div className="planning_container_week">
                        {/* foreach and display creneaux */}
						{/*  */}
						{crenaux.map((creneau, i) => (
							<div className="planning_card">
								<div className="planning_card_title">
									<span>{creneau.horaire}</span>
									<span>{creneau.disponibilité.length}</span>
								</div>
								<div className="planning_card_body">
									{/* {creneau.disponibilité.map((dispo, i) => (
										<div 
											 onClick={() => onClickHandlerReservation(creneau.horaire, i, dispo)} 
											 className="display_pizza_rerserved"
											 style={{ border: "2px solid #ccc"}}>
											<span style={{ color: `${checkColor(dispo)}`}} >{dispo}</span>
										</div>
									))} */}
								</div>
							</div>
						))}
                    </div>
				</div>
			</div>
		</div>
	);
};

export default PlanningV2;