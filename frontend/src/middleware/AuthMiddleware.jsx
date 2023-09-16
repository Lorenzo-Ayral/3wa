import { useEffect } from 'react';
import {Navigate} from 'react-router-dom';

const useAuthMiddleware = (isAuthenticated) => {

    useEffect(() => {
        if (!isAuthenticated) {
            return (
            <Navigate to="/login" />
            )
        }
    }, [isAuthenticated, history]);
};

export default useAuthMiddleware;