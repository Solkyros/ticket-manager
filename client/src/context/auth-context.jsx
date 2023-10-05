import api from "api/service";
import { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const login = user => {
        setUser(user.data);
    };
    const logout = async () => {
        api.get("/api/users/logout").then(({ data }) => {
            console.log(data);
            setUser(null);
        }).catch((error) => {
            if (error.response) {
                console.error(error.response.data);
            }
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}