import { useState } from 'react';
import {createPost} from "../../api/api.js";

const CreatePostForm = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(content, image)
            const response = await createPost(content, image);
            console.log('Post créé avec succès:', response);
            setImage(null);
            setContent('');
            setError(null);
        } catch (err) {
            setError('Veuillez vous connecter pour poster');
            console.error('Erreur:', err);
        }
    };


    const handleImageChange = (e) => {
        const selectedImage = e.target.files ? e.target.files[0] : null;
        setImage(selectedImage);
    };

    return (
        <div>
            <h2>Créer un post</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Image :</label>
                    <input
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
