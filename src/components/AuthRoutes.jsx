import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
    const { userData, checkLoading } = useSelector((state) => state.auth);
    const location = useLocation();

    if (checkLoading) return null;

    if (!userData) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user is not verified, and we are not on the check-email page, redirect to check-email
    if (!userData.isVerified && location.pathname !== '/check-email') {
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
