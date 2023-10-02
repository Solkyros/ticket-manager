import api from "api/service";
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.get("/api/users/current").then(({ data }) => {
            setUser(data)
        }).catch((error) => {
            if (error.response) {
                console.error(error.response.data);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}