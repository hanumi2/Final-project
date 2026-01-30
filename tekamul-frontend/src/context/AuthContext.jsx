import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    const login = async (username, password) => {
        const data = await AuthService.login(username, password);
        setUser(data);
        return data;
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    const register = (username, email, password, fullName, role) => {
        return AuthService.register(username, email, password, fullName, role);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
