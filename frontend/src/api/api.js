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

export const logout = () => {
    localStorage.removeItem('jwtToken');
    return api.post('logout')
        .catch((error) => {
            console.error('Erreur lors de la déconnexion :', error);
            throw error;
        });
}

export const getProfile = async (userId) => {
    try {
        const response = await api.get(`users/${userId}`);
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

export const createUser = (data) => {
    return api.post('create/users', data);
};

export const deleteUser = (userId) => {
    return api.delete('users/' + userId)
        .catch((error) => {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            throw error;
        });
}

export const updateUser = (userId, updatedUserData) => {
    return api.patch('users/' + userId, updatedUserData, {
        headers: {
            'Content-Type': 'application/merge-patch+json',
        },
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Erreur lors de la modification de l\'utilisateur :', error);
            throw error;
        });
}


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

export const deleteUserPost = (postId) => {
    return api.delete('posts/' + postId)
        .catch((error) => {
            console.error('Erreur lors de la suppression du post :', error);
            throw error;
        });
}


export const createPost = async (content, picture) => {
    const authorId = '/api/users/' + jwt_decode(localStorage.getItem('jwtToken')).userId;
    try {
        const data = {
            content,
            author: authorId,
            picture: btoa(picture),
        };

        const response = await api.post('posts', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('data1 :', data)
        console.log('Post créé avec succès :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du post :', error);
        throw error;
    }
};

export const getComments = () => {
    return api.get('comments')
        .then((response) => response.data['hydra:member'])
        .catch((error) => {
            console.error('Erreur lors de la récupération des commentaires :', error);
            throw error;
        });
}

export const createComment = async (content, postId) => {
    const authorId = '/api/users/' + jwt_decode(localStorage.getItem('jwtToken')).userId;
    const post = '/api/posts/' + postId;
    try {
        const response = await api.post(
            'comments',
            {content, user: authorId, post, createdAt: new Date()},
        );
        console.log('Commentaire créé avec succès :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        throw error;
    }
}