import React from "react";
import "../style/Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Pizza Jérome</h4>
            <h5 className="list-unstyled">
              <li>Numéro de tel</li>
              <li>Ville, France</li>
              <li>123 adresse</li>
            </h5>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Service</h4>
            <h5 className="list-unstyled">
              <li>Pizzas</li>
              <li>Commande</li>
              <li>Livraison</li>
            </h5>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} PIZZA JÉROME | TOUT DROIT RÉSERVÉ |
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;