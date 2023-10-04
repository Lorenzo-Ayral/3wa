import {useEffect, useState} from "react";
import {deleteUserPost, getUserPosts} from "../../api/api.js";
import Modal from "../Modal/Modal.jsx";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        getUserPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des posts :', error);
            });
    }, []);

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
                            <strong>Contenu</strong> {post.content}
                            <br />
                            <strong>Créé le</strong> {post.created_at}
                            <button onClick={() => openModal(post.id)}>Supprimer</button>
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
