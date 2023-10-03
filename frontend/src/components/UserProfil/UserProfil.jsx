import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {getProfile} from "../../api/api.js";

function UserProfil() {
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        getProfile(userId)
            .then((data) => {
               setUserData(data)
            })
            .catch((error) => console.error('Erreur lors de la récupération des données :', error));
    }, [userId]);

    return (
        <div>
            <h2>Profil de l'utilisateur</h2>
            <p>Photo de profil : {userData.profilePicture}</p>
            <p>Nom d'utilisateur : {userData.username}</p>
            <p>Prénom : {userData.firstName}</p>
            <p>Nom : {userData.lastName}</p>
            <p>Email : {userData.email}</p>
        </div>
    )
}

export default UserProfil;