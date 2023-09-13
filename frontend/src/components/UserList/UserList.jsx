import {useEffect, useState} from "react";
import {getUsers} from "../../api/api.js";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>Nom d'utilisateur :</strong> {user.username}
                        <br />
                        <strong>Nom complet :</strong> {user.firstName} {user.lastName}
                        <br />
                        <strong>Email :</strong> {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;