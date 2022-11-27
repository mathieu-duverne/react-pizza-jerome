import React from "react";
import axios from 'axios';
import { API } from "../constant";
import { useNavigate } from "react-router-dom";
import { setPizzas } from "../helpers";
import { getPizzas } from "../helpers";
import { removePizzas } from "../helpers";
import { useState, useEffect} from 'react';
import "./AutoComplete.css"

const AutoComplete = () => {
    
  const [pizzas, setPizza] = useState([]);
  const [text, setText] = useState("");
  const [display_pizzas, setDisplay] = useState([]);
  const [display_pizzas_selected, setDisplay_pizzas_selected] = useState([]);
  const [success_message, set_success_message] = useState("");

  useEffect(()=>{
    const loadPizzas = async () => {
    const response = await axios.get(`${API}/pizzas?populate=*`);	
    structured_pizzas(response.data.data);
    }
    loadPizzas();
    if (getPizzas() != null) {
      setDisplay_pizzas_selected(JSON.parse(getPizzas()));
    }

  },[])

  function structured_pizzas(data){
    let pizzas = [];
    // copy the data without same pizza 
    data.map(pizza => {
      let ingredients = [];
      pizza.attributes.ingredients.data.map(ingredient => {
        ingredients.push(ingredient.attributes.nom_ingredient);
      })
      let pizza_structured = {
        "id": [pizza.id],
        "name": pizza.attributes.nom,
        "price": [pizza.attributes.prix],
        "size": [pizza.attributes.taille],
        "ingredients": ingredients
      }
      if (pizzas.filter(pizza => pizza.name == pizza_structured.name).length == 0) {
        pizzas.push(pizza_structured);
      }
    })
    let res = merge_pizza(pizzas, data);
    setPizza(res);
    setDisplay(res);
  }

  function merge_pizza(pizzas, data){
    pizzas.map(pizza => {
      data.map(pizza2 => {
        if (pizza.name == pizza2.attributes.nom && pizza.id != pizza2.id) {
          pizza.id.push(pizza2.id);
          pizza.price.push(pizza2.attributes.prix);
          pizza.size.push(pizza2.attributes.taille);
        }
    })
})
return pizzas
}

  // ---------- COMPOSANT AUTOCOMPLETE ------------ //
  const onChangeHandler = (text) => {
    // initialisation du tableau des matchs
    let matches = [];
    // si il y a au moins un caractère dans le champ de recherche
    if (text.length > 0) {
      // Fonction du filtre de react
      matches = pizzas.filter(pizza => {
        const regex = new RegExp(`${text}`, "gi");
        return pizza.name.match(regex)
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
const [test, setTest] = useState([]); 
  const handleClick = (id) => {
    let quantitys = 0;
   // map pizzas tout les id de pizzas
  const lstid = display_pizzas_selected.map(pizza => pizza.id);
  if (!lstid.includes(id)) {
    pizzas.map(pizza => {
      pizza.id.map((id_pizza) => {
        // si l'id de la pizza est dans la liste des id des pizzas selectionnées
        if (id_pizza == id) {
          display_pizzas_selected.push({
            "id" : id,
            "name" : pizza.name,
            "taille" : pizza.size[pizza.id.indexOf(id)],
            "prix" : pizza.price[pizza.id.indexOf(id)],
            "quantity" : 1
          }); 
        }
      })
    }) 
    } else {
		  const index = display_pizzas_selected.findIndex((item) => item.id === id);
          display_pizzas_selected[index].quantity += 1;	
          quantitys += 1;
	    }
      refresh_lst_selected(display_pizzas_selected);
      console.log(display_pizzas_selected);
  }

const refresh_lst_selected = (display_pizzas_right) => {
    // match et return les pizzas selectionnées
    let matches = [];
    matches = display_pizzas_right.map(pizza => {
      const regex = new RegExp(`${pizza.name}`, "gi");
      return pizza
    }
    )
    // set le display qui change en fonction de la recherche
    setDisplay_pizzas_selected(matches);
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
  if (display_pizzas_selected.length == 0) {
    removePizzas();
  }
}

const ClickSuppr = (id) => {
  // find the index of the pizza sel
  const index = display_pizzas_selected.findIndex((item) => item.id === id);
  display_pizzas_selected.splice(index, 1);
  refresh_lst_selected(display_pizzas_selected)
  if (display_pizzas_selected.length == 0) {
    removePizzas();
  }
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
  if (display_pizzas_selected.length > 0) {
    setPizzas(display_pizzas_selected);
    set_success_message("Vos pizzas ont bien été sauvegardées");
    setTimeout(() => {
      window.location.href = "/planning"; 
    }, 1000);
  }
  else {
    removePizzas();
    //  remove item pizzas into local storage
    set_success_message("Vous n'avez pas sélectionné de pizza");
    setTimeout(() => {
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
                <div className="div-card-pizzas-ingredient"
                >
                  <div className="div-display-pizzas">
                    <label>{display_pizzas.name}</label>
                  </div>
                  <div className="div-display-ingredient">
                    <span>Ingredients :  
                      {display_pizzas.ingredients.map(ingredient => (
                        <React.Fragment>
                          <span >
                          {" " + ingredient}
                          </span>
                        </React.Fragment>
                        ))}
                    </span>
                  </div>
                  <div className="div-display-btn">

                  {display_pizzas.id.map((index, idx) => (
                    <React.Fragment>
                        <div className="btn_id" onClick={() => handleClick(index)} >
                          <span>Taille : {display_pizzas.size[idx]} </span>
                          <span>Prix : {display_pizzas.price[idx]} €</span>
                        </div>
                    </React.Fragment>
                  ))}
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
                          {/* {console.log(display_pizzas_selected)}   */}
                          <span > {display_pizzas_selected.name}  x{display_pizzas_selected.quantity}</span>
                          <span > { display_pizzas_selected.taille == "Grande" ? " : XL" : " : M "}</span>
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