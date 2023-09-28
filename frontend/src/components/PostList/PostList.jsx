import {useEffect, useState} from "react";
import {getPosts} from "../../api/api.js";

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des posts :', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des posts</h2>
            <ul>
                {posts && posts.map((post) => (
                    <li key={post.id}>
                        <strong>Créé par</strong> {post.authorUsername}
                        <br/>
                        <strong>Image</strong> {post.picture}
                        <br/>
                        <strong>Contenu</strong> {post.content}
                        <br/>
                        <strong>Crée le</strong> {post.created_at}
                    </li>
                ))}
                {!posts && <li>Aucun post pour le moment</li>}
            </ul>
        </div>
    );
}

export default PostList;