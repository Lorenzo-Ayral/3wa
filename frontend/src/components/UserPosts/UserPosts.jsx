import {useEffect, useState} from "react";
import {getUserPosts} from "../../api/api.js";

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

    return (
        <div>
            <h2>Vos posts</h2>
            <ul>
                {posts && posts.map((post) => (
                    <li key={post.id}>
                        <strong>Contenu</strong> {post.content}
                        <br/>
                        <strong>Créé le</strong> {post.created_at}
                    </li>
                ))}
                {!posts && <li>Aucun post pour le moment</li>}
            </ul>
        </div>
    );
}

export default PostList;
