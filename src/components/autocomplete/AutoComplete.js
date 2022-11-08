import React from "react";
import axios from 'axios';
import { useState, useEffect} from 'react';

import "./AutoComplete.css"

const AutoComplete = () => {
    
  const [pizzas, setPizzas] = useState([]);
  const [text, setText] = useState("");
  const [display_pizzas, setDisplay] = useState([]);



  useEffect(()=>{
    const loadPizzas = async () => {
    const response = await axios.get('http://localhost:1337/api/pizzas?populate=*');
          setPizzas(response.data.data)
          setDisplay(response.data.data);
    }
    loadPizzas();

  },[])

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

  function handleClick(id_pizza_selected) {
    console.log(id_pizza_selected)
};

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
                  autoComplete="off"
                  onChange={e => onChangeHandler(e)}
                  value={text}
                  />
                </div>
            </div>
          <div className="div-display-pizzas-ingredient">
            {display_pizzas.map(display_pizzas => (
              <React.Fragment >
                <div onClick={() => handleClick(display_pizzas.id)}
                     className="div-card-pizzas-ingredient">
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
                        <div className="display-pizza"></div>
                  {/* display pizza selected */}
                </div>
                <div className="save-pizza-selected">
                  <button className="btn-save-pizza-selected">Sauvegarder</button>
                </div>
            </div>
        </div>    
    </div>
  );
}

export default AutoComplete;