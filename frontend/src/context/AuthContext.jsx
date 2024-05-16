import React, { createContext, useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {data, refetch, loading, error} = useFetch("/loggedInUser")
    const [user, setUser] = useState(null);
    const handleLoginSuccess = (user) => {
        localStorage.setItem("token", user.token)
        setIsAuthenticated(true);
        setUser(user);
      
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    if(loading) return <div>Loading...</div>
    return (
        <AuthContext.Provider value={{user: user || data, isAuthenticated: isAuthenticated || data, handleLoginSuccess}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
