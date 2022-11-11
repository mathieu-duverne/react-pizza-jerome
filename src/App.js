import PersonList from './components/PersonList';
import './App.css';
import Profile from "./components/Profile/Profile";
import PersonAdd from './components/PersonAdd';
//import Accueil from './components/Accueil';
import Login from './components/login/Login';
import Booking from './components/booking/Booking';
import {Routes, Route, Navigate} from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import React from 'react';
import SignUp from './components/PersonAdd';
import { useState } from 'react';
import { getToken } from "./components/helpers";
import AutoComplete  from './components/autocomplete/AutoComplete';
import Admin from './admin/Admin';

function App() {

    return (

        <div className="App">
            <React.Fragment>
                <Navbar />
            </React.Fragment>

            <Routes>
                <Route path="/autocomplete" element={<AutoComplete />} />

                <Route path="/inscription" element={<SignUp />} />
                <Route
                    path="/profile"
                    element={getToken() ? <Profile /> : <Navigate to="/connexion" />}
                />
                <Route path='/connexion' element={<Login />} />
                <Route path="/list" element={<PersonList />} />
                <Route path="/reservation" element={<Booking />} />
                <Route path='/admin' element={<Admin />} />
                {/* <AuthenticatedRoute path="/" component={Accueil} /> */}
            </Routes>
            <Footer />

        </div>

    );
}

export default App;
