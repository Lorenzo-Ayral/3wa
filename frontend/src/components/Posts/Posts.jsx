import { useEffect, useState } from "react";
import { getUserPosts, deleteUserPost, getPosts } from "../../api/api.js";
import "moment/locale/fr";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Modal from "../Modal/Modal.jsx";

function PostList({ mode }) {
    const [posts, setPosts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        if (mode === "UserPosts") {
            getUserPosts()
                .then((response) => {
                    setPosts(response);
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des posts :', error);
                });
        } else if (mode === "AllPosts") {
            getPosts()
                .then((response) => {
                    setPosts(response);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des posts :", error);
                });
        }
    }, [mode]);

    const handleDeletePost = () => {
        deleteUserPost(postIdToDelete)
            .then(() => {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
                setModalIsOpen(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du post :", error);
            });
    };

    const openModal = (postId) => {
        setPostIdToDelete(postId);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setPostIdToDelete(null);
        setModalIsOpen(false);
    }


    return (
        <div>
            <h2>Vos posts</h2>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <strong>Créé par</strong> {post.authorUsername}
                            <br />
                            <strong>Contenu</strong> {post.content}
                            <br />
                            <strong>Crée le</strong>{" "}
                            {format(new Date(post.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                locale: fr,
                            })}
                            {mode === "UserPosts" && (
                                <button onClick={() => openModal(post.id)}>Supprimer</button>
                            )}
                        </li>
                    ))
                ) : (
                    <li>Aucun post pour le moment</li>
                )}
            </ul>
            {modalIsOpen && (
                <Modal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    modalConfirm={handleDeletePost}
                    modalTitle="Supprimer un post"
                    modalBody="Êtes-vous sûr de vouloir supprimer ce post ?"
                />
            )}
        </div>
    );
}

export default PostList;
