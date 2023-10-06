import {useEffect, useState} from "react";
import {getUserPosts, deleteUserPost, getPosts, getComments, createComment, createPost} from "../../api/api.js";
import "moment/locale/fr";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import Modal from "../Modal/Modal.jsx";

function PostList({mode}) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [modalIsOpenDeletePost, setModalIsOpenDeletePost] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [modalIsOpenCommentPost, setModalIsOpenCommentPost] = useState(false);
    const [postIdToComment, setPostIdToComment] = useState(null);
    const [content, setContent] = useState('');

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

    const handleDeletePost = () => {
        deleteUserPost(postIdToDelete)
            .then(() => {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
                setModalIsOpenDeletePost(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du post :", error);
            });
    };

    const handleCommentPost = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('content', content);
            const response = await createComment(content, postIdToComment);
            console.log('Post créé avec succès:', response);
            setContent('');
            setComments((prevComments) => [...prevComments, response]);
            setModalIsOpenCommentPost(false);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };


    const openModalDeletePost = (postId) => {
        setPostIdToDelete(postId);
        setModalIsOpenDeletePost(true);
    }

    const closeModalDeletePost = () => {
        setPostIdToDelete(null);
        setModalIsOpenDeletePost(false);
    }

    const openModalCommentPost = (postId) => {
        setPostIdToComment(postId);
        setModalIsOpenCommentPost(true);
    }

    const closeModalCommentPost = () => {
        setPostIdToComment(null);
        setModalIsOpenCommentPost(false);
    }

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <h3>Voici un post</h3>
                            <br />
                            <strong>Image :<img alt="" src={post.picture}></img></strong>
                            <br/>
                            <strong>Créé par</strong> {post.authorUsername}
                            <br/>
                            <strong>Contenu</strong> {post.content}
                            <br/>
                            <strong>Crée le</strong>{" "}
                            {format(new Date(post.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                locale: fr,
                            })}
                            {mode === "UserPosts" && (
                                <button onClick={() => openModalDeletePost(post.id)}>Supprimer</button>
                            )}

                            <h4 style={{marginTop: "10px"}}>Commentaires</h4>
                            <ul style={{marginBottom: "30px"}}>
                                {comments
                                    .filter((comment) => comment.postId === post.id)
                                    .length > 0 ? (
                                    comments
                                        .filter((comment) => comment.postId === post.id)
                                        .map((comment) => (
                                            <li key={comment.id}>
                                                <strong>Créé par</strong> {comment.authorUsername}
                                                <br/>
                                                <strong>Contenu</strong> {comment.content}
                                                <br/>
                                                <strong>Crée le</strong>{" "}
                                                {format(new Date(comment.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                                    locale: fr,
                                                })}
                                            </li>
                                        ))
                                ) : (
                                    <li>Aucun commentaire pour le moment</li>
                                )}
                                <button onClick={() => openModalCommentPost(post.id)}>Ajouter un commentaire</button>
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>Aucun post pour le moment</li>
                )}
            </ul>
            {modalIsOpenDeletePost && (
                <Modal
                    modalIsOpen={modalIsOpenDeletePost}
                    closeModal={closeModalDeletePost}
                    modalConfirm={handleDeletePost}
                    modalTitle="Supprimer un post"
                    modalBody="Êtes-vous sûr de vouloir supprimer ce post ?"
                />
            )}
            {modalIsOpenCommentPost && (
                <Modal
                    modalIsOpen={modalIsOpenCommentPost}
                    closeModal={closeModalCommentPost}
                    modalConfirm={handleCommentPost}
                    modalTitle="Ajouter un commentaire"
                    modalBody={
                        <>
                            <label>Contenu du post :</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </>
                    }
                />
            )}
        </div>
    );
}

export default PostList;
