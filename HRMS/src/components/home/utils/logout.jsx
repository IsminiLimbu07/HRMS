import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <button onClick={handleLogout} className="bg-green-500 text-white px-1 py-0.5 text-xs rounded hover:bg-red-600" >
            Logout
        </button>
    );
}


