import {useEffect, useState} from "react";
import {deleteUserPost, getUserPosts} from "../../api/api.js";

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUserPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des posts :', error);
            });
    }, []);

    const handleDeletePost = (postId) => {
        deleteUserPost(postId)
            .then(() => {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression du post :", error);
            });
    };

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
                            <button onClick={() => handleDeletePost(post.id)}>Supprimer</button>
                        </li>
                    ))
                ) : (
                    <li>Aucun post pour le moment</li>
                )}
            </ul>
        </div>
    );
}

export default PostList;
