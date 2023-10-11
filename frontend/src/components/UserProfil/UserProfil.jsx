import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getProfile, updateUser } from "../../api/api.js";
import Modal from "../Modal/Modal.jsx";
import styles from "../../css/components/UserProfil/UserProfil.module.css";
import {GiWaxTablet} from "react-icons/gi";

function UserProfil() {
    const [userData, setUserData] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newUserData, setNewUserData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        getProfile(userId)
            .then((data) => {
                setUserData(data);
                setNewUserData({
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                });
            })
            .catch((error) => console.error("Erreur lors de la récupération des données :", error));
    }, [userId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleUpdateUser = () => {
        if (newUserData.password !== newUserData.passwordConfirm) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        const updatedUserData = {
            username: newUserData.username,
            first_name: newUserData.firstName,
            last_name: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password,
            updated_at : new Date(),
        };

        updateUser(userId, updatedUserData)
            .then(() => {
                setUserData(newUserData);
                setModalIsOpen(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <div className={styles["user-profile"]}>
                <h2>Profil de l'utilisateur</h2>
                {/*<img*/}
                {/*    src={userData.profilePicture}*/}
                {/*    alt="Photo de profil"*/}
                {/*    className={styles["profile-picture"]}*/}
                {/*/>*/}
                <p>Nom d'utilisateur : {userData.username}</p>
                <p>Prénom : {userData.firstName}</p>
                <p>Nom : {userData.lastName}</p>
                <p>Email : {userData.email}</p>
                <button
                    onClick={openModal}
                    className={styles["update-button"]}
                >
                    Mettre à jour mon profil <GiWaxTablet/>
                </button>
            </div>
            {modalIsOpen && (
                <Modal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    modalConfirm={handleUpdateUser}
                    modalTitle="Mettre à jour mon profil"
                    modalBody={
                        <form className={styles["update-user-profile-form"]}>
                            <label>Nouveau nom d'utilisateur:</label>
                            <input type="text" name="username" value={newUserData.username} onChange={handleChange} />

                            <label>Nouveau prénom:</label>
                            <input type="text" name="firstName" value={newUserData.firstName} onChange={handleChange} />

                            <label>Nouveau nom:</label>
                            <input type="text" name="lastName" value={newUserData.lastName} onChange={handleChange} />

                            <label>Nouvel email:</label>
                            <input type="email" name="email" value={newUserData.email} onChange={handleChange} />

                            <label>Nouveau mot de passe:</label>
                            <input type="password" name="password" value={newUserData.password} onChange={handleChange} />

                            <label>Confirmer le nouveau mot de passe:</label>
                            <input type="password" name="passwordConfirm" value={newUserData.passwordConfirm} onChange={handleChange} />
                        </form>
                    }
                />
            )}
        </>
    );
}

export default UserProfil;
