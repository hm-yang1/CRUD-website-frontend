// AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';

//AuthContext checks if user is logged in and sets username. 
//Used at top level of index.html, to be avaliable to all components
interface AuthContextProps {
  isAuthenticated: boolean;
  AuthUsername: string;
  handleLogin: (enteredUsername: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [AuthUsername, setAuthUsername] = useState('');
    async function checkSessionStatus(){
        try{
            const response = await fetch(`${API_BASE_URL}/api/session`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                setAuthenticated(true);
                const savedUsername = localStorage.getItem('username') ?? '';
                setAuthUsername(savedUsername);
                console.log(savedUsername);
            } else {
                console.log("Not authenticated");
                localStorage.setItem('username', '');
            }
        } catch (error) {
            console.error("Error retrieving session:", error);
        }
    }
    //Check session status on page load
    useEffect(() => {
        checkSessionStatus();
    }, []);

    const handleLogin = (enteredUsername: string) => {
        // Called after successfuly login
        localStorage.setItem('username', enteredUsername)
        setAuthenticated(true);
        setAuthUsername(enteredUsername);
    };

    const handleLogout = () => {
        // Called after successful logout
        setAuthenticated(false);
        setAuthUsername('');
        localStorage.setItem('username', '');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, AuthUsername, handleLogin, handleLogout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context;
};

interface RequireAuthProps {
    children: React.ReactNode;
    redirectTo: string;
}
  
export const RequireAuth: React.FC<RequireAuthProps> = ({ children, redirectTo }) => {
    const { isAuthenticated } = UseAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};
  
