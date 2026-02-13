import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
    const { userData, checkLoading } = useSelector((state) => state.auth);

    if (checkLoading) return null;

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    // If user is not verified, and we are not on the check-email page, redirect to check-email
    if (!userData.isVerified && window.location.pathname !== '/check-email') {
        return <Navigate to="/check-email" replace />;
    }

    return children;
};

export const PublicRoute = ({ children }) => {
    const { userData, checkLoading } = useSelector((state) => state.auth);

    if (checkLoading) return null;

    if (userData) {
        if (!userData.isVerified) {
            return <Navigate to="/check-email" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return children;
};
