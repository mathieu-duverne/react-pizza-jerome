import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { useState, useEffect} from 'react';
import "./Planning.css"
import { useNavigate } from "react-router-dom";

const Planning = () => {
	
	const navigate = useNavigate();	
	let retrievedObject = localStorage.getItem('pizzas');
	const [pizzas, setPizzas] = useState(JSON.parse(retrievedObject));
	const [pizzas_name, setPizzasname] = useState([]);
	const [number_pizzas, setNumber_pizzas] = useState(0);
    const [reserved, setReserved] = useState([]);
    const [date, setDate] = useState(new Date("Y/m/d"));
	const [prep_time, setPrep_time] = useState("");
	const [modalisOpen, setmodalisOpen] = useState(false);
	const [debut, setDebut] = useState("");
	const [fin, setFin] = useState("");
	const [lst_pizza_object, setLst_pizza_object] = useState({});
    
	const [crenaux, setCrenaux] = useState([
		{"horaire" : "18h00 - 18h10", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]}, 
		{"horaire" : "18h10 - 18h20", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
		{"horaire" : "18h20 - 18h30", "disponibilité" : ["disponible", "disponible", "disponible", "disponible", "disponible", "disponible"]},
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

	useEffect(()=>{
        const loadReserved = async () => {
            const response = await axios.get(`${API}/reservations`);
            // console.log(response.data);
        }
        loadReserved();
    }
    ,[])
    
    useEffect(()=>{
		let time_one_pizza = 100;
		let count_pizzas = 0;
		let lstpizza = [];
		pizzas.forEach(pizza => {

			for (let i = 0; i < pizza.quantity; i++) {
				count_pizzas += 1;
				lstpizza.push(pizza.attributes.nom);
			}
		})
		setNumber_pizzas(count_pizzas);
		if (pizzas_name.length == []) {
			setPizzasname(lstpizza);
		}
    
		let response = secondsToms(number_pizzas * time_one_pizza);
		setPrep_time(response);
        let res_date_today = get_date_formated_today();
        setDate(res_date_today);
	},) 

	function secondsToms(d) {
		d = Number(d);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
		return mDisplay + sDisplay; 
	}
	function heure_to_ms(heure) {
		let h = heure.split("h");
		let ms = 0;
		ms = (h[0] * 3600 + h[1] * 60) * 1000;
		return ms;
	}

	function msToTime(duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
		return (
			(hours < 10 ? "0" + hours : hours) +
			":" +
			(minutes < 10 ? "0" + minutes : minutes) +
			":" +
			(seconds < 10 ? "0" + seconds : seconds)
		);
	}

    function get_date_formated_today(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        return year + "-" + month + "-" + day;
    }
	
	function calcul_debut(creneau_reserved, i){
		let creneau_reserved_split = creneau_reserved.split(" ");
		if( i == 0 ){
			// replace h per :
			let heure = creneau_reserved_split[0].replace("h", ":");
			return heure + ":00";
		}
		else {
			let res = heure_to_ms(creneau_reserved_split[0]);
			// convert i to ms
			let i_ms = (100*1000) * i + res;
			let response = msToTime(i_ms);
			return response;
		}
	}

    const onClickHandlerReservation = (creneau_reserved, i, act_dispo) => {
		// console.log(creneau_reserved_split[0]);
		if (act_dispo == "disponible") {
			console.log(i)
			console.log(creneau_reserved, i)
			let res = calcul_debut(creneau_reserved, i);
			console.log(res);
			setDebut(res);
		}
		crenaux.map((creneau, idx_creneau) => {
			if (creneau.horaire == creneau_reserved) {
				creneau.disponibilité.map((dispo, index_dispo) => {
					if (index_dispo === i){
					// creneau.disponibilité[index] = "indisponible";
					// iterate pizza & quantity on same index of disponibilité
						for(let y = 0; y < number_pizzas; y++){
							// si index > 5 fin de crenaux 
							if (index_dispo > 5){
								index_dispo = 0;
								idx_creneau += 1;	
							}
							// console.log(index_dispo + y)
							// console.log(pizzas_name[y])
							crenaux[idx_creneau].disponibilité[index_dispo] = pizzas_name[y];
							// creneau.disponibilité[index + y] = "indisponible";
							index_dispo += 1;
						}
					let res = calcul_debut(crenaux[idx_creneau].horaire, index_dispo);
					setFin(res);
					// console.log(crenaux[idx_creneau].horaire)
					// console.log(index_dispo)
					}
				})			
			}
		})
		// axios post creneau reserved
		// axios.post("http://localhost:1337/reservations", {
		// 	"debut_resa": debut,
		// 	"fin_resa": fin,
		// 	"pizza_reserved": fin,
		// 	"nom_client": client,
		// })
		setLst_pizza_object(Object.assign({}, pizzas_name));
				// axios.post("http://localhost:1337/reservations", {
		// 	"debut_resa": debut,
		// 	"fin_resa": fin,
		// 	"pizza_reserved": fin,
		// 	"nom_client": client,
		// })
		setCrenaux([...crenaux]);
		setmodalisOpen(true);


		// FAIRE LE POST DE LA RESERVATION
		// console.log(crenaux);
    }

	const [client, setclient] = useState('');
	const handleChangeGetClientName = event => {
		setclient(event.target.value);	
	  };


	const clickHandlerConfirmed_Resa = () => {
		// if client name is empty
		if (client == ''){
			alert("Veuillez renseigner votre nom");
		}
		console.log(date + debut)
		// 2022-11-18T18:30:40.000Z make this format with date & debut
		let date_debut = date + "T" + debut + ".000Z";
		let date_fin = date + "T" + fin + ".000Z";
		// console.log(date_debut)
		// else {
		const data = {
			"data":
			{
				"debut_resa":date_debut,
				"fin_resa":date_fin,
				"pizzas_reserved":lst_pizza_object,
				"client":client
			}}
		axios({
			method: 'post',
			url: 'http://localhost:1337/api/reservations',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			data : data,

		})
			.then(response => {
				// Handle success.
				// console.log("success");
				console.log(response);
				// vider pizzas du local storage
				localStorage.removeItem('pizzas');
				// navigate to display planning
				navigate("/reservation");
			}
			)	
			.catch(error => {
				// Handle error.
				console.log("An error occurred:", error.response);
			}
			);
		}

	return (
		// display pizzas in card
		<div className="planning">
			<div className="planning__container">
				<div className="planning__container__title">
					<h1>Planning</h1>
					<p>Le temps de préparation est de {prep_time}</p>
					<input 
          				type="date"
          				id='resa'
						value={date}
          				// onChange={(e) => setResa(e.target.value)}
          			/>
					{modalisOpen && (
       					<div className="popup">
							<div className="popup_container">		
        						<div className="popup_content">
          							{/* display le debut la fin avec un format sympa + les pizza et leur quantité */}
									<h5>Récapitulaitf de la commande : </h5>
									{pizzas.map((pizza, index) => (
										<p key={index}>{pizza.quantity} {pizza.attributes.nom}</p>
									))}
									<p>Le temps de préparation est de {prep_time}</p>
									{/* SET LE DEBUT IT'S OKAY MAINTENANT SET LA FIN */}
									<p>Reservation du {date} de {debut} à {fin} pour  pizzas</p>
									<div>
									<label style={{  borderRadius: "5px", outline: "none", fontSize: "16px", color: "#333", fontWeight: "300", letterSpacing: "1px",  textAlign: "center", padding: "10px 20px", display: "inline-block", margin: "10px 10px 10px 0" }}>
										Renseigner un nom client
									</label>
									<input 
										style={{marginBottom: "10px", padding: "5px", width: "50%", borderRadius: "5px", border: "1px solid #ccc", outline: "none", fontSize: "16px", color: "#333", fontWeight: "300", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center", transition: "all 0.3s ease-in-out", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#fff"}}
										onChange={handleChangeGetClientName}
										value={client}
										type="text" 
								/>
								</div>
        						</div>
								
								<button onClick={() => clickHandlerConfirmed_Resa("nom_client")}>
          							Reservation
        						</button>
        						<button onClick={() => setmodalisOpen(false)}>
          							Cancel
        						</button>
							</div>
       					</div>
      				)}
                    <div className="planning_container_week">
                        {/* foreach and display creneaux */}
						{/*  */}
						{crenaux.map((creneau, i) => (
							<div className="planning_card">
								<div className="planning_card_title">
									<span>{creneau.horaire}</span>
								</div>
								<div className="planning_card_body">
									{creneau.disponibilité.map((dispo, i) => (
										<div 
										 onClick={() => onClickHandlerReservation(creneau.horaire, i, dispo)} 
										 className="display_pizza_rerserved"
										 style={{ border: "2px solid green"}}>
											<span>{dispo}</span>
										</div>
									))}
								</div>
							</div>
						))}
                    </div>
				</div>
			</div>
		</div>
	);
};

export default Planning;