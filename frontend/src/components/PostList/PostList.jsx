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
import {GiThink} from "react-icons/gi";

function PostList({mode, postTitle}) {
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
    const userRole = useSelector((state) => state.auth.role);

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
        <>
            <h2 className={styles["second-title"]}>{postTitle}</h2>
            <main className={styles["post-list"]}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post.id} className={styles["post-item"]}>
                            {mode === "UserPosts" || userRole === 'ROLE_ADMIN' && (
                                <button aria-label="Delete button" className={styles["delete-button"]}
                                        onClick={() => openModalDeletePost(post.id)}
                                        style={{display: "block"}}>
                                    <FaTrashAlt/>
                                </button>
                            )}
                            {/*<strong>Image :<img alt="" src={post.picture} /></strong>*/}
                            <strong style={{textAlign: "left"}}>{post.authorUsername}</strong> a philosophé :
                            <p className={styles["content"]}>
                                {post.content}
                            </p>
                            <em>
                                le {format(new Date(post.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                locale: fr,
                            })}
                            </em>
                            <ul className={styles.comments}>
                                {comments
                                    .filter((comment) => comment.postId === post.id)
                                    .length > 0 ? (
                                    comments
                                        .filter((comment) => comment.postId === post.id)
                                        .map((comment) => (
                                            <li key={comment.id} className={styles["comment-item"]}>
                                                {userId === comment.user || userRole === 'ROLE_ADMIN' && (
                                                    <button aria-label="Delete button"
                                                            className={styles["delete-button"]}
                                                            onClick={() => openModalDeleteComment(comment.id)}>
                                                        <FaTrashAlt/>
                                                    </button>
                                                )}
                                                <p><strong>{comment.authorUsername}</strong> a scandé en retour :</p>
                                                <p className={styles["content"]}>
                                                    {comment.content}
                                                </p>
                                                <p>
                                                    <em>
                                                        le {format(new Date(comment.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                                        locale: fr,
                                                    })}
                                                    </em>
                                                </p>
                                            </li>
                                        ))
                                ) : (
                                    <li>Nul n'a eu le courage de défier cette pensée</li>
                                )}
                                <button className={styles["submit-button"]}
                                        onClick={() => openModalCommentPost(post.id)}>Partager votre
                                    réflexion <GiThink/>
                                </button>
                            </ul>
                        </article>
                    ))
                ) : (
                    <li style={{textAlign: "center"}}>Aucun post pour le moment</li>
                )}
            </main>
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
                        ></textarea>
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
        </>
    );
}

export default PostList;
