import { useEffect, useState } from "react";
import { getPosts } from "../../api/api.js";
import "moment/locale/fr";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then((response) => {
                setPosts(response);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des posts :", error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des posts</h2>
            <ul>
                {posts &&
                    posts.map((post) => (
                        <li key={post.id}>
                            <strong>Créé par</strong> {post.authorUsername}
                            <br />
                            <strong>Image</strong> {post.picture}
                            <br />
                            <strong>Contenu</strong> {post.content}
                            <br />
                            <strong>Crée le</strong>{" "}
                            {format(new Date(post.created_at), "d MMMM yyyy 'à' HH'h'mm", {
                                locale: fr,
                            })}
                        </li>
                    ))}
                {!posts && <li>Aucun post pour le moment</li>}
            </ul>
        </div>
    );
}

export default PostList;
