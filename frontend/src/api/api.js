import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const authenticate = (credentials) => {
    return api.post('login', credentials)
        .then((response) => response.data.token)
        .catch((error) => {
            console.error('Erreur lors de l\'authentification :', error);
            throw error;
        });
};

export const getUsers = () => {
    return api.get('users')
        .then((response) => response.data['hydra:member'])
        .catch((error) => {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            throw error;
        });
};

export const createUser = (userData) => {
    return api.post('users', userData);
};
