import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { useNavigate } from "react-router-dom";
import { setPizzas } from "../helpers";

import { useState, useEffect} from 'react';

import "./AutoComplete.css"

const AutoComplete = () => {
    
  const [pizzas, setPizza] = useState([]);
  const [text, setText] = useState("");
  const [display_pizzas, setDisplay] = useState([]);
  const [display_pizzas_selected, setDisplay_pizzas_selected] = useState([]);
  const [success_message, set_success_message] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const loadPizzas = async () => {
    const response = await axios.get(`${API}/pizzas?populate=*`);	
          setPizza(response.data.data)
          setDisplay(response.data.data);
    }
    loadPizzas();
    if (localStorage.getItem('pizzas') != null) {
      let retrievedObject = localStorage.getItem('pizzas');
      setDisplay_pizzas_selected(JSON.parse(retrievedObject));
    }

  },[])

  // ---------- COMPOSANT AUTOCOMPLETE ------------ //
  const onChangeHandler = (text) => {
    // initialisation du tableau des matchs
    let matches = [];
    // si il y a au moins un caractère dans le champ de recherche
    if (text.length > 0) {
      // Fonction du filtre de react
      matches = pizzas.filter(pizza => {
        const regex = new RegExp(`${text}`, "gi");
        return pizza.attributes.nom.match(regex)
      })
      // set le display qui change en fonction de la recherche
      setDisplay(matches);
    }
    // else rien dans search bar
    else{
      // set le display a toutes les pizzas
      setDisplay(pizzas);
    }
    // set le text de la search bar
    setText(text)
  }

// ---------- COMPOSANT CLICK ON PIZZA (change style, create list of selected pizza) ------------ //
  const handleClick = (id) => {

    // creer une liste des id des pizzas selectionnées a partir de display_pizzas_selected
    const lstid = display_pizzas_selected.map(pizza => pizza.id);

    if (!lstid.includes(id)) {
      // setId_selected([...id_selected, id_pizza_selected]);
      display_pizzas_selected.push({id, quantity: 1});
    } else {
		const index = display_pizzas_selected.findIndex((item) => item.id === id);
		display_pizzas_selected[index].quantity += 1;	
	}   
    refresh_lst_selected(display_pizzas_selected);
    
};

const refresh_lst_selected = (display_pizzas_right) => {
  let matches = {};

    if (display_pizzas_right.length > 0) {
      // make a list of if of lsttest object
      const lstid = display_pizzas_right.map(pizza => pizza.id);

      matches = pizzas.filter(pizza => {
        return lstid.includes(pizza.id)
      })
    } else {
      setDisplay_pizzas_selected([]);
      // localStorage.setItem('pizzas', JSON.stringify([]));
      // delete localStorage.pizzas;
			localStorage.removeItem('pizzas');
      
      }
    
    if (matches.length > 0) { 
      // add a quantity 1 to each pizza in matches object
      matches = matches.map((item) => {
        const quantity = display_pizzas_right.find((item2) => item2.id === item.id).quantity;
        return {...item, quantity: quantity}
      })
      setDisplay_pizzas_selected(matches);
    }
}

// create a function ClickLessQuantity to decrease quantity of pizza selected
const ClickLessQuantity = (id) => {
  // find the index of the pizza selected
  const index = display_pizzas_selected.findIndex((item) => item.id === id);
  // if the quantity is > 1, decrease the quantity
  if (display_pizzas_selected[index].quantity > 1) {
    display_pizzas_selected[index].quantity -= 1;

  }
  // else remove the pizza from the list
  else {
    display_pizzas_selected.splice(index, 1);

  }
  refresh_lst_selected(display_pizzas_selected)
}

const ClickSuppr = (id) => {
  // find the index of the pizza selected
  const index = display_pizzas_selected.findIndex((item) => item.id === id);
  display_pizzas_selected.splice(index, 1);
  refresh_lst_selected(display_pizzas_selected)
}

const ClickPlusQuantity = (id) => {
  display_pizzas_selected.map((pizza) => {
    if (pizza.id === id) {
      pizza.quantity += 1;
    }
  })
  refresh_lst_selected(display_pizzas_selected)
}

const ClickSaveSelectedPizza = () => {
  // localStorage.setItem('pizzas', JSON.stringify(display_pizzas_selected));
  if (display_pizzas_selected.length > 0) {
    setPizzas(display_pizzas_selected);
    set_success_message("Vos pizzas ont bien été sauvegardées");
    setTimeout(() => {
      set_success_message("");
      navigate("/planning");
    }, 1000);
  }
  else {
    set_success_message("Vous n'avez pas sélectionné de pizza");
    setTimeout(() => {
      set_success_message("");
    }, 2000);
  }  
}

  return (
    <div className="all_container">
      <div className="search-and-display">
            <div className="div-search-bar">
                <h2 className='label-search-bar' htmlFor="search-bar">Barre de recherche</h2>
                <div className="div-input-search-bar">
                  <input 
                  className='input-search-bar'
                  type="text"
                  name="search-bar"
                  id="id-search-bar"
                  autoComplete="on"
                  onChange={e => onChangeHandler(e.target.value)}
                  value={text}
                  />
                </div>
            </div>
          <div className="div-display-pizzas-ingredient">
            {display_pizzas.map(display_pizzas => (
              <React.Fragment >
                <div onClick={() => handleClick(display_pizzas.id)}
                     className="div-card-pizzas-ingredient"
                     key={display_pizzas.id}
                    //  style={{
                    //    boxShadow: myStyle[`${display_pizzas.id}`]
                    //      ? "4px 4px 4px 4px rgba(0, 0, 0, 0.55)"
                    //      : "initial"
                    //  }}
                >
                  <div className="div-display-pizzas">
                    <label>{display_pizzas.attributes.nom}</label>
                  </div>
                  {/* Get les ingredients */}
                  <div className="div-display-ingredient">
                    <span>Ingredients :  
                      {display_pizzas.attributes.ingredients.data.map(ingredient => (
                        <React.Fragment>
                          {" " + ingredient.attributes.nom_ingredient}
                        </React.Fragment>
                        ))}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="form_pizza">
            <div className="pizza-selected">
                <div className="pizza-selected-title">
                    <h2>Pizza sélectionnée</h2>
                </div>
                <div className="display-selected-pizza">
                  {/* map display pizza selected */
                  display_pizzas_selected.map(display_pizzas_selected => (
                    <React.Fragment>
					          <div className="pizza-quantity-btn">
                      <div className="div-card-pizzas-ingredient">
                        <div className="div-display-pizzas">
                          <span>{display_pizzas_selected.attributes.nom} : {display_pizzas_selected.quantity}</span>
                        </div>
                      </div>
                        <div className="div-input-less">
                          <span onClick={() => ClickPlusQuantity(display_pizzas_selected.id) } className="span-button">+</span>
                          <span onClick={() => ClickLessQuantity(display_pizzas_selected.id) } className="span-button">-</span>
                          <span onClick={() => ClickSuppr(display_pizzas_selected.id) } className="span-button">X</span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
				
                <div className="save-pizza-selected">
                  <button onClick={() => ClickSaveSelectedPizza() } className="btn-save-pizza-selected">Sauvegarder</button>
                </div>
				      <span>{success_message}</span>
            </div>
        </div>    
    </div>
  );
}

export default AutoComplete;