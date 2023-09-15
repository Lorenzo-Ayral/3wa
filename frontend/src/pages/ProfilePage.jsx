import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getProfile} from "../api/api.js";

const ProfilePage = () => {
    const { userId } = useParams();
    console.log(userId)
    const [userData, setUserData] = useState({});
    console.log(userData);

    useEffect(() => {
        getProfile(userId) //
            .then((data) => setUserData(data))
            .catch((error) => console.error('Erreur lors de la récupération des données :', error));
    }, [userId]);

    return (
        <div>
            <h2>Profil de l'utilisateur</h2>
            <p>Nom d'utilisateur : {userData.username}</p>
            <p>Prénom : {userData.first_name}</p>
            <p>Nom : {userData.last_name}</p>
        </div>
    );
};

export default ProfilePage;
