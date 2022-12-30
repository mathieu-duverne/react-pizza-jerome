import React from 'react';
import axios from '../../api/axios';
import { useState, useEffect, useRef} from 'react';
import { getPizzas } from "../helpers";
import "../validation/validation.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Validation = () => {

    const data = JSON.parse(getPizzas());
    console.log(data)

  return (
    <>
        <h1>Validation de votre commande</h1>
        <h2>06.00.00.00.00</h2>
        <h3>Veuillez nous contacter pour confirmer la commande avec votre numéro° X</h3>
      <div className='cart'>
        {data ? (
            <>
                {data.map(item => (
                    <div className='jerome'>

                    <Card className='toto' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/04/11/03/13/food-3309418_1280.jpg" />
                    <Card.Body key={item.id}>
                      <Card.Title>Votre commande</Card.Title>
                      <Card.Text>
                          Pizza : {item.name}
                      </Card.Text>
                      <Card.Text>
                          Prix : {item.prix}
                      </Card.Text>
                      <Card.Text>
                          Quantité : {item.quantity}
                      </Card.Text>
                      <Card.Text>
                          taille : {item.taille}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                    </div>
                    // <ul>
                    //     <li key={item.id}>{item.name}</li>
                    // </ul>
                    ))}
            </>
            ) :(
                <>
                <p>Vous n'avez pas de commande</p>
                </>
        )}


        </div>
    </>


  )
}

export default Validation