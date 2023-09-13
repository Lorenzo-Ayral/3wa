import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const getUsers = () => {
    return api.get('users')
        .then((response) => {
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                throw new Error('La réponse ne contient pas un tableau d\'utilisateurs valide.');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            throw error; // Vous pouvez relancer l'erreur pour la gérer plus haut
        });
};

export const createUser = (userData) => {
    return api.post('users', userData);
};
