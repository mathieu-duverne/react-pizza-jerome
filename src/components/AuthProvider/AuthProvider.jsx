import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { message } from "antd";
import { API, BEARER } from "../constant";
import { useEffect } from "react";
import { getToken } from "../helpers";
import axios from "../../api/axios";

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState();

    const authToken = getToken();

    const fetchRoleUser = async (token) => {

        const responseRole = axios.get(`${API}/users/me?populate=*`,{
            headers: {
              Authorization: `Bearer ${token}`,//  when user login there will be a jwt in reponse so you can pass user jwt in here 
            }
          });
  
          const dataRole = await responseRole;
        //   console.log(dataRole.data.role);
        //   setRole = dataRole.data.role;
          setRole(dataRole.data.role);
    }

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/users/me`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await response.json();

            setUserData(data);
        } catch (error) {
            console.error(error);
            //   message.error("Error While Getting Logged In User Details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUser = (user) => {
        setUserData(user);
    };

    useEffect(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
            fetchRoleUser(authToken);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider
            value={{ user: userData, role: role, setUser: handleUser, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;