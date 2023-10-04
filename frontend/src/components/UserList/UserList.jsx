import {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../../api/api.js";
import Modal from "../Modal/Modal";

function UserList() {
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            });
    }, []);

    const handleDeleteUser = () => {
        if (userIdToDelete) {
            deleteUser(userIdToDelete)
                .then(() => {
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
                    setModalIsOpen(false);
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression de l'utilisateur :", error);
                });
        }
    };

    const openModal = (userId) => {
        setUserIdToDelete(userId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setUserIdToDelete(null);
        setModalIsOpen(false);
    };

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
                        <button onClick={() => openModal(user.id)}>Supprimer l'utilisateur</button>
                    </li>
                ))}
                {modalIsOpen && (
                    <Modal
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        modalTitle="Supprimer l'utilisateur"
                        modalBody="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
                        modalConfirm={handleDeleteUser}
                    />
                )}
                {!users && <li>Aucun utilisateur pour le moment</li>}
            </ul>
        </div>
    );
}

export default UserList;