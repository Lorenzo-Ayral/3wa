import axios from 'axios';
import jwt_decode from "jwt-decode";

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

export const getUserPosts = () => {

    const url = 'posts?author=' + jwt_decode(localStorage.getItem('jwtToken')).userId;

    return api.get(url)
        .then((response) => response.data['hydra:member'])
        .catch((error) => {
            console.error('Erreur lors de la récupération des posts :', error);
            throw error;
        });
};


export const createPost = async (content) => {
    const authorId = '/api/users/' + jwt_decode(localStorage.getItem('jwtToken')).userId;
    try {
        const response = await api.post(
            'posts',
            { content, author: authorId },
        );
        console.log('Post créé avec succès :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du post :', error);
        throw error;
    }
};