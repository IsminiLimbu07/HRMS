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
        <button onClick={handleLogout} className="bg-red-800 text-white px-2 py-1.5 text-xs rounded hover:bg-green-900" >
            Logout
        </button>
    );
}


