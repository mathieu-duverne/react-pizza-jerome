import React from 'react'
import axios from 'axios';
import { useRef, useState, useEffect, useContext } from 'react';
import getAllPizzas from '../../api/PizzasApi';
import newBooking from '../../api/BookingApi';
import BookingApi from '../../api/BookingApi';
import { API } from "../constant";

const Booking = () => {
  const [pizzas, setPizzas] = useState([]);
  const [resa, setResa] = useState();
  // const [pizzResa, setPizzResa] = useState('');
  const [value, setValue] = useState('');
  
  const [selected, setSelected] = useState('');
  const [booked, setBooked] = useState([]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(resa)
    console.log(selected)

    const response = newBooking(resa, selected);
    response.then(function(response) {
      console.log(response)
    })
  }

  const handleChange = e => {
    console.log(e.target.value);
    setSelected(e.target.value);
    console.log(selected)
  }

  useEffect(()=>{
     
        axios.get(`${API}/api/pizzas`)
        .then(res => {
          // console.log(res.data.data)
          setPizzas(res.data.data)
        })
  },[])

  useEffect(() => {
      axios.get(`${API}/reservations?populate=*`)
      .then(res => {
          console.log(res.data.data)
          setBooked(res.data.data)
      })
  }, [])
  console.log(booked)

  return (
    <>
    <h1>reservation</h1>
    <form onSubmit={handleSubmit}>
        <label>Pizza: </label>
        
        <div>
          {pizzas.map(pizza => (
            <React.Fragment>
            <label>{pizza.attributes.nom}</label>
            <input 
            value={pizza.id}
            onChange={(e) => setSelected(e.target.value)}
             type="radio" /> <br />
            </React.Fragment>
            ))}
        </div>
        <br />

        <label>Créneaux: </label>
        <input 
          type="datetime-local"
          id='resa'
          onChange={(e) => setResa(e.target.value)}
          value={resa}
          />
        <br />

        <input type="submit"
        value="Valider"></input>
    </form>
            
    {booked.map(booked => (
      <React.Fragment>
        <ul>
          <li>
            {booked.attributes.pizza.data.attributes.nom}
            <br />
            {booked.attributes.creneaux}
          </li>
        </ul>
      </React.Fragment>
      // console.log(booked)
    ))}
    <label></label>
    </>
  )
}
 export default Booking;