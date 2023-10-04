import { useEffect, useState } from "react";
import {getUserPosts, deleteUserPost, getPosts, getComments} from "../../api/api.js";
import "moment/locale/fr";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Modal from "../Modal/Modal.jsx";

function PostList({ mode }) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
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
        getComments()
            .then((response) => {
                setComments(response);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des commentaires :", error)
            })
    }, [mode]);

    console.log(comments)

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
            <h2>Posts</h2>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <h3>Voici un post</h3>
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

                            <h4 style={{margin: "10px"}}>Commentaires</h4>
                            <ul>
                                {comments.length > 0 ? (
                                    comments
                                        .filter((comment) => comment.postId === post.id)
                                        .map((comment) => (
                                            <li key={comment.id}>
                                                <strong>Créé par</strong> {comment.authorUsername}
                                                <br />
                                                <strong>Contenu</strong> {comment.content}
                                                <br />
                                                <strong>Crée le</strong>{" "}
                                                {format(new Date(comment.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                                    locale: fr,
                                                })}
                                            </li>
                                        ))
                                ) : (
                                    <li>Aucun commentaire pour le moment</li>
                                )}
                            </ul>
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
