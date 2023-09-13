import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

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
