import React from "react";
import axios from 'axios';
import { API } from "../constant";

import { useState, useEffect} from 'react';

import "./AutoComplete.css"

const AutoComplete = () => {
    
  const [pizzas, setPizzas] = useState([]);
  const [text, setText] = useState("");
  const [display_pizzas, setDisplay] = useState([]);
  // const [myStyle, setMyStyle] = useState({});
  const [display_pizzas_selected, setDisplay_pizzas_selected] = useState([]);
  const [lstid] = useState([]);
  const [lsttest] = useState([]);

  useEffect(()=>{
    const loadPizzas = async () => {
    const response = await axios.get(`${API}/pizzas?populate=*`);	
          setPizzas(response.data.data)
          setDisplay(response.data.data);
    }
    loadPizzas();

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
  // ---------- COMPOSANT AUTOCOMPLETE ------------ //

// ---------- COMPOSANT CLICK ON PIZZA (change style, create list of selected pizza) ------------ //
  const handleClick = (id_pizza_selected) => {


    if (!lstid.includes(id_pizza_selected)) {
      // setId_selected([...id_selected, id_pizza_selected]);
      lsttest.push({id_pizza_selected, quantity: 1});
      lstid.push(id_pizza_selected);
    }

    let matches = {};

    if (lsttest.length > 0) {
      // make a list of if of lsttest object
      const lstidtest = lsttest.map((item) => item.id_pizza_selected);
      console.log(lstidtest)

      matches = pizzas.filter(pizza => {
        return lstidtest.includes(pizza.id)
      })
    } else {
      setDisplay_pizzas_selected([]);
      }

    if (matches.length > 0) {
      setDisplay_pizzas_selected(matches);
    }
};

    

const ClickPlusQuantity = (id) => {
  console.log(id)
  lsttest.map((pizza) => {
    if (pizza.id_pizza_selected === id) {
      pizza.quantity += 1;
    }
  })
}

const ClickSaveSelectedPizza = () => {
  console.log(lsttest);
}

// if (!lstid.includes(id_pizza_selected)) { 
//  else{

    //   const index = lstid.indexOf(id_pizza_selected);
    //   if (index > -1) {
    //     lstid.splice(index, 1);
    //   }
    // }
    // }

    // setMyStyle((prevState) => ({
    //   ...myStyle,
    //   [id_pizza_selected]: !prevState[id_pizza_selected]
    // }));

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
                      <div className="div-card-pizzas-ingredient">
                        <div className="div-display-pizzas">
                          <label>{display_pizzas_selected.attributes.nom}</label>
                        </div>
                      </div>
                      <div>
                        <div className="div-input-less">
                          <span onClick={() => ClickPlusQuantity(display_pizzas_selected.id) } className="span-button">+</span>
                          <span className="span-button">-</span>
                          <span className="span-button">X</span>
                        </div>
                      </div>

                    </React.Fragment>
                  ))}
                </div>
                <div className="save-pizza-selected">
                  <button onClick={() => ClickSaveSelectedPizza() } className="btn-save-pizza-selected">Sauvegarder</button>
                </div>
            </div>
        </div>    
    </div>
  );
}

export default AutoComplete;