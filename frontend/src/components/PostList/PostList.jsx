import {useEffect, useState} from "react";
import {
    getUserPosts,
    deleteUserPost,
    getPosts,
    getComments,
    createComment,
    deleteComment
} from "../../api/api.js";
import "moment/locale/fr";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import Modal from "../Modal/Modal.jsx";
import {useSelector} from "react-redux";
import styles from "../../css/components/PostList/PostList.module.css";
import {FaTrashAlt} from "react-icons/fa";

function PostList({mode}) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
    const [modalIsOpenDeletePost, setModalIsOpenDeletePost] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [commentIdToDelete, setCommentIdToDelete] = useState(null)
    const [modalIsOpenCommentPost, setModalIsOpenCommentPost] = useState(false);
    const [modalIsOpenDeleteComment, setModalIsOpenDeleteComment] = useState(false)
    const [postIdToComment, setPostIdToComment] = useState(null);
    const [content, setContent] = useState('');
    const userId = "/api/users/" + useSelector((state) => state.auth.id);

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

    const handleDeleteComment = () => {
        deleteComment(commentIdToDelete)
            .then(() => {
                setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentIdToDelete));
                setModalIsOpenDeleteComment(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du commentaire :", error);
            });
    }


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

    const openModalDeleteComment = (commentId) => {
        setCommentIdToDelete(commentId);
        setModalIsOpenDeleteComment(true);
    }

    const closeModalDeleteComment = () => {
        setCommentIdToDelete(null);
        setModalIsOpenDeleteComment(false);
    }

    return (
        <div>
            <h2>Posts</h2>
            <ul className={styles["post-list"]}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id} className={styles["post-item"]}>
                            {mode === "UserPosts" && (
                                <button className={styles["delete-button"]} onClick={() => openModalDeletePost(post.id)}
                                        style={{display: "block"}}>
                                    <FaTrashAlt/>
                                </button>
                            )}
                            {/*<strong>Image :<img alt="" src={post.picture} /></strong>*/}
                            <strong>{post.authorUsername}</strong>
                            <br/>
                            {post.content}
                            <br/>
                            le {format(new Date(post.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                            locale: fr,
                        })}
                            <br/>

                            <h4>Commentaires</h4>
                            <ul className={styles.comments}>
                                {comments
                                    .filter((comment) => comment.postId === post.id)
                                    .length > 0 ? (
                                    comments
                                        .filter((comment) => comment.postId === post.id)
                                        .map((comment) => (
                                            <li key={comment.id} className={styles["comment-item"]}>
                                                <strong>{comment.authorUsername}</strong> à répondu :
                                                <br/>
                                                {comment.content}
                                                <br/>
                                                le {format(new Date(comment.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                                locale: fr,
                                            })}
                                                <br/>
                                                {userId === comment.user && (
                                                    <button className={styles["delete-button"]}
                                                            onClick={() => openModalDeleteComment(comment.id)}>
                                                        <FaTrashAlt/>
                                                    </button>
                                                )}
                                            </li>
                                        ))
                                ) : (
                                    <li>Aucun commentaire pour le moment</li>
                                )}
                                <button className={styles["submit-button"]}
                                        onClick={() => openModalCommentPost(post.id)}>Ajouter un commentaire
                                </button>
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
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    }
                />
            )}
            {modalIsOpenDeleteComment && (
                <Modal
                    modalIsOpen={modalIsOpenDeleteComment}
                    closeModal={closeModalDeleteComment}
                    modalConfirm={handleDeleteComment}
                    modalTitle="Supprimer un commentaire"
                    modalBody="Êtes-vous sûr de vouloir supprimer ce commentaire ?"
                />
            )}
        </div>
    );
}

export default PostList;
