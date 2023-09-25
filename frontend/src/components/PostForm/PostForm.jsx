import React, { useState } from 'react';
import axios from 'axios';
import {createPost} from "../../api/api.js";

const PostForm = () => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPost(content);
            console.log('Post créé avec succès:', response);
            setContent('');
            setError(null);
        } catch (err) {
            setError('Erreur lors de la création du post.');
            console.error('Erreur:', err);
        }
    };

    return (
        <div>
            <h2>Créer un post</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Contenu du post :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Créer le post</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
