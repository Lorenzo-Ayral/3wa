import {useEffect, useState} from "react";
import {getUsers} from "../../api/api.js";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ul>
                {users && users.map((user) => (
                    <li key={user.id}>
                        <strong>Nom d'utilisateur :</strong> {user.username}
                        <br/>
                        <strong>Nom complet :</strong> {user.first_name} {user.last_name}
                        <br/>
                        <strong>Email :</strong> {user.email}
                    </li>
                ))}
                {!users && <li>Aucun utilisateur pour le moment</li>}
            </ul>
        </div>
    );
}

export default UserList;