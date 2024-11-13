import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        console.log('no')
        return <Navigate to="/"/>;
    }

    return children;
}

export default ProtectedRoute;