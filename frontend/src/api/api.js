import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authenticate = (credentials) => {
    return api.post('login', credentials)
        .then((response) => response.data.token)
        .catch((error) => {
            console.error('Erreur lors de l\'authentification :', error);
            throw error;
        });
};

export const getProfile = async (userId) => {
    try {
        const response = await api.get(`users/${userId}`) ;
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        throw error;
    }
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

export const getPosts = () => {
    return api.get('posts')
        .then((response) => response.data['hydra:member'])
        .catch((error) => {
            console.error('Erreur lors de la récupération des posts :', error);
            throw error;
        });
};

export const createPost = (postData) => {
    return api.post('posts', postData);
};