import { useState } from 'react';
import {createPost} from "../../api/api.js";

const CreatePostForm = () => {
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(content, picture)
            const response = await createPost(content, picture);
            console.log('Post créé avec succès:', response);
            setPicture(null);
            setContent('');
            setError(null);
        } catch (err) {
            setError('Veuillez vous connecter pour poster');
            console.error('Erreur:', err);
        }
    };


    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setPicture(selectedImage);
    };

    return (
        <div>
            <h2>Créer un post</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Image :</label>
                    <input
                        name="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
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

export default CreatePostForm;
