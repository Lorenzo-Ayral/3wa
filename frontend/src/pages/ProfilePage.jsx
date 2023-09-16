import { useEffect, useState } from 'react';
import { getProfile } from "../api/api.js";
import jwt_decode from "jwt-decode";

const ProfilePage = () => {
    const [userData, setUserData] = useState({});
    console.log(userData)
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        getProfile(userId)
            .then((data) => setUserData(data))
            .catch((error) => console.error('Erreur lors de la récupération des données :', error));
    }, [userId]);

    return (
        <div>
            <h2>Profil de l'utilisateur</h2>
            <p>Nom d'utilisateur : {userData.username}</p>
            <p>Prénom : {userData.first_name}</p>
            <p>Nom : {userData.last_name}</p>
            <p>Email : {userData.email}</p>
        </div>
    );
};

export default ProfilePage;
