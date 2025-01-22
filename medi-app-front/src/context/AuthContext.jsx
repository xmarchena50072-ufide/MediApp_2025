import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, getProfileRequest, updateProfileRequest, getUsersRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
    
            // Si el servidor envía errores detallados
            if (error.response?.data?.errors) {
                // Mapea y muestra los errores específicos en los campos
                const detailedErrors = error.response.data.errors.map(err => `${err.field}: ${err.message}`);
                return setErrors(detailedErrors);
            }
    
            setErrors([error.response?.data?.message || "Error inesperado en el registro"]);
        }
    };
    

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
    
            // Si el servidor envía errores detallados
            if (error.response?.data?.errors) {
                // Mapea y muestra los errores específicos en los campos
                const detailedErrors = error.response.data.errors.map(err => `${err.field}: ${err.message}`);
                return setErrors(detailedErrors);
            }
    
            setErrors([error.response?.data?.message || "Error inesperado en el inicio de sesión"]);
        }
    };
    

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    const getProfile = async () => {
        try {
            const res = await getProfileRequest();
            setUser(res.data);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const updateProfile = async (userData) => {
        try {
            const res = await updateProfileRequest(user.id, userData);
            setUser(res.data);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            return res.data; // Devuelve los datos de los usuarios
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            getProfile,
            updateProfile,
            getUsers,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
};
