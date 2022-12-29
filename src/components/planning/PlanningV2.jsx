import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { DefaultPlanning } from "./DefaultPlanning";
import { useState, useEffect} from 'react';
import "./Planning.css"

const PlanningV2 = () => {
	

    const [date, setDate] = useState(get_date_formated_today());


	// reformat date to dd/mm/yyyy
	function get_date_formated_today(){
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}
    
	const [crenaux, setCreneaux] = useState(DefaultPlanning)
	const [lst_pizzas_reserved, set_lst_pizzas_reserved] = useState([])

	useEffect(()=>{
        const loadReserved = async (date) => {
            const response = await axios.get(`${API}/reservations?filters[debut_resa][$containsi]=${date}`);
			structured_planning_with_pizzas_reserved(response.data.data)
        }
        loadReserved(date);
    }
    ,[date]);

	function convertToDate(timeString) {
		// Split the time string into hour and minute
		const [hour, minute, seconds] = timeString.split(':');
	  
		// Create a new Date object
		const date = new Date();
	  
		// Set the hour and minute on the Date object
		date.setHours(hour);
		date.setMinutes(minute);
		date.setSeconds(seconds);
		return date;
	  }

	function calculateDateDifference(startDate, endDate) {
		// Get the difference between the two dates in milliseconds
		const difference = endDate - startDate;
		
		// Calculate the number of hours, minutes, and seconds
		const hours = Math.floor(difference / (1000 * 60 * 60));
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);
		
		// Return the result as an object
		return { minutes, seconds };
	  }

	
	function divideTime(minutes, seconds, divisorMinutes, divisorSeconds) {
		// Convert the minutes and seconds to total seconds
		const totalSeconds = minutes * 60 + seconds;
	
		// Convert the divisor minutes and seconds to total seconds
		const divisorTotalSeconds = divisorMinutes * 60 + divisorSeconds;
	
		// Divide the total seconds by the divisor total seconds
		const result = totalSeconds / divisorTotalSeconds;
	
		// Return the result
		return result;
	}
    function structured_planning_with_pizzas_reserved(data_resarvation){
        crenaux.map((crenau, i) => {
			let tmp_nbr_pizza = 0
			data_resarvation.map((resa) => {
				let debut_crenau = crenau.horaire.split("-")[0].replace("h", ":") + ":00"
				const date_debut_crenau = convertToDate(debut_crenau)
				let fin_crenau = crenau.horaire.split("-")[1].replace("h", ":") + ":00"
				const date_fin_crenau = convertToDate(fin_crenau)

				
				let debut_resa = resa.attributes.debut_resa.split("T")[1].split(".")[0].replace(" ", "");
				const date_debut_resa = convertToDate(debut_resa)
				let fin_resa = resa.attributes.fin_resa.split("T")[1].split(".")[0].replace(" ", "");
				const date_fin_resa = convertToDate(fin_resa)
				
				if(date_debut_crenau.getHours() === date_debut_resa.getHours() && date_debut_resa.getMinutes() >= date_debut_crenau.getMinutes() && date_fin_resa <= date_fin_crenau){
					// if(crenau.reservation)
					if(!lst_pizzas_reserved.includes(resa.id)){

					let res = calculateDateDifference(date_debut_resa, date_fin_resa)
					
					resa.tmp_estimate = res.minutes+"m"+res.seconds+"s"
					res = divideTime(res.minutes, res.seconds, 1, 40)
					resa.nbrPizza = res
					tmp_nbr_pizza += res
					lst_pizzas_reserved.push(resa.id)
					crenau.reservation.push(resa)
					crenau.nbr_pizza_per_crenau = tmp_nbr_pizza					
					}
				}	
			})
		})
		setCreneaux([...crenaux])
    }
	console.log(crenaux)

	
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
									<span></span>
								</div>
								<span>{creneau.nbr_pizza_per_crenau}</span>
								{creneau.reservation.length != 0 ? (

        							<div style={{ border: "2px solid #ccc"}}>
										{/* <h5>{creneau.reservation.nbrPizza}</h5> */}
									  		{Object.keys(creneau.reservation).map(idx_resa => (

												<div className="planning_card_body">
													<h5>{creneau.reservation[idx_resa].attributes.client}</h5>
        							    		{Object.keys(creneau.reservation[idx_resa].attributes.pizzas_reserved).map(idx_pizza_reserved =>(	
													<span>{creneau.reservation[idx_resa].attributes.pizzas_reserved[idx_pizza_reserved].pizza}</span>
												))}
									  			</div>

        							  		))}
        							</div>
      							) : null}
							</div>
						))}
                    </div>
				</div>
			</div>
		</div>
	);
};

export default PlanningV2;



								// <div className="planning_card_body">
								// 		<div 
								// 			className="display_pizza_rerserved"
								// 			style={{ border: "2px solid #ccc"}}>
								// 		</div>
								// </div>