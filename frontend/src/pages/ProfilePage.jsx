import { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');

        fetch('/api/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error('Erreur lors de la récupération des données :', error));
    }, []);

    return (
        <div>
            <h2>Profil de l'utilisateur</h2>
            <p>Nom d'utilisateur : {userData.username}</p>
            <p>Prénom : {userData.first_name}</p>
            <p>Nom : {userData.last_name}</p>
            {/* Affichez d'autres informations de l'utilisateur ici */}
        </div>
    );
};

export default ProfilePage;